import React, { useState, Fragment, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import styles from "../styles/pages/reviewForm.module.scss";
import BlueBtn from "../components/common/BlueBtn";
import FormErrorMessage from "../components/common/FormErrorMessage";
import ConfirmReview from "../components/modal/ConfirmReview";
import { ReactComponent as RadioTrue } from "../assets/icons/radioTrue.svg";
import { ReactComponent as RadioFalse } from "../assets/icons/radioFalse.svg";
import { ReactComponent as CheckboxTrue } from "../assets/icons/checkboxTrue.svg";
import { ReactComponent as CheckboxFalse } from "../assets/icons/checkboxFalse.svg";
import { ReactComponent as StarCustom } from "../assets/icons/starCustom.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";
import { POST_REVIEW, POST_IMAGE, PATCH_REVIEW } from "../core/_axios/review";
import { GET_ONE_TOILET } from "../core/_axios/toilet";
import { DELETE_IMAGE } from "../core/_axios/review";

const ReviewForm= () => {
    const {register, handleSubmit, watch, formState: {errors, isSubmitted}, control, setValue} = useForm();
    const params = useParams();
    const location = useLocation();
    
    const address = params.address;
    const [detail_address, setDetailAddress] = useState("");

    const reviewInfo = location.state?.reviewInfo;

    const [type, setType] = useState(!location.state ? null : (reviewInfo.common ? "unseparated" : "separated"));
    const [password, setPassword] = useState(!location.state ? null : (reviewInfo.lock ? "locked" : "unlocked"));
    const [tissue, setTissue] = useState(!location.state ? null : (reviewInfo.paper ? "yes" : "no"));
    const [disabled, setDisabled] = useState(!location.state ? null : (reviewInfo.disabled ? "provided" : "unprovided"));
    const [toilet, setToilet] = useState([]);
    const [starStatus, setStarStatus] = useState([]);

    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const imgInput = useRef();

    const [open, setOpen] = useState(false);

    const handleCheckbox = (e) => {
        if (toilet.find((v) => v === e.target.id)) {
            setToilet(toilet.filter((v) => v !== e.target.id));
        }
        else {
            setToilet([...toilet, e.target.id]);
        }
    }

    const onChangeImg = (e) => {
        setImgFile(e.target.files[0]);
        setImgUrl(URL.createObjectURL(e.target.files[0]));
    }

    const onCancelImg = async () => {
        if (imgUrl && !imgFile) {
            try {
                const {
                    data: { success, data }
                } = await DELETE_IMAGE({id: reviewInfo.review_id});
                
                if (success) {
                    console.log(data);
                    setImgUrl("");
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setImgFile(null);
            setImgUrl("");
            URL.revokeObjectURL(imgUrl);
            imgInput.current.value = "";
        }   
    }

    const onSubmit = async () => {
        const toiletArr = [];
        toilet.forEach((v) => {
            if (v === "seat") { toiletArr.push("0"); }
            else if (v === "squat") { toiletArr.push("1"); }
            else if (v === "bidet") { toiletArr.push("2"); }
        });
        toiletArr.sort();

        const form = {
            common: watch("type") === "unseparated" ? true : false,
            lock: watch("password") === "locked" ? true : false,
            types: toiletArr,
            paper: watch("tissue") === "yes" ? true : false,
            disabled: watch("disabled") === "provided" ? true : false,
            content: watch("textarea"),
            rate: parseInt(watch("rate")),
        };

        const imgForm = new FormData();
        if (imgFile) {
            imgForm.append("image", imgFile);
        }

        try {
            const res = await POST_IMAGE(imgForm);
            console.log(res);
            
            // create mode
            if (location.state === null) {
                const postForm = {...form, address};

                const {
                    data: { success, data }
                } = await POST_REVIEW(postForm);
    
                if (success) {
                    console.log(data);
                    setOpen(true);
                }
            }

            // edit mode
            else {
                const patchForm = {...form, id: location.state.reviewInfo.review_id};

                const {
                    data: { success, data }
                } = await PATCH_REVIEW(patchForm);

                if (success) {
                    console.log("edit");
                    console.log(data);
                    setOpen(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getDetailAddress = async () => {
            try {
                const {
                    data: { success, data: { detailAddress } }
                } = await GET_ONE_TOILET({address});

                if (success) {
                    setDetailAddress(detailAddress);
                }
            } catch (error) {
                console.log(error);
            }    
        }
        getDetailAddress();

        // edit mode
        if (location.state !== null) {
            setValue("type", reviewInfo.common ? "unseparated" : "separated");
            setValue("password", reviewInfo.lock ? "locked" : "unlocked");
            setValue("tissue", reviewInfo.paper ? "yes" : "no");
            setValue("disabled", reviewInfo.disabled ? "provided" : "unprovided");

            const tempToilet = [];
            reviewInfo.types.split(",").forEach((v) => {
                if (v === "0") {
                    tempToilet.push("seat");
                    setValue("seat", true);
                }
                else if (v === "1") {
                    tempToilet.push("squat");
                    setValue("squat", true);
                }
                else {
                    tempToilet.push("bidet");
                    setValue("bidet", true);
                }
            });
            setToilet(tempToilet);

            const tempStarStatus = [];
            for (let i=0; i<reviewInfo.rate; i++) { tempStarStatus.push(1); }
            for (let i=0; i<5-reviewInfo.rate; i++) { tempStarStatus.push(0); }
            setStarStatus(tempStarStatus);
            setValue("rate", reviewInfo.rate);

            setValue("textarea", reviewInfo.content);

            setImgUrl(reviewInfo.toilet_img);
        }
    }, [address, location.state, setValue, reviewInfo]);

    return (
        <Layout>
            <Header type="back" text="?????? ??????" />
            <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
                <section className={styles.location}>
                    <p className={styles.title}>????????? ??????</p>
                    <article>
                        <p className={styles.subtitle}>??????</p>
                        <p className={styles.content}>{address}</p>
                    </article>
                    <article>
                        <p className={styles.subtitle}>????????? ??????</p>
                        <p className={styles.content}>{detail_address}</p>
                    </article>
                </section>
                
                <section className={styles.options}>
                    <p className={styles.title}>?????? ??????</p>

                    <p className={styles.subtitle}>??????</p>
                    <Controller name="type" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="type" id="separated" value="separated" onChange={(e) => setType(e.target.value)}/>
                            <label htmlFor="separated">
                                {type === "separated" ? <RadioTrue /> : <RadioFalse />}
                                ?????? ??????
                            </label>
                            <input type="radio" name="type" id="unseparated" value="unseparated" onChange={(e) => setType(e.target.value)} />
                            <label htmlFor="unseparated">
                                {type === "unseparated" ? <RadioTrue /> : <RadioFalse />}
                                ?????? ??????
                            </label>
                        </article>
                    )} />
                    {errors.type && <FormErrorMessage message="???? ???????????? ????????? ??????????????????" />}

                    <p className={styles.subtitle}>????????????</p>
                    <Controller name="password" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="password" id="locked" value="locked" onChange={(e) => setPassword(e.target.id)} />
                            <label htmlFor="locked">
                                {password === "locked" ? <RadioTrue /> : <RadioFalse />}
                                ??????
                            </label>
                            <input type="radio" name="password" id="unlocked" value="unlocked" onChange={(e) => setPassword(e.target.id)} />
                            <label htmlFor="unlocked">
                                {password === "unlocked" ? <RadioTrue /> : <RadioFalse />}
                                ??????
                            </label>
                        </article>
                    )} />           
                    {errors.password && <FormErrorMessage message="???? ???????????? ????????? ??????????????????" />}

                    <p className={styles.subtitle}>?????? ?????? (?????? ?????? ??????)</p>
                    <article>
                        <Controller name="seat" control={control} render={({field: { onChange, value }}) => (
                            <div value={value} onChange={onChange}>
                                <input type="checkbox" id="seat" onChange={handleCheckbox} />
                                <label htmlFor="seat">
                                    {toilet.find((v) => v === "seat") ? <CheckboxTrue /> : <CheckboxFalse />}
                                    ?????????
                                </label>
                            </div>
                        )}/>
                        <Controller name="squat" control={control} render={({field: { onChange, value }}) => (
                            <div value={value} onChange={onChange}>
                                <input type="checkbox" id="squat"onChange={handleCheckbox}/>
                                <label htmlFor="squat">
                                    {toilet.find((v) => v === "squat") ? <CheckboxTrue /> : <CheckboxFalse />}
                                    ?????????
                                </label>
                            </div>
                        )}/>
                        <Controller name="bidet" control={control} render={({field: { onChange, value }}) => (
                            <div value={value} onChange={onChange}>
                                <input type="checkbox" id="bidet" onChange={handleCheckbox}/>
                                <label htmlFor="bidet">
                                    {toilet.find((v) => v === "bidet") ? <CheckboxTrue /> : <CheckboxFalse />}
                                    ??????
                                </label>
                            </div>
                        )}/>
                    </article>
                    {isSubmitted && toilet.length === 0 && <FormErrorMessage message="???? ?????? ????????? ??????????????????" />}

                    <p className={styles.subtitle}>??????</p>
                    <Controller name="tissue" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="tissue" id="yes" value="yes" onChange={(e) => setTissue(e.target.id)}/>
                            <label htmlFor="yes">
                                {tissue === "yes" ? <RadioTrue /> : <RadioFalse />}
                                ??????
                            </label>
                            <input type="radio" name="tissue" id="no" value="no" onChange={(e) => setTissue(e.target.id)}/>
                            <label htmlFor="no">
                                {tissue === "no" ? <RadioTrue /> : <RadioFalse />}
                                ??????
                            </label>
                        </article>
                    )} />
                    {errors.tissue && <FormErrorMessage message="???? ?????? ????????? ??????????????????" />}

                    <p className={styles.subtitle}>????????? ?????????</p>
                    <Controller name="disabled" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                            <input type="radio" name="disabled" id="provided" value="provided" onChange={(e) => setDisabled(e.target.id)}/>
                            <label htmlFor="provided">
                                {disabled === "provided" ? <RadioTrue /> : <RadioFalse />}
                                ??????
                            </label>
                            <input type="radio" name="disabled" id="unprovided" value="unprovided" onChange={(e) => setDisabled(e.target.id)}/>
                            <label htmlFor="unprovided">
                                {disabled === "unprovided" ? <RadioTrue /> : <RadioFalse />}
                                ??????
                            </label>
                        </article>
                    )} />
                    {errors.disabled && <FormErrorMessage message="???? ????????? ????????? ????????? ??????????????????" />}

                </section>

                <section className={styles.stars}>
                    <p className={styles.title}>??????</p>
                    <Controller name="rate" control={control} rules={{required: true}} render={({field: { onChange, value }}) => (
                        <article value={value} onChange={onChange}>
                        {[1,2,3,4,5].map((v, i) =>
                            <Fragment key={v}>
                                <input type="radio" name="rate" id={v} value={v}/>
                                <label htmlFor={v}>
                                    <StarCustom key={v} width="32" height="30.56" fill={starStatus[i] ? "#589fd2" : "#d6d6d6"} className={styles.star} onClick={() => {
                                        let currStatus = [];
                                        for (let j=0; j<v; j++) { currStatus.push(1); }
                                        for (let j=0; j<5-v; j++) { currStatus.push(0); }
                                        console.log(currStatus);
                                        setStarStatus(currStatus);
                                    }} />
                                </label>
                            </Fragment>
                        )}
                        </article>
                    )} />
                </section>
                {errors.rate && <FormErrorMessage message="???? ????????? ??????????????????" />}

                <section className={styles.review}>
                    <p className={styles.title}>??????</p>
                    <textarea {...register("textarea", {required: true})} className={styles.inputarea} placeholder="????????? ??????????????????."/>
                </section>
                {errors.textarea && <FormErrorMessage message="???? ????????? ??????????????????" />}

                <section className={styles.image}>
                    <input ref={imgInput} id="image" type="file" multiple accept="image/*" onChange={onChangeImg}/>
                    <article className={styles.inputarea}>
                        <span>{imgFile ? imgFile.name : (imgUrl ? imgUrl.split("/").pop() : "????????? ????????? (??????)")}</span>
                        <div><label htmlFor="image">?????????</label></div>
                    </article>
                    {imgUrl &&
                    <article className={styles.imgarea}>
                        <img src={imgUrl} alt="preview"/>
                        <Close className={styles.cancel} onClick={onCancelImg}/>
                    </article>
                    }
                </section>

                <section className={styles.button}>
                    <BlueBtn text="?????? ??????" />
                </section>
            </form>
            {open && <ConfirmReview open={open} setOpen={setOpen}/>}
        </Layout>
    );
}

export default ReviewForm;