import Image from 'next/image'
import WhatsIcon from '../../../assets/icon_whats.svg'
import LinkIcon from '@/components/Links/LinkIcon'

export default function ZapButton() {
  return (
    <LinkIcon
      title="Whatsapp"
      className="rounded-full bg-green-400 p-3 drop-shadow-md  hover:bg-green-600"
      href="https://api.whatsapp.com/send?phone=559991014072"
      icon={<Image src={WhatsIcon} alt="Whatsapp" width={24} />}
    />
  )
}
