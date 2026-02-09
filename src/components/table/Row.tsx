import type {Cell as CellType} from "@/core/types/Cell.ts";
import {Cell} from "@/components/table/Cell.tsx";
import {memo} from "react";
import {AnalyticCell} from "@/components/table/AnalyticCell.tsx";
import {max, round, sum} from "@/core/utils/math.ts";
import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {Button} from "@/components/Button.tsx";
import binIcon from "@/assets/icons/bin.svg";
import {useInteractionContext} from "@/core/contexts/InteractionContext.tsx";

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
    const {highlightedRowIndex} = useInteractionContext();

    const isHighlighted = highlightedRowIndex === index;

    const suma = sum(row);
    const biggestValue = max(row).amount;

    return (
        <tr className="group">
            <td className="bg-pink-200 border-2 border-transparent sticky left-0 z-10">
                <div
                    className="group-hover:opacity-100 focus-within:opacity-100 opacity-0 flex items-center justify-center transition-opacity duration-300 ease-in-out"
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
                    showPercentage={isHighlighted}
                    percentSuma={round(cell.amount/suma*100)}
                    percentValue={round(cell.amount/biggestValue)}
                />
            ))}
            <AnalyticCell value={suma} rowIndex={index}/>
        </tr>
    )
})