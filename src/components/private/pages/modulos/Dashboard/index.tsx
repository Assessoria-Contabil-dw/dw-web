import CardCount from './CardCount'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-h2">
        Dashboard <span className="text-span">/ Acessos</span>
      </h2>
      <CardCount />
    </div>
  )
}
