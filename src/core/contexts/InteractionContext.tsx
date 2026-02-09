import {createContext, useContext} from "react";
import type {Cell} from "@/core/types/Cell.ts";

export type InteractionValue = {
    x: number;
    setHoveredCell: (cell: Cell | null) => void;
    highlightedCells: Set<Cell> | null;
    highlightedRowIndex: number | null;
    setHighlightedRowIndex: (index: number | null) => void;
};

export const InteractionContext = createContext<InteractionValue|null>(null);

export const useInteractionContext = () => {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error("useInteractionContext must be used within a MatrixProvider");
    }
    return context;
}