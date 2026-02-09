import type {Cell as CellType} from "@/core/types/Cell.ts";
import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {memo} from "react";
import {useInteractionContext} from "@/core/contexts/InteractionContext.tsx";

export const Cell = memo(function Cell(
    {
        cell,
        showPercentage,
        percentSuma,
        percentValue,
    }: {
        cell: CellType,
        showPercentage: boolean,
        percentSuma: number,
        percentValue: number,
    }
) {
    const {incrementCell} = useDataContext();
    const {setHoveredCellId, highlightedCells} = useInteractionContext();

    const handleClick = () => {
        incrementCell(cell.id);
    }

    const isHighlighted = highlightedCells?.has(cell);

    return (
        <td
            onClick={handleClick}
            onMouseEnter={() => setHoveredCellId(cell.id)}
            onMouseLeave={() => setHoveredCellId(-1)}
            onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
            }}
            tabIndex={0}
            className={`cell cursor-pointer transition-colors duration-75 
                ${isHighlighted ? "bg-teal-600/80" : "hover:bg-teal-600/50"}
                ${showPercentage ? "font-bold" : ""}
            `}
            style={{backgroundColor: showPercentage ? `rgba(138, 32, 6, ${percentValue})` : ""}}
        >
            {showPercentage ? `${percentSuma}%` : cell.amount}
        </td>
    )
})