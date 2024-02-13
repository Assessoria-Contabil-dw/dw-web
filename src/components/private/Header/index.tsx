import ActiveHeader from "./ActiveHeader";
import NavigationHeader from "./NavHeader";
import imgLogo from "../../../assets/cdw-horizontal.svg";
import Image from "next/image";
import ActiveAccount from "./Account/ActiveAccount";

export default function HeaderPrivate() {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full flex-row justify-between border-b-[1px] border-zinc-300  bg-white px-6 max-md:px-2">
      <div className="flex flex-row items-center gap-16 max-md:gap-2">
        <a href="https://contabilidadepartidaria.com.br">
          <Image src={imgLogo} alt="Logo CDW" className="h-8 w-auto" />
        </a>
        <NavigationHeader />
      </div>
      <div className="flex items-center justify-center gap-2">
        <ActiveAccount/>
        <ActiveHeader />
      </div>
    </header>
  );
}
