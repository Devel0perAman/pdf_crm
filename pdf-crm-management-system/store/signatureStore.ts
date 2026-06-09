import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Signature {
  id: string;
  name: string;
  image?: string;
}

interface SignatureStore {
  signatures: Signature[];

  addSignature: (
    signature: Signature
  ) => void;
}

export const useSignatureStore =
  create<SignatureStore>()(
    persist(
      (set) => ({
        signatures: [],

        addSignature: (signature) =>
          set((state) => ({
            signatures: [
              ...state.signatures,
              signature,
            ],
          })),
      }),
      {
        name: "pdf-crm-signatures",
      }
    )
  );