import api from "./api";

export const createPdf = (
  data: any
) =>
  api.post(
    "/pdfs",
    data
  );

export const getPdfs = () =>
  api.get("/pdfs");

export const getPdfById = (
  id: string
) =>
  api.get(`/pdfs/${id}`);

export const updatePdf = (
  id: string,
  data: any
) =>
  api.put(
    `/pdfs/${id}`,
    data
  );

export const deletePdf = (
  id: string
) =>
  api.delete(
    `/pdfs/${id}`
  );