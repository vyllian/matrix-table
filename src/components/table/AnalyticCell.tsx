export function AnalyticCell(
    {
        value,
    }:{
        value: number;
    }
) {
    return (
        <td
            className="sticky right-0 z-10 cell cell-analytic border-r-2 font-bold"
        >
            {value}
        </td>
    )
}