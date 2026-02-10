import {type ChangeEvent, useEffect, useState} from "react";
import {useDataContext} from "@/core/contexts/DataContext.tsx";
import {Button} from "@/components/Button.tsx";

type InputValue = {
    n: number | "";
    m: number | "";
    x: number | "";
}

type Error = {
    error: boolean;
    message: string;
}

export function Input() {
    const [values, setValues] = useState<InputValue>({n: "", m: "", x: ""})
    const [error, setError] = useState<Error>({error: false, message: ""});

    const {init, x, setX, matrixSize} = useDataContext();

    useEffect(() => {
        const updateX = (x:number)=>{
            setValues(prev => ({
                ...prev,
                x: x === 0 ? "" : x
            }));
        }

        updateX(x)
    }, [x]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: "n" | "m" | "x") => {
        if (e.target.value === "") {
            setValues(prev => ({...prev, [field]: ""}));
            return;
        }

        const input = Number(e.target.value);

        if (isNaN(input)) {
            setError(() => ({error: true, message: "Введіть числа"}));
            return;
        }

        if ((field === "m" || field === "n") && (input < 0 || input > 100)) {
            setError(() => ({error: true, message: "Введіть числа в діапазоні 0...100"}));
            return;
        }

        if (field === "x" && (input < 0 || input > matrixSize.columns * matrixSize.rows - 1)) {
            setError(() => ({
                error: true,
                message: "Значення Х повинне бути менше або дорівнювати кількості клітинок"
            }));
            return;
        }

        setError({error: false, message: ""});
        setValues((prev) => ({
            ...prev,
            [field]: input
        }))
    }

    useEffect(() => {
        if (error.error) {
            const timer = setTimeout(() => {
                setError(prev => ({...prev, error: false}));
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [error.error, setError]);

    return (
        <>
            <div
                className="relative w-full flex items-center justify-evenly"
            >
                <div
                    className={`${error.error ? "opacity-100" : "opacity-0 -z-10"} p-3 absolute top-full left-1/2 -translate-x-1/2 bg-red-500 rounded-xl transition-opacity ease-in-out duration-300`}
                >
                    <p
                        className="text-white"
                    >
                        {error.message}
                    </p>
                </div>

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
                <Button onClick={() => {
                    init(Number(values.m), Number(values.n))
                    setValues(() => ({n: "", m: "", x: ""}))
                }}>
                    Генерувати
                </Button>
            </div>
            <div>
                X =
                <input
                    type="text"
                    name="X"
                    value={values.x}
                    placeholder="Виділенні клітинки"
                    onChange={e => handleChange(e, "x")}
                    className="w-[150px] pl-1 mr-1"
                />
                <Button onClick={() => {
                    setX(Number(values.x));
                }}>
                    Ввести
                </Button>
            </div>
        </>
    )
}