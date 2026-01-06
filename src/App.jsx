import './App.css'
import Home from './pages/Home'
import NewTransaction from "./pages/NewTransaction";
import EditTransaction from "./pages/EditTransaction";
import NotFound from "./pages/NotFound";
import {Route, Routes} from 'react-router-dom'


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new-transaction" element={<NewTransaction/>}/>
            <Route path="/edit-transaction" element={<EditTransaction/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App
