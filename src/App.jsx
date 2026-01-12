import './App.css'
import Home from './pages/Home'
import NewTransaction from "./pages/NewTransaction";
import EditTransaction from "./pages/EditTransaction";
import NotFound from "./pages/NotFound";
import {Route, Routes} from 'react-router-dom'
import {createContext, useReducer, useRef} from "react";

const mockData = [
    {
        id: 0,
        name: "마라탕 & 꿔바로우",
        amount: 59000,
        type: "expense",
        category: "🍚 식비",
        date: new Date().getTime() + 1,
    },
    {
        id: 1,
        name: "월세",
        amount: 500000,
        type: "expense",
        category: "🏠 생활",
        date: new Date().getTime() + 2,
    },
    {
        id: 2,
        name: "월급",
        amount: 3500000,
        type: "income",
        category: "🏢 급여",
        date: new Date().getTime() + 3,
    },
];

export const TransactionStateContext = createContext();
export const TransactionDispatchContext = createContext();

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.payload;
        case 'CREATE':
            return [...state, action.payload];
        case "UPDATE":
            return state.map(tx => tx.id === action.payload.id ? action.payload : tx);
        case "DELETE":
            return state.filter(tx => tx.id !== action.payload.id);
        default:
            return state;
    }
}

function App() {
    const [transactions, dispatch] = useReducer(transactionsReducer, mockData);
    const idRef = useRef(transactions.length);


    const onCreateTransaction = (name, amount, type, category, date) => {
        const newTransaction = {
            id: idRef.current++,
            name,
            amount,
            type,
            category,
            date,
        };
        dispatch({type: "CREATE", payload: newTransaction});
    };

    const onUpdateTransaction = (id, name, amount, type, category, date) => {
        // 기존 아이템을 수정하는 함수
        dispatch({type: "UPDATE", payload: {id, name, amount, type, category, date}});
    };

    const onDeleteTransaction = (id) => {
        // 기존 아이템을 삭제하는 함수
        dispatch({type: "DELETE", payload: id});
    };

    return (
        <TransactionStateContext value={transactions}>
            <TransactionDispatchContext.Provider
                value={{onCreateTransaction, onUpdateTransaction, onDeleteTransaction}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/new-transaction" element={<NewTransaction/>}/>
                    <Route path="/edit-transaction/:id" element={<EditTransaction/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </TransactionDispatchContext.Provider>
        </TransactionStateContext>
    );
}

export default App
