"use client";
import { AccessContext } from "@/provider/context.provider";
import { useContext } from "react";
import ActiveLink from "./ActiveLink";
import { HEADER_ITEM_LINK } from "./linksBase";

export default function NavigationBody() {
  const { openHeader } = useContext(AccessContext);

  return (
    <aside
      className={`absolute right-0 z-10 h-full w-full bg-white transition ${
        openHeader ? "block" : "hidden"
      }`}
    >
      <ul className="flex h-full flex-col gap-4">
        {HEADER_ITEM_LINK.map(
          (item, index) =>
            !item?.disable && (
              <li className="h-12 w-full px-8" key={index}>
                <ActiveLink href={item.href} name={item.label} />
              </li>
            )
        )}
      </ul>
    </aside>
  );
}
