import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import styles from "../styles/pages/writeReview.module.scss";
import BlueBtn from "../components/common/BlueBtn";
import FormErrorMessage from "../components/common/FormErrorMessage";
import { ReactComponent as RadioTrue } from "../assets/icons/radioTrue.svg";
import { ReactComponent as RadioFalse } from "../assets/icons/radioFalse.svg";
import { ReactComponent as CheckboxTrue } from "../assets/icons/checkboxTrue.svg";
import { ReactComponent as CheckboxFalse } from "../assets/icons/checkboxFalse.svg";
import { ReactComponent as StarCustom } from "../assets/icons/starCustom.svg";

const WriteReview = () => {
    const {register, handleSubmit, watch, formState: {errors}, control } = useForm();
    const rateInput = useRef();

    const [type, setType] = useState(null);
    const [password, setPassword] = useState(null);
    const [toilet, setToilet] = useState([]);
    const [tissue, setTissue] = useState(null);
    const [disabled, setDisabled] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [rate, setRate] = useState("");
    const [starStatus, setStarStatus] = useState([]);

    const handleCheckbox = (e) => {
        if (toilet.find((v) => v === e.target.id)) {
            setToilet(toilet.filter((v) => v !== e.target.id));
        }
        else {
            setToilet([...toilet, e.target.id]);
        }
    }

    const onSubmit = () => {
        
    }

    console.log(watch("rate"));

    return (
        <Layout>
            <Header type="hamburger" text="리뷰 추가" />
            <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
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
                    <Controller name="type" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="type" id="separated" value="separated" onChange={(e) => setType(e.target.value)}/>
                            <label htmlFor="separated">
                                {type === "separated" ? <RadioTrue /> : <RadioFalse />}
                                남녀 분리
                            </label>
                            <input type="radio" name="type" id="unseparated" value="unseparated" onChange={(e) => setType(e.target.value)} />
                            <label htmlFor="unseparated">
                                {type === "unseparated" ? <RadioTrue /> : <RadioFalse />}
                                남녀 공용
                            </label>
                        </article>
                    )} />
                    {errors.type && <FormErrorMessage message="🚨 남녀분리 여부를 선택해주세요" />}

                    <p className={styles.subtitle}>비밀번호</p>
                    <Controller name="password" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="password" id="locked" value="locked" onChange={(e) => setPassword(e.target.id)} />
                            <label htmlFor="locked">
                                {password === "locked" ? <RadioTrue /> : <RadioFalse />}
                                있음
                            </label>
                            <input type="radio" name="password" id="unlocked" value="unlocked" onChange={(e) => setPassword(e.target.id)} />
                            <label htmlFor="unlocked">
                                {password === "unlocked" ? <RadioTrue /> : <RadioFalse />}
                                없음
                            </label>
                        </article>
                    )} />           
                    {errors.password && <FormErrorMessage message="🚨 비밀번호 여부를 선택해주세요" />}

                    <p className={styles.subtitle}>변기 종류 (중복 선택 가능)</p>
                    <article>
                        <Controller name="seat" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                            <div value={value} onChange={onChange}>
                                <input type="checkbox" id="seat" onChange={handleCheckbox} />
                                <label htmlFor="seat">
                                    {toilet.find((v) => v === "seat") ? <CheckboxTrue /> : <CheckboxFalse />}
                                    양변기
                                </label>
                            </div>
                        )}/>
                        <Controller name="squat" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                            <div value={value} onChange={onChange}>
                                <input type="checkbox" id="squat"onChange={handleCheckbox}/>
                                <label htmlFor="squat">
                                    {toilet.find((v) => v === "squat") ? <CheckboxTrue /> : <CheckboxFalse />}
                                    좌변기
                                </label>
                            </div>
                        )}/>
                        <Controller name="bidet" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                            <div value={value} onChange={onChange}>
                                <input type="checkbox" id="bidet" onChange={handleCheckbox}/>
                                <label htmlFor="bidet">
                                    {toilet.find((v) => v === "bidet") ? <CheckboxTrue /> : <CheckboxFalse />}
                                    비데
                                </label>
                            </div>
                        )}/>
                    </article>
                    {errors.seat && errors.squat && errors.bidet && <FormErrorMessage message="🚨 변기 종류를 선택해주세요" />}

                    <p className={styles.subtitle}>휴지</p>
                    <Controller name="tissue" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="tissue" id="yes" value="yes" onChange={(e) => setTissue(e.target.id)}/>
                            <label htmlFor="yes">
                                {tissue === "yes" ? <RadioTrue /> : <RadioFalse />}
                                있음
                            </label>
                            <input type="radio" name="tissue" id="no" value="no" onChange={(e) => setTissue(e.target.id)}/>
                            <label htmlFor="no">
                                {tissue === "no" ? <RadioTrue /> : <RadioFalse />}
                                없음
                            </label>
                        </article>
                    )} />
                    {errors.tissue && <FormErrorMessage message="🚨 휴지 여부를 선택해주세요" />}

                    <p className={styles.subtitle}>장애인 화장실</p>
                    <Controller name="disabled" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="disabled" id="provided" value="provided" onChange={(e) => setDisabled(e.target.id)}/>
                            <label htmlFor="provided">
                                {disabled === "provided" ? <RadioTrue /> : <RadioFalse />}
                                있음
                            </label>
                            <input type="radio" name="disabled" id="unprovided" value="unprovided" onChange={(e) => setDisabled(e.target.id)}/>
                            <label htmlFor="unprovided">
                                {disabled === "unprovided" ? <RadioTrue /> : <RadioFalse />}
                                없음
                            </label>
                        </article>
                    )} />
                    {errors.disabled && <FormErrorMessage message="🚨 장애인 화장실 여부를 선택해주세요" />}

                </section>

                <section className={styles.stars}>
                    <p className={styles.title}>별점</p>
                    <Controller name="rate" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                        {[1,2,3,4,5].map((v, i) =>
                            <>
                                <input type="radio" name="rate" id={v} value={v}/>
                                <label htmlFor={v}>
                                    <StarCustom key={v} width="32" height="30.56" fill={starStatus[i] ? "#589fd2" : "#d6d6d6"} className={styles.star} onClick={() => {
                                        let currStatus = [];
                                        for (let j=0; j<v; j++) { currStatus.push(1); }
                                        for (let j=0; j<v; j++) { currStatus.push(0); }
                                        setStarStatus(currStatus);
                                        setRate(v);
                                    }} />
                                </label>
                            </>
                        )}
                        </article>
                    )} />
                </section>
                {errors.rate && <FormErrorMessage message="🚨 별점을 입력해주세요" />}

                <section className={styles.review}>
                    <p className={styles.title}>리뷰</p>
                    <textarea {...register("textarea", {required: true})} className={styles.inputarea} placeholder="리뷰를 작성해주세요."/>
                </section>
                {errors.textarea && <FormErrorMessage message="🚨 리뷰를 입력해주세요" />}

                <section className={styles.image}>
                    <input id="image" type="file" multiple accept="image/*" onChange={(e) => console.log(e)}/>
                    <article className={styles.inputarea}>
                        <span >화장실 이미지 (선택)</span>
                        <div><label htmlFor="image">업로드</label></div>
                    </article>
                </section>

                <section className={styles.button}>
                    <BlueBtn text="리뷰 추가" />
                </section>
            </form>
        </Layout>
    );
}

export default WriteReview;