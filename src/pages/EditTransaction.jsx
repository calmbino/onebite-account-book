import {useContext} from "react";
import TransactionEditor from "../components/TransactionEditor";
import "./EditTransaction.css";
import {TransactionStateContext} from "../App";
import {useParams} from "react-router";
import NotFound from "./NotFound";

function EditTransaction() {
    const params = useParams();
    const {id} = params;

    const transaction = useContext(TransactionStateContext);
    const currentTransaction = transaction.find(
        (transaction) => transaction.id === Number(id)
    );

    if (!currentTransaction) {
        return <NotFound/>;
    }


    return (
        <div className="EditTransaction">
            <header>
                <h1>기록 수정하기</h1>
            </header>
            <TransactionEditor type={"EDIT"} initData={currentTransaction}/>
        </div>
    );
}

export default EditTransaction;