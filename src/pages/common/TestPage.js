import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plusNum, minusNum } from "../../reducers/test";
import Layout from "../../components/common/Layout";

const TestPage = () => {
    const [input, setInput] = useState(0);
    const number = useSelector((state) => state.test.num);
    const dispatch = useDispatch();

    const onChangeInput = (e) => {
        setInput(parseInt(e.target.value));
    }

    const onClickPlus = () => {
        dispatch(plusNum(input));
    }

    const onClickMinus = () => {
        dispatch(minusNum(input));
    }

    return (
        <Layout>
            <p>{number}</p>
            <p>숫자를 입력하고 + 또는- 버튼을 누르면 입력한 숫자가 더해지거나 빼집니다</p>
            <input onChange={onChangeInput}/>
            <button onClick={onClickPlus}>+</button>
            <button onClick={onClickMinus}>-</button>
        </Layout>
    )
}

export default TestPage;