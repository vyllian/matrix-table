import {type ReactNode, useCallback, useMemo, useRef, useState} from "react";
import type {Cell} from "@/core/types/Cell.ts";
import {DataContext} from "@/core/contexts/DataContext";
import {InteractionContext} from "@/core/contexts/InteractionContext";
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
    const [hoveredCellId, setHoveredCellId] = useState<number>(-1);
    const [highlightedRowIndex, setHighlightedRowIndex] = useState<number | null>(null);

    const nextId = useRef(0);

    const flatMatrix = useMemo(() => {
        return matrix.flat();
    }, [matrix]);

    const matrixSize = useMemo(() => {
        return {
            rows: matrix.length,
            columns: matrix[0]?.length ?? 0,
        };
    }, [matrix]);

    const currentHoveredCell = useMemo(() => {
        return flatMatrix.find(c => c.id === hoveredCellId) || null;
    }, [flatMatrix, hoveredCellId]);

    const init = useCallback((rows: number, columns: number) => {
        const matrix = generateMatrix(rows, columns);
        nextId.current = rows * columns;
        setMatrix(matrix);
        setX(0);
    }, [])

    const highlightedCells = useMemo(() => {
        if (!currentHoveredCell) return null;
        return new Set(
            flatMatrix
                .filter(cell => cell.id !== currentHoveredCell.id)
                .sort((a, b) =>
                    Math.abs(a.amount - currentHoveredCell.amount) -
                    Math.abs(b.amount - currentHoveredCell.amount)
                )
                .slice(0, x)
        );
    }, [flatMatrix, currentHoveredCell, x]);

    const incrementCell = useCallback((id: number) => {
        setMatrix(prev => prev.map(row =>
            row.map(cell => cell.id === id ? {...cell, amount: cell.amount + 1} : cell)
        ));
    }, []);

    const addRow = useCallback(() => {
        setMatrix((prev) => [...prev, generateRow(nextId.current, matrixSize.columns)])
        nextId.current += matrixSize.columns;
    }, [matrixSize])

    const removeRow = useCallback((rowIndex: number) => {
        setMatrix(prev => prev.filter((_, i) => i !== rowIndex));
        setMatrix(prev => {
            const newMatrix = prev.filter((_, i) => i !== rowIndex);
            const newTotalCells = newMatrix.length * (newMatrix[0]?.length ?? 0);
            if (x >= newTotalCells) {
                setX(0);
            }
            return newMatrix;
        });
    }, [x]);

    return (
        <DataContext.Provider
            value={useMemo(() => ({
                matrix,
                matrixSize,
                init,
                x,
                setX,
                incrementCell,
                removeRow,
                addRow,
            }), [matrix,matrixSize, init, x, setX, incrementCell, removeRow, addRow])}
        >
            <InteractionContext.Provider
                value={useMemo(() => ({
                    x,
                    setHoveredCellId,
                    highlightedCells,
                    highlightedRowIndex,
                    setHighlightedRowIndex,
                }), [x, setHoveredCellId, highlightedCells, highlightedRowIndex, setHighlightedRowIndex])}
            >
                {children}
            </InteractionContext.Provider>
        </DataContext.Provider>
    );
}