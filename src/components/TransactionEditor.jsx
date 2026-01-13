import {useContext, useState} from "react";
import {TransactionDispatchContext} from "../App";
import "./TransactionEditor.css";
import {useNavigate} from "react-router";

const categories = ["🍚 식비", "💧 구독", "🏠 생활", "🏢 급여", "💰 금융"];

export default function TransactionEditor({type, initData}) {
    const {onCreateTransaction, onUpdateTransaction} = useContext(
        TransactionDispatchContext
    );

    const navigate = useNavigate();

    const [transaction, setTransaction] = useState(() => {
        if (type === "EDIT" && initData) {
            return {
                ...initData,
                date: new Date(initData.date).toISOString().slice(0, 10),
            };
        }
        return {
            name: "",
            amount: "",
            type: "expense",
            category: categories[0],
            date: new Date().toISOString().slice(0, 10),
        };
    });

    const onSubmit = () => {
        if (!transaction.name || !transaction.amount || !transaction.category || !transaction.date) {
            return;
        }
        if (type === "CREATE") {
            onCreateTransaction(
                transaction.name,
                transaction.amount,
                transaction.type,
                transaction.category,
                transaction.date
            );
        } else {
            onUpdateTransaction(
                initData.id,
                transaction.name,
                transaction.amount,
                transaction.type,
                transaction.category,
                transaction.date
            );
        }
        navigate("/", { replace: true });
    };

    const onCancel = () => {
        navigate(-1);
    };

    return (
        <div className="TransactionEditor">
            <div>
                <div className="description">분류</div>
                <select onChange={(e) => setTransaction({...transaction, type: e.target.value})}>
                    <option value="expense">지출</option>
                    <option value="income">수입</option>
                </select>
            </div>
            <div>
                <div className="description">지출/수입 이름</div>
                <input
                    type="text"
                    id="name"
                    placeholder="지출 & 수입 이름을 입력하세요 ..."
                    value={transaction.name}
                    onChange={(e) => setTransaction({...transaction, name: e.target.value})}
                />
            </div>
            <div>
                <div className="description">지출/수입 금액</div>
                <input
                    type="number"
                    id="amount"
                    placeholder="금액을 입력하세요"
                    value={transaction.amount}
                    onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
                />
            </div>
            <div>
                <div className="description">카테고리</div>
                <select
                    onChange={(e) => setTransaction({...transaction, category: e.target.value})}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <div className="description">날짜</div>
                <input
                    type="date"
                    id="date"
                    value={transaction.date}
                    onChange={(e) => setTransaction({...transaction, date: e.target.value})}
                />
            </div>
            <div className="button_container">
                <button className="submit_button" onClick={onSubmit}>
                    저장
                </button>
                <button className="cancel_button" onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    );
}