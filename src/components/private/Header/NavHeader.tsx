import ActiveLink from "./ActiveLink";
import { HEADER_ITEM_LINK } from "./linksBase";

export default function NavigationHeader() {
  return (
    <nav className="h-full transition max-lg:hidden">
      <ul className="flex h-full gap-6">
        {HEADER_ITEM_LINK.map(
          (item, index) =>
            !item?.disable && (
              <li className="h-full w-full" key={index}>
                <ActiveLink href={item.href} name={item.label} />
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
