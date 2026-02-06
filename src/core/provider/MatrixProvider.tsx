import {type ReactNode, useCallback, useMemo, useState} from "react";
import type {Cell} from "@/core/types/Cell.ts";
import {DataContext} from "../contexts/DataContext";
import {InteractionContext} from "../contexts/InteractionContext";
import {generateMatrix} from "@/core/utils/generateMatrix.ts";

export function MatrixProvider(
    {
        children
    }: {
        children: ReactNode
    }
) {
    const [matrix, setMatrix] = useState<Cell[][]>([]);
    const [x, setX] = useState(0);
    const [hoveredCellId, setHoveredCellId] = useState<number | undefined>();
    
    const findX = useCallback((rows: number, columns: number) => {
        const percent = 0.1;
        setX(() => Math.ceil(percent * rows * columns));
    },[])
    
    const init = useCallback((rows: number, columns: number)=>{
        const matrix = generateMatrix(rows, columns);
        findX(rows, columns);
        setMatrix(()=>matrix);
    },[findX])
    
    const highlightedIds = (): Set<number> => {
        //     TODO:
        return new Set();
    };

    const incrementCell = useCallback((id: number) => {
        //     TODO:

    }, []);

    const addRow = useCallback(() => {
        //     TODO:
    }, [])

    const removeRow = useCallback((rowIndex: number) => {
        //     TODO:
    }, []);

    return (
        <DataContext.Provider
            value={useMemo(() => ({
                matrix,
                init,
                incrementCell,
                removeRow,
                addRow,
            }), [matrix, init, incrementCell, removeRow, addRow])}
        >
            <InteractionContext.Provider
                value={useMemo(() => ({
                    x,
                    hoveredCellId,
                    highlightedIds,
                    setHover: setHoveredCellId,
                }), [x, hoveredCellId, highlightedIds, setHoveredCellId])}
            >
                {children}
            </InteractionContext.Provider>
        </DataContext.Provider>
    );
}