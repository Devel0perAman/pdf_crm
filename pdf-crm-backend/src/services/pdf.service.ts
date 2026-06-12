import api from "./api";

export const createPdf = <T = unknown>(data: T) =>
  api.post("/pdfs", data);

export const getPdfs = () =>
  api.get("/pdfs");

export const getPdfById = (
  id: string
) =>
  api.get(`/pdfs/${id}`);

export const updatePdf = <T = unknown>(id: string, data: T) =>
  api.put(`/pdfs/${id}`, data);

export const deletePdf = (
  id: string
) =>
  api.delete(
    `/pdfs/${id}`
  );