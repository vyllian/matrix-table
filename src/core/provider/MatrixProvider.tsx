import {type ReactNode, useCallback, useMemo, useRef, useState} from "react";
import type {Cell} from "@/core/types/Cell.ts";
import {DataContext} from "../contexts/DataContext";
import {InteractionContext} from "../contexts/InteractionContext";
import {generateMatrix, generateRow} from "@/core/utils/matrix.ts";

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

    const nextId = useRef(0);
    
    const findX = useCallback((rows: number, columns: number) => {
        const percent = 0.1;
        setX(() => Math.ceil(percent * rows * columns));
    },[])
    
    const init = useCallback((rows: number, columns: number)=>{
        const matrix = generateMatrix(rows, columns);
        nextId.current = rows * columns;
        findX(rows, columns);
        setMatrix(matrix);
    },[findX])
    
    const highlightedIds = (): Set<number> => {
        //     TODO:
        return new Set();
    };

    const incrementCell = useCallback((id: number) => {
        setMatrix(prev => prev.map(row =>
            row.map(cell => cell.id === id ? {...cell, amount: cell.amount + 1} : cell)
        ));
    }, []);

    const addRow = useCallback(() => {
        setMatrix((prev)=>[...prev, generateRow(nextId.current, prev[0].length)])
        nextId.current += matrix[0].length;
    }, [matrix])

    const removeRow = useCallback((rowIndex: number) => {
        setMatrix(prev => prev.filter((_, i) => i !== rowIndex));
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