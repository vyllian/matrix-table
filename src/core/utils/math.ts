import type {Cell} from "@/core/types/Cell.ts";

export const generateAmount = ()=> {
    const min = 100;
    const max = 1000;
    return Math.floor(Math.random() * (max - min) + min);
}

export const sum = (row: Cell[]) =>
    row.reduce((s, c) => s + c.amount, 0);

export const percentile = (column: number[], percent = 0.6):number => {
    const sorted = column.toSorted((a, b) => a - b);

    // The rank r for the percentile: r = (p/100) * (n - 1) + 1
    const r = percent * (sorted.length - 1);
    // If r is an integer then the data value at location r, xr, is the percentile p: p = xr
    if (Number.isInteger(r)) return sorted[r];
    // If r is not an integer, p is interpolated using ri, the integer part of r, and rf, the fractional part of r:
    //     p = Xri + Xrf * (Xri+1 - Xri)
    else {
        const ri = Math.floor(r);
        const rf = r - ri;

        const percentile = sorted[ri] + rf * (sorted[ri+1] - sorted[ri]);
        return Number(percentile.toFixed(2));
    }
};