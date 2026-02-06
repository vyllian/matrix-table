import {type ChangeEvent, useState} from "react";
import {useDataContext} from "@/core/contexts/DataContext.tsx";

type InputValue = {
    n: number | "";
    m: number | ""
}

export function Input() {
    const [values, setValues] = useState<InputValue>({n: "", m: ""})
    const [error, setError] = useState(false);

    const {init} = useDataContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: "n" | "m")=>{
        if (e.target.value === "") {
            setValues(prev => ({ ...prev, [field]: "" }));
            return;
        }

        const input = Number(e.target.value);
        if (isNaN(input) || input < 0 || input > 100) {
            setError(()=>true);
            return;
        }

        setError(()=>false);
        setValues((prev)=>({
            ...prev,
            [field]: input
        }))
    }

    return (
        <div
            className="relative w-full mt-3 flex items-center justify-evenly"
        >
            {error && (
                <div
                    className="p-3 absolute top-full left-1/2 -translate-x-1/2 bg-red-500 rounded-xl"
                >
                    <p
                        className="text-white"
                    >
                       Введіть числа в діапазоні 0...100
                    </p>
                </div>
            )}
            <div>
                M =
                <input
                    type="text"
                    name="M"
                    value={values.m}
                    placeholder="Кількість рядків"
                    onChange={e => handleChange(e, "m")}
                    className="w-[150px] pl-1"
                />
            </div>
            <div>
                N =
                <input
                    type="text"
                    name="N"
                    value={values.n}
                    placeholder="Кількість стовпців"
                    onChange={e => handleChange(e, "n")}
                    className="w-[150px] pl-1"
                />
            </div>
            <button
                onClick={() => {
                    init(Number(values.m), Number(values.n))
                }}
                className="py-1 px-2 bg-white/30 border border-black/80 rounded-xl cursor-pointer"
            >
                Генерувати
            </button>
        </div>
    )
}