import {useInteractionContext} from "@/core/contexts/InteractionContext.tsx";

export function AnalyticCell(
    {
        value,
        rowIndex,
    }:{
        value: number;
        rowIndex: number;
    }
) {

    const {setHighlightedRowIndex} = useInteractionContext();

    return (
        <td
            onMouseEnter={()=> setHighlightedRowIndex(rowIndex)}
            onMouseLeave={() => setHighlightedRowIndex(null)}
            className="sticky right-0 z-10 cell cell-analytic border-r-2 font-bold"
        >
            {value}
        </td>
    )
}