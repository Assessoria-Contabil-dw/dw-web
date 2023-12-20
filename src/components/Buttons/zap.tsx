import Image from 'next/image'
import WhatsIcon from '../../assets/icon_whats.svg'

export default function ZapButton() {
  return (
    <a
      target="_blank"
      href="https://api.whatsapp.com/send?phone=559991014072"
      className="button-arrow rounded-full bg-green-400 p-3 drop-shadow-md  hover:bg-green-600"
      rel="noreferrer"
    >
      <Image src={WhatsIcon} alt="Whatsapp" width={18} />
    </a>
  )
}
