import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import styles from "../../styles/pages/common.module.scss";
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';


const ResetPwC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = () => {};

    return (
        <Layout>
            <Header text="비밀번호 재설정" />
            <section className={styles.wrapper}>
            <p className={styles.title}>비밀번호 재설정</p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input className={styles[`form-input`]} placeholder="비밀번호" {...register("pw", { required: true })}/>
                        <Eye className={styles[`form-eye`]} />
                        {errors.pw && <span>PW error message</span>}
                    </div>
                    <div className={styles[`form-input-div`]}>
                        <input className={styles[`form-input`]} placeholder="비밀번호 확인" {...register("pwcheck", { required: true })}/>
                        <Eye className={styles[`form-eye`]} />
                        {errors.pwcheck && <span>PWCHECK errror message</span>}
                    </div>
                    <BlueBtn text={"비밀번호 재설정"} />
                </form>
            </section>
        </Layout>
    );
}

export default ResetPwC;
