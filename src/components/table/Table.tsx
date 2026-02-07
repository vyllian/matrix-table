import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {Row} from "@/components/table/Row.tsx";

export function Table() {
    const {matrix} = useDataContext();

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
            className="relative w-full max-w-[90vw] h-full max-h-[90vh] overflow-auto"
        >
            <table
                className="table-fixed min-w-max mx-auto"
            >
                <tbody>
                    {matrix.map((row) => (
                        <Row
                            key={`${row[0].id}-${row[row.length - 1].id}`}
                            row={row}
                        />
                    ))}
                </tbody>
            </table>
        </div>

    )
}