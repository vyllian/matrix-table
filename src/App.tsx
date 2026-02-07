import {Input} from "@/components/Input.tsx";
import {Table} from "@/components/table/Table.tsx";

function App() {
    return (
        <div
            className="w-full h-full bg-pink-200 p-4 flex flex-col items-center justify-top gap-5"
        >
            <Input/>
            <Table/>
        </div>
    )
}

export default App
