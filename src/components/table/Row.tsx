import type {Cell as CellType} from "@/core/types/Cell.ts";
import {Cell} from "@/components/table/Cell.tsx";
import {memo} from "react";
import {AnalyticCell} from "@/components/table/AnalyticCell.tsx";
import {sum} from "@/core/utils/math.ts";

export const Row = memo(function Row(
    {
        row,
    }: {
        row: CellType[]
    }
) {
    return (
        <tr>
            <td className="border-2 border-transparent"/>
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