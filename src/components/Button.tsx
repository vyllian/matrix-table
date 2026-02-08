import type {ReactNode} from "react";

export function Button(
    {
        children,
        onClick,
    }:{
        children: ReactNode,
        onClick:()=>void,
    }
) {
    return(
        <button
            onClick={onClick}
            className="py-1 px-2 bg-white/30 border border-black/80 rounded-xl cursor-pointer"
        >
            {children}
        </button>
    )
}