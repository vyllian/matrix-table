import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {Row} from "@/components/table/Row.tsx";
import {AnalyticRow} from "@/components/table/AnalyticRow.tsx";
import {Button} from "@/components/Button.tsx";

export function Table() {
    const {matrix, addRow} = useDataContext();

    if (matrix.length === 0) {
        return (
            <div
                className="w-full h-full flex items-center justify-center"
            >
                Введіть кількість рядків і стовпців
            </div>
        )
    }

    return (
        <div
            className="flex flex-col justify-start gap-4"
        >
            <div
                className="relative w-full max-w-[90vw] h-full max-h-[74vh] overflow-auto"
            >
                <table
                    className="table-fixed min-w-max mx-auto border-separate border-spacing-0"
                >
                    <thead
                        className="sticky top-0 z-20"
                    >
                    <tr>
                        <th colSpan={matrix[0].length + 1}/>
                        <th className="sticky right-0 top-0 cell cell-analytic border-2 text-md font-bold">
                            Sum
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {matrix.map((row, index) => (
                        <Row
                            key={`${row[0].id}-${row[row.length - 1].id}`}
                            row={row}
                            index={index}
                        />
                    ))}
                    </tbody>
                    <tfoot
                        className="sticky bottom-0 z-10"
                    >
                    <AnalyticRow matrix={matrix}/>
                    </tfoot>
                </table>
            </div>
            <Button onClick={addRow}>
                Додати рядок
            </Button>
        </div>
    )
}