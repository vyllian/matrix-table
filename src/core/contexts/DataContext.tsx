import {createContext, useContext} from "react";
import type {Cell} from "@/core/types/Cell.ts";

export type DataValue = {
    matrix: Cell[][];
    matrixSize: {rows: number, columns: number};
    init: (rows: number, columns: number) => void;
    x: number;
    setX: (x: number) => void;
    incrementCell: (id: number) => void;
    addRow: () => void;
    removeRow: (rowIndex: number) => void;
};

export const DataContext = createContext<DataValue|null>(null);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a MatrixProvider");
    }
    return context;
}