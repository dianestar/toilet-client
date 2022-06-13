import React, { useState } from "react";
import styles from "../../styles/components/deleteConfirm.module.scss";
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as CircleQuestion } from "../../assets/icons/circleQuestion.svg";
import { ReactComponent as CircleCheck } from "../../assets/icons/circleCheck.svg";

const DeleteConfirm = ({ open, setOpen }) => {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <>
            {open && !confirmed &&
            <>
                <div className={`${styles.bg} ${styles[`open-bg`]}`}></div>
                <section className={`${styles.wrapper} ${styles[`open-wrapper`]}`}>
                    <Close
                        className={styles.close}
                        onClick={() => {
                            setOpen(false);
                        }}
                    />
                    <article className={styles.desc}>
                        <CircleQuestion className={styles.question}/>
                        <p>정말 삭제하시겠습니까?</p>
                    </article>
                    <article className={styles[`btn-div`]}>
                        <button
                            className={`${styles.cancel} ${styles.btn}`}
                            onClick={() => setOpen(false)}
                        >
                            취소
                        </button>
                        <button
                            className={`${styles.ok} ${styles.btn}`}
                            onClick={() => setConfirmed(true)}
                        >
                            확인
                        </button>
                    </article>
                </section>
            </>
            }
            {open && confirmed &&
            <>
                <div className={styles.bg}></div>
                <section className={styles.wrapper}>
                    <Close
                        className={styles.close}
                        onClick={() => {
                            setConfirmed(false);
                            setOpen(false);
                        }}
                    />
                    <article className={styles.confirmed}>
                        <CircleCheck className={styles.check}/>
                        <p className={styles.title}>리뷰가 성공적으로</p>
                        <p className={styles.title}>삭제됐습니다.</p>
                    </article>
                </section>
            </>
            }
        </>
    );
}

export default DeleteConfirm;