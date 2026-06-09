import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PdfDocument {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: string;
}

interface PdfStore {
  pdfs: PdfDocument[];

  addPdf: (pdf: PdfDocument) => void;

  deletePdf: (id: string) => void;
}

export const usePdfStore = create<PdfStore>()(
  persist(
    (set) => ({
      pdfs: [],

      addPdf: (pdf) =>
        set((state) => ({
          pdfs: [...state.pdfs, pdf],
        })),

      deletePdf: (id) =>
        set((state) => ({
          pdfs: state.pdfs.filter(
            (pdf) => pdf.id !== id
          ),
        })),
    }),
    {
      name: "pdf-crm-pdfs",
    }
  )
);