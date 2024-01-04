import LinkLogo from '@/components/Links/LinkLogo'
import ActiveHeader from './ActiveHeader'
import ActiveLogout from './ActiveLogout'
import NavigationHeader from './NavHeader'
import imgLogo from '../../../assets/icon.svg'

export default function HeaderPrivate() {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full flex-row justify-between border-b-[1px] border-zinc-300 bg-white bg-white px-6 max-md:px-2">
      <div className="flex flex-row items-center gap-8 max-md:gap-2">
        <LinkLogo href="/" title="Logo DW" img={imgLogo} />
        <NavigationHeader />
      </div>
      <div className="flex items-center justify-center gap-2">
        <ActiveLogout />
        <ActiveHeader />
      </div>
    </header>
  )
}
