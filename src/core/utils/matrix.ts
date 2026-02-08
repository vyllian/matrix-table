import type {Cell} from "@/core/types/Cell.ts";
import {generateAmount} from "@/core/utils/math.ts";

export function generateMatrix(rows: number, columns: number): Cell[][] {
    return Array.from({ length: rows }, (_, rowIndex) =>
       generateRow(rowIndex*columns, columns)
    );
}

export function generateRow(id: number, columns: number): Cell[] {
    return Array.from({ length: columns }, () => ({
        id: id++,
        amount: generateAmount()
    }));
}

export const getColumnValues = (matrix: Cell[][]) => {
    const numCols = matrix[0].length;

    return Array.from({ length: numCols }, (_, colIndex) =>
        matrix.map(row => row[colIndex].amount)
    );
};