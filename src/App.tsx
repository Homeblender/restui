import {useState} from 'react'
import './App.css'
import {Button} from "antd";
import {GitTable} from "./components/GitTable.tsx";
import GitForm from "./components/GitForm.tsx";

function App() {
    const [isForm, setIsForm] = useState(false)

    return (
        <>
            {(isForm) && <GitForm/>}
            {(!isForm) && <GitTable/>}
            <div className="card">
                <Button onClick={() => setIsForm((isForm) => !isForm)}>
                    {(!isForm) && <>Добавить репозитории</>}
                    {(isForm) && <>Таблица репозиториев</>}
                </Button>
            </div>
        </>
    )
}

export default App
