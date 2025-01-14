import { TableOptions } from "@/components/private/Tools/TableOptions";

interface FinancialTabletProps {
  data: any;
}

export default function FinancialTablet() {
  return (
    <fieldset className="fieldset h-auto w-full rounded-lg px-3 py-2">
      <table id="table-style">
        <thead>
          <tr>
            <th>Direção</th>
            <th>2022</th>
            <th>2023</th>
            <th>2024</th>
            <th>2025</th>
            <th>A pagar</th>
            <th>Pago</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td className="whitespace-nowrap"></td>
            <td className="whitespace-nowrap"></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="w-16 ">
              {/* <TableOptions
                role={"ADMIN"}
                isView={false}
                isEdit
                isDelete
                handleEdit={() => console.log("edit")}
                handleDelete={() => console.log("delete")}
              /> */}
            </td>
          </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colSpan={5} className="bg-red-400">Total</th>
                <td>R$ 1525.00</td>
                <td>R$ 1525.00</td>
            </tr>
        </tfoot>
      </table>
    </fieldset>
  );
}
