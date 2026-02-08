import type {Cell as CellType} from "@/core/types/Cell.ts";
import {Cell} from "@/components/table/Cell.tsx";
import {memo} from "react";
import {AnalyticCell} from "@/components/table/AnalyticCell.tsx";
import {sum} from "@/core/utils/math.ts";
import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {Button} from "@/components/Button.tsx";
import binIcon from "@/assets/icons/bin.svg";

export const Row = memo(function Row(
    {
        row,
        index,
    }: {
        row: CellType[]
        index: number
    }
) {
    const {removeRow} = useDataContext();

    return (
        <tr className="group">
            <td className="border-2 border-transparent">
                <div
                    className="group-hover:opacity-100 opacity-0 flex items-center justify-center transition-opacity duration-300 ease-in-out"
                >
                    <Button onClick={()=>removeRow(index)}>
                        <img src={binIcon} alt="Bin" width={20}/>
                    </Button>
                </div>
            </td>
            {row.map((cell) => (
                <Cell
                    key={cell.id}
                    cell={cell}
                />
            ))}
            <AnalyticCell value={sum(row)}/>
        </tr>
    )
})