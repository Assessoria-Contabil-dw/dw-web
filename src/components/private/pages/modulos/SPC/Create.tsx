"use client";
import { X } from "lucide-react";

import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import FormCreateSPC from "./Form/Create";

export interface CreateSPCRef {
  openModal: () => void;
  closeModal: () => void;
}
const CreateSPC: ForwardRefRenderFunction<CreateSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false);
  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalView(false);
  }, []);
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!isModalView) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h4">Cadastrar PCA</h4>
              <span className="text-span">
                Cadastre um novo pca de um diretório
              </span>
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>

          <FormCreateSPC />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CreateSPC);
