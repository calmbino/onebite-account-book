import "./TransactionItem.css";
import {NavLink} from "react-router-dom";

export default function TransactionItem(props) {
    const { id, name, amount, type, category, date } = props;

    return (
        <div className="TransactionItem">
            <div className="category">{category}</div>
            <div className="name">{name}</div>
            <div
                className={`amount ${
                    type === "income" ? "amount_income" : "amount_expense"
                }`}
            >
                {type === "income" ? "+" : "-"}
                &nbsp;
                {Number(amount).toLocaleString("ko-KR")}원
            </div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <div className="button_container">
                <NavLink className="edit_button" to={`/edit-transaction/${id}`}>수정</NavLink>
                <div className="delete_button">삭제</div>
            </div>
        </div>
    );
}