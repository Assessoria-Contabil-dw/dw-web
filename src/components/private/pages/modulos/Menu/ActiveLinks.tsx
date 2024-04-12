import { useLinkData } from "@/hooks/useLinkData";
import { Globe } from "lucide-react";

export default function ActiveLinks() {
  const { data, isLoading } = useLinkData();

  if (!data || isLoading) {
    return null;
  }

  return (
    <ul className="grid grid-flow-row grid-cols-3 ">
      {data?.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-center border-[1px] border-dashed p-1"
        >
          <a
            href={item.url}
            className=" flex h-full w-full items-center justify-center 
               rounded-sm focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            target="_blank"
            rel="noreferrer"
          >
            {item.logoUrl ? (
              <picture>
                <img
                  className="h-6 w-12 object-contain"
                  src={item.logoUrl}
                  alt="Link útil"
                />
              </picture>
            ) : (
              <i className="text-slate-500">
                <Globe size={16} />
              </i>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
