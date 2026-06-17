import { Response } from "express";
import { Request } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { createRecordStorage } from "../services/storage.service";
import { sendEmail } from "../services/email.service";

export const createPdf = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      title,
      recipientEmail,
      descriptionRichtext,
      descriptionHtml,
      textContent,
      signatureType,
      signatureData,
    } = req.body;

    if (!recipientEmail?.trim()) {
      return res.status(400).json({
        message:
          "Recipient email is required",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!signatureType || !signatureData) {
      return res.status(400).json({
        message: "Signature is required",
      });
    }

    const pdf = await prisma.pdfDocument.create({
      data: {
        userId: req.user!.id,
        title,
        recipientEmail,
        descriptionRichtext,
        descriptionHtml,
        textContent,
        signatureType,
        signatureData,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        documentId: pdf.id,
        action: "PDF_CREATED",
      },
    });

    await createRecordStorage({
      id: pdf.id,
      title: pdf.title,
      descriptionHtml:
        pdf.descriptionHtml || "",
      textContent:
        pdf.textContent || "",
    });

    await prisma.notification.create({
      data: {
        userId: req.user!.id,
        title: "PDF Created",
        message:
          `Document "${pdf.title}" was created successfully.`,
      },
    });

    const shareLink =
      `${process.env.FRONTEND_URL}/shared/${pdf.id}`;

    await prisma.pdfDocument.update({
      where: {
        id: pdf.id,
      },
      data: {
        shareLink,
      },
    });

    try {
  await sendEmail(
    recipientEmail,
    "PDF Shared With You",
    `
      <h2>${pdf.title}</h2>

      <p>
        A PDF document has been shared with you.
      </p>

      <p>
        Click below to open it:
      </p>

      <a href="${shareLink}">
        Open PDF
      </a>
    `
  );
} catch (error) {
  console.error(
    "Email sending failed:",
    error
  );
}

    return res.status(201).json(pdf);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create PDF",
    });
  }
};

export const getAllPdfs = async (
  req: AuthRequest,
  res: Response
) => {
  const pdfs =
    await prisma.pdfDocument.findMany({
      where:
        req.user?.role === "admin"
          ? {}
          : {
            userId:
              req.user!.id,
          },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  res.json(pdfs);
};

export const getPdfById = async (
  req: AuthRequest,
  res: Response
) => {
  const pdfId: string | undefined =
    Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

  if (!pdfId) {
    return res.status(400).json({
      message: "Invalid PDF id",
    });
  }

  const pdf =
    await prisma.pdfDocument.findFirst({
      where:
        req.user?.role === "admin"
          ? {
            id: pdfId,
          }
          : {
            id: pdfId,
            userId:
              req.user!.id,
          },
      include: {
        signatures: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

  if (!pdf) {
    return res.status(404).json({
      message: "PDF not found",
    });
  }

  res.json(pdf);
};

export const updatePdf = async (
  req: AuthRequest,
  res: Response
) => {
  const pdfId: string | undefined =
    Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

  if (!pdfId) {
    return res.status(400).json({
      message: "Invalid PDF id",
    });
  }

  if (
    req.body.title !== undefined &&
    !req.body.title.trim()
  ) {
    return res.status(400).json({
      message: "Title cannot be empty",
    });
  }

  const existingPdf =
    await prisma.pdfDocument.findUnique({
      where: {
        id: pdfId,
      },
    });

  if (!existingPdf) {
    return res.status(404).json({
      message: "PDF not found",
    });
  }

  if (
    req.user?.role !== "admin" &&
    existingPdf.userId !==
    req.user!.id
  ) {
    return res.status(403).json({
      message:
        "Access denied",
    });
  }

  if (
    existingPdf.userId !==
    req.user!.id
  ) {
    return res.status(403).json({
      message:
        "You cannot edit another user's PDF",
    });
  }

  const pdf =
    await prisma.pdfDocument.update({
      where: {
        id: pdfId,
      },
      data: req.body,
    });

  await prisma.activityLog.create({
    data: {
      userId: req.user!.id,
      documentId: pdf.id,
      action: "PDF_UPDATED",
    },
  });

  await prisma.notification.create({
    data: {
      userId: req.user!.id,
      title: "PDF Updated",
      message:
        `Document "${pdf.title}" was updated successfully.`,
    },
  });

  res.json(pdf);
};

export const deletePdf = async (
  req: AuthRequest,
  res: Response
) => {
  const pdfId: string | undefined =
    Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

  if (!pdfId) {
    return res.status(400).json({
      message: "Invalid PDF id",
    });
  }

  const existingPdf =
    await prisma.pdfDocument.findUnique({
      where: {
        id: pdfId,
      },
    });

  if (!existingPdf) {
    return res.status(404).json({
      message: "PDF not found",
    });
  }

  if (
  req.user?.role !== "admin" &&
  existingPdf.userId !==
    req.user!.id
) {
  return res.status(403).json({
    message:
      "Access denied",
  });
}

  await prisma.signature.deleteMany({
    where: {
      pdfId,
    },
  });

  await prisma.pdfDocument.delete({
    where: {
      id: pdfId,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: req.user!.id,
      action: "PDF_DELETED",
    },
  });

  await prisma.notification.create({
    data: {
      userId: req.user!.id,
      title: "PDF Deleted",
      message:
        `Document "${existingPdf.title}" was deleted.`,
    },
  });

  res.json({
    success: true,
  });
};

export const getSharedPdf = async (
  req: Request,
  res: Response
) => {
  try {
    const pdfId =
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

    if (!pdfId) {
      return res.status(400).json({
        message: "Invalid PDF id",
      });
    }

    const pdf =
      await prisma.pdfDocument.findUnique({
        where: {
          id: pdfId,
        },
        select: {
          id: true,
          title: true,
          descriptionHtml: true,
          textContent: true,
          signatureType: true,
          signatureData: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      });

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    res.json(pdf);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load shared PDF",
    });
  }
};