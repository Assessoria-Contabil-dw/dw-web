import { LoadingSecond } from '@/components/Loading/second'
import { useLinkData } from '@/hooks/useLinkData'
import { Globe } from 'lucide-react'

export default function ActiveLinks() {
  const { data, isLoading } = useLinkData()
  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
      </div>
    )
  }
  if (!data) {
    return null
  }

  return (
    <ul className="grid grid-flow-row grid-cols-3 ">
      {data.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-center border-[1px] border-dashed"
        >
          <a
            href={item.url}
            className="m-1 flex h-full w-full items-center justify-center"
            target="_blank"
            rel="noreferrer"
          >
            {item.logoUrl ? (
              <picture>
                <img
                  className="h-6 w-12 object-contain"
                  src={item.logoUrl}
                  alt="Link utel"
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
  )
}
