import "./Home.css";
import {useContext} from "react";
import {TransactionStateContext} from "../App";
import TransactionItem from "../components/TransactionItem";
import {NavLink} from "react-router-dom";

export default function Home() {
    const transactions = useContext(TransactionStateContext);
    const sortedTransactions = transactions.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <div className="Home">
            <header>
                <h1>한입 가계부</h1>
                <NavLink className="new_button" to="/new-transaction">+ 작성하기</NavLink>
            </header>
            <main className="transaction_list">
                {sortedTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} {...transaction} />
                ))}
            </main>
        </div>
    );
}