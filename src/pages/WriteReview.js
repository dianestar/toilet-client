import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import styles from "../styles/pages/writeReview.module.scss";
import BlueBtn from "../components/common/BlueBtn";
import { ReactComponent as RadioTrue } from "../assets/icons/radioTrue.svg";
import { ReactComponent as RadioFalse } from "../assets/icons/radioFalse.svg";
import { ReactComponent as CheckboxTrue } from "../assets/icons/checkboxTrue.svg";
import { ReactComponent as CheckboxFalse } from "../assets/icons/checkboxFalse.svg";
import { ReactComponent as StarCustom } from "../assets/icons/starCustom.svg";

const WriteReview = () => {
    const [type, setType] = useState(null);
    const [password, setPassword] = useState(null);
    const [toilet, setToilet] = useState([]);
    const [tissue, setTissue] = useState(null);
    const [disabled, setDisabled] = useState(null);
    const [active, setActive] = useState(false);
    const [rate, setRate] = useState(0);
    const [starStatus, setStarStatus] = useState([]);

    const handleCheckbox = (e) => {
        if (toilet.find((v) => v === e.target.id)) {
            setToilet(toilet.filter((v) => v !== e.target.id));
        }
        else {
            setToilet([...toilet, e.target.id]);
        }
    }

    return (
        <Layout>
            <Header type="hamburger" text="리뷰 추가" />
            <form className={styles.wrapper}>
                <section className={styles.location}>
                    <p className={styles.title}>화장실 위치</p>
                    <article>
                        <p className={styles.subtitle}>주소</p>
                        <p className={styles.content}>서울시 어쩌구 2-16</p>
                    </article>
                    <article>
                        <p className={styles.subtitle}>정확한 위치</p>
                        <p className={styles.content}>뫄뫄빌딩 2층 복도 끝</p>
                    </article>
                </section>
                <section className={styles.options}>
                    <p className={styles.title}>옵션 정보</p>
                    <p className={styles.subtitle}>종류</p>
                    <article>
                        <input type="radio" name="type" id="separated" onChange={(e) => setType(e.target.id)}/>
                        <label htmlFor="separated">
                            {type === "separated" ? <RadioTrue /> : <RadioFalse />}
                            남녀 분리
                        </label>
                        <input type="radio" name="type" id="unseparated" onChange={(e) => setType(e.target.id)}/>
                        <label htmlFor="unseparated">
                            {type === "unseparated" ? <RadioTrue /> : <RadioFalse />}
                            남녀 공용
                        </label>
                    </article>
                    <p className={styles.subtitle}>비밀번호</p>
                    <article>
                        <input type="radio" name="password" id="locked" onChange={(e) => setPassword(e.target.id)}/>
                        <label htmlFor="locked">
                            {password === "locked" ? <RadioTrue /> : <RadioFalse />}
                            있음
                        </label>
                        <input type="radio" name="password" id="unlocked" onChange={(e) => setPassword(e.target.id)}/>
                        <label htmlFor="unlocked">
                            {password === "unlocked" ? <RadioTrue /> : <RadioFalse />}
                            없음
                        </label>
                    </article>
                    <p className={styles.subtitle}>변기 종류</p>
                    <article>
                        <input type="checkbox" name="toilet" id="seat" onChange={handleCheckbox}/>
                        <label htmlFor="seat">
                            {toilet.find((v) => v === "seat") ? <CheckboxTrue /> : <CheckboxFalse />}
                            양변기
                        </label>
                        <input type="checkbox" name="toilet" id="squat" onChange={handleCheckbox}/>
                        <label htmlFor="squat">
                            {toilet.find((v) => v === "squat") ? <CheckboxTrue /> : <CheckboxFalse />}
                            좌변기
                        </label>
                        <input type="checkbox" name="toilet" id="bidet" onChange={handleCheckbox}/>
                        <label htmlFor="bidet">
                            {toilet.find((v) => v === "bidet") ? <CheckboxTrue /> : <CheckboxFalse />}
                            비데
                        </label>
                    </article>
                    <p className={styles.subtitle}>휴지</p>
                    <article>
                        <input type="radio" name="tissue" id="yes" onChange={(e) => setTissue(e.target.id)}/>
                        <label htmlFor="yes">
                            {tissue === "yes" ? <RadioTrue /> : <RadioFalse />}
                            있음
                        </label>
                        <input type="radio" name="tissue" id="no" onChange={(e) => setTissue(e.target.id)}/>
                        <label htmlFor="no">
                            {tissue === "no" ? <RadioTrue /> : <RadioFalse />}
                            없음
                        </label>
                    </article>
                    <p className={styles.subtitle}>장애인 화장실</p>
                    <article>
                        <input type="radio" name="disabled" id="provided" onChange={(e) => setDisabled(e.target.id)}/>
                        <label htmlFor="provided">
                            {disabled === "provided" ? <RadioTrue /> : <RadioFalse />}
                            있음
                        </label>
                        <input type="radio" name="disabled" id="unprovided" onChange={(e) => setDisabled(e.target.id)}/>
                        <label htmlFor="unprovided">
                            {disabled === "unprovided" ? <RadioTrue /> : <RadioFalse />}
                            없음
                        </label>
                    </article>
                </section>
                <section className={styles.stars}>
                    <p className={styles.title}>별점</p>
                    {[1,2,3,4,5].map((v, i) => 
                        <StarCustom key={v} width="32" height="30.56" fill={starStatus[i] ? "#589fd2" : "#d6d6d6"} className={styles.star} onClick={() => {
                            let currStatus = [];
                            for (let j=0; j<v; j++) { currStatus.push(1); }
                            for (let j=0; j<v; j++) { currStatus.push(0); }
                            setStarStatus(currStatus);
                            setRate(v);
                        }} />
                    )}
                </section>
                <section className={styles.review}>
                    <p className={styles.title}>리뷰</p>
                    <textarea className={styles.inputarea} placeholder="리뷰를 작성해주세요."/>
                </section>
                <section className={styles.image}>
                    <input id="image" type="file" multiple accept="image/*" onChange={(e) => console.log(e)}/>
                    <article className={styles.inputarea}>
                        <span >화장실 이미지 (선택)</span>
                        <div><label htmlFor="image">업로드</label></div>
                    </article>
                </section>
                <section className={styles.button}>
                    <BlueBtn active={active} text="리뷰 추가" />
                </section>
            </form>
        </Layout>
    );
}

export default WriteReview;