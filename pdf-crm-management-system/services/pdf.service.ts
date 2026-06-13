import api from "./api";

export interface CreatePdfPayload {
  title: string;
  recipientEmail: string;
  descriptionRichtext: string;
  descriptionHtml: string;
  textContent: string;
  signatureType: string;
  signatureData: string;
}

export const createPdf = (
  data: CreatePdfPayload
) => {
  return api.post(
    "/pdfs",
    data
  );
};

export const getPdfs = () => {
  return api.get("/pdfs");
};

export const getPdf = (
  id: string
) => {
  return api.get(
    `/pdfs/${id}`
  );
};

export const updatePdf = (
  id: string,
  data: Partial<CreatePdfPayload>
) => {
  return api.put(
    `/pdfs/${id}`,
    data
  );
};

export const deletePdf = (
  id: string
) => {
  return api.delete(
    `/pdfs/${id}`
  );
};

export const sharePdf =
  (id: string) =>
    api.post(
      `/pdfs/${id}/share`
    );

export const getSharedPdf =
  (id: string) =>
    api.get(
      `/pdfs/shared/${id}`
    );