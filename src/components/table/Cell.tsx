import type {Cell as CellType} from "@/core/types/Cell.ts";
import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {memo} from "react";
import {useInteractionContext} from "@/core/contexts/InteractionContext.tsx";

export const Cell = memo(function Cell(
    {
        cell
    }: {
        cell: CellType
    }
) {
    const {incrementCell} = useDataContext();
    const {setHoveredCell, highlightedCells} = useInteractionContext();

    const handleClick = () => {
        incrementCell(cell.id);
    }

    const isHighlighted = highlightedCells.has(cell);

    return (
        <td
            onClick={handleClick}
            onMouseEnter={() => setHoveredCell(cell)}
            onMouseLeave={() => setHoveredCell(null)}
            onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
            }}
            tabIndex={0}
            className={`cell text-xl cursor-pointer transition-colors duration-75 ${
                isHighlighted ? "bg-teal-600/80" : "hover:bg-teal-600/50"
            }`}
        >
            {cell.amount}
        </td>
    )
})