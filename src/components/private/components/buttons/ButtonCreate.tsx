import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import { Plus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

export default function CreateButton({ title, onClick, ...atr }: ButtonsProps) {
  return (
    <ButtonSecondary
      title={title}
      variant="fill"
      type="button"
      startIcon={<Plus size={16} />}
      onClick={onClick}
      {...atr}
    >
      {title}
    </ButtonSecondary>
  );
}
