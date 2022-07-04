import React, { useState } from "react";
import styles from "../../styles/components/reviewModal.module.scss";
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as CircleQuestion } from "../../assets/icons/circleQuestion.svg";
import { ReactComponent as CircleCheck } from "../../assets/icons/circleCheck.svg";
import { DELETE_REVIEW } from "../../core/_axios/review";

const DeleteConfirm = ({ open, setOpen, id, toggle, setToggle }) => {
    const [confirmed, setConfirmed] = useState(false);

    const onDelete = async () => {
        try {
            const response = await DELETE_REVIEW(id);
            console.log(response);
            setConfirmed(true)
        } catch (error) {
            console.log(error);
        }
    }

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
                    <article className={styles[`text-div`]}>
                        <CircleQuestion className={styles.question}/>
                        <p className={styles.title}>정말 삭제하시겠습니까?</p>
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
                            onClick={onDelete}
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
                            setToggle(!toggle);
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