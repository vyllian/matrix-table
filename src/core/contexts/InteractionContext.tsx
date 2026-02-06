import {createContext, useContext} from "react";

export type InteractionValue = {
    x: number;
    hoveredCellId?: number;
    highlightedIds?: Set<number>;
    setHover: (id?: number) => void;
};

export const InteractionContext = createContext<InteractionValue|null>(null);

export const useInteractionContext = () => {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error("useInteractionContext must be used within a MatrixProvider");
    }
    return context;
}