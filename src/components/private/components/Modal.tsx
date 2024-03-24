import { X } from 'lucide-react';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useState } from 'react';

export interface ModelRef {
  openModel: () => void;
  closeModel: () => void;
}

interface ModalProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Model: ForwardRefRenderFunction<ModelRef, ModalProps> = (props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModel = () => setIsOpen(true);
  const closeModel = () => setIsOpen(false);

  useImperativeHandle(ref, () => ({
    openModel,
    closeModel,
  }));

  if (!isOpen) return null;

  return (
    <div className="model-bg">
      <div className={`model-size model-size-full ${props.className}`}>
        <fieldset className="model-card">
          <div className="model-header">
            <h4 className="text-h4">{props.title}</h4>
            <button onClick={closeModel} className="model-close">
              <X size={20} />
            </button>
          </div>
          {props.children}
        </fieldset>
      </div>
    </div>
  );
};

export default forwardRef(Model);
