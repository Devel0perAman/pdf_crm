import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { createRecordStorage } from "../services/storage.service";

export const createPdf = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
  title,
  descriptionRichtext,
  descriptionHtml,
  textContent,
  signatureType,
  signatureData,
} = req.body;

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
    descriptionRichtext,
    descriptionHtml,
    textContent,
    signatureType,
    signatureData,
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

    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        documentId: pdf.id,
        action: "PDF_CREATED",
      },
    });

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
      where: {
        userId: req.user!.id,
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
    where: {
      id: pdfId,
      userId: req.user!.id,
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
  await prisma.pdfDocument.findFirst({
    where: {
      id: pdfId,
      userId: req.user!.id,
    },
  });

if (!existingPdf) {
  return res.status(404).json({
    message: "PDF not found",
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
  await prisma.pdfDocument.findFirst({
    where: {
      id: pdfId,
      userId: req.user!.id,
    },
  });

if (!existingPdf) {
  return res.status(404).json({
    message: "PDF not found",
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

  res.json({
    success: true,
  });
};