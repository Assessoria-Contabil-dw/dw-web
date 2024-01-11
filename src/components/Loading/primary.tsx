import Image from 'next/image'
import logoCDW from '../../assets/dw.svg'

export function LoadingPrimary() {
  return (
    <div className="relative h-32 w-32">
      <div className="h-full w-full animate-spin rounded-full border-4 border-solid  border-primary border-t-slate-200"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform  ">
        <Image src={logoCDW} className="w-full" alt="Logo CDW" />
      </div>
    </div>
  )
}
