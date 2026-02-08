import {memo} from "react";
import type {Cell} from "@/core/types/Cell.ts";
import {getColumnValues} from "@/core/utils/matrix.ts";
import {percentile} from "@/core/utils/math.ts";

export const AnalyticRow = memo(function AnalyticRow(
    {
        matrix
    }: {
        matrix: Cell[][]
    }
) {

    return (
        <tr
            className="font-bold"
        >
            <td
                className="sticky left-0 bottom-0 z-10 cell cell-analytic border-2"
            >
                60%
            </td>
            {getColumnValues(matrix).map((column)=>(
                <td
                    className="cell cell-analytic border-b-2"
                >
                    {percentile(column)}
                </td>
            ))}
            <td className="sticky right-0 bottom-0 z-20 cell bg-pink-200"/>
        </tr>
    )
})