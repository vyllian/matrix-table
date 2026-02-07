import type {Cell as CellType} from "@/core/types/Cell.ts";
import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {memo} from "react";

export const Cell = memo(function Cell(
    {
        cell
    }: {
        cell: CellType
    }
) {
    const {incrementCell} = useDataContext();

    const handleClick = () => {
        incrementCell(cell.id);
    }

    return (
        <td
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
            }}
            tabIndex={0}
            className="cell text-xl cursor-pointer"
        >
            {cell.amount}
        </td>
    )
})