import CardCount from "./CardCount";
import TableSpcCount from "./TableSpcCount";
import TableVencimentVigency from "./TableVenciment";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-h2">
        Dashboard <span className="text-span">/ Acessos</span>
      </h2>
      <CardCount />
      <div className="flex flex-col gap-8 lg:flex-row">
        <TableVencimentVigency />
        <TableSpcCount/>
      </div>
    </div>
  );
}
