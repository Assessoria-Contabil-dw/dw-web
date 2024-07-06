import { ReactNode, SelectHTMLAttributes, useState } from "react";
import { useLegendData } from "@/hooks/useLegendData";
import { LoadingSecond } from "@/components/Loading/second";
import { X } from "lucide-react";

interface SelectLegendProps extends SelectHTMLAttributes<HTMLSelectElement> {
  valueSelect?: number;
  name: string;
  setColors: (data: { name: string; id: number; hex: string }[]) => void;
  colors: {
    name: string;
    id: number;
    hex: string;
  }[];
  label: string;
  loading?: boolean;
  children?: ReactNode;
}

export default function SelectLegend({
  children,
  loading,
  valueSelect,
  name,
  label,
  className,
  setColors,
  colors,
  ...atr
}: SelectLegendProps) {
  const { data, isLoading } = useLegendData();


  async function handleSetColors(data: {
    name: string;
    id: number;
    hex: string;
  }) {
    console.log(data);
    if(colors.find((color) => color.id === data.id)) return;
    setColors([...colors, data]);
  }

  async function removerColor(id: number) {
    const newColors = colors.filter((color) => color.id !== id);
    setColors(newColors);
  }
  
  return (
    <div className="flex w-full min-w-[90px] flex-col gap-1">
      <div className="flex gap-1">
        <label htmlFor={name} className="text-label">
          {label}
        </label>
        {loading && <LoadingSecond />}
      </div>
      <select
        {...atr}
        name={name}
        onChange={(e) => handleSetColors(JSON.parse(e.target.value))}
        disabled={loading || isLoading}
        defaultValue={String(valueSelect)}
        className={`input-style ${className || ""}`}
      >
        {children}
        {data !== undefined
          ? data.map((item) => (
              <option
                key={item.id}
                value={JSON.stringify({
                  name: item.name,
                  id: item.id,
                  hex: item.hex,
                })}
                style={{
                  color: `${item.hex}`,
                }}
                className="font-medium"
              >
                {item.name}
              </option>
            ))
          : null}
      </select>

      <div>
        {colors.map((color) => (
          <div
            key={color.id}
            className="float-left mb-2 mr-2 flex w-fit items-center gap-2 rounded-full px-2 py-1"
            style={{
              backgroundColor: `${color.hex}25`,
            }}
          >
            <span
              className="text-h5 font-semibold"
              style={{
                color: `${color.hex}`,
              }}
            >
              {color.name}
            </span>
            <button>
              <X size={16} className="text-slate-500" onClick={() => removerColor(color.id)} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
