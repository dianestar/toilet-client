import React from "react";
import styles from "../../styles/components/reviewModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

const AskReview = ({ open, setOpen }) => {
    return (
        <>
            {open &&
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
                        <p className={styles.title}>리뷰를 작성해주세요!</p>
                        <p className={styles.desc}>
                            화장실이 성공적으로 등록됐습니다!
                            <br/>
                            리뷰를 작성하면 다른 사용자들에게 더 많은 정보를
                            <br/>
                            제공할 수 있습니다!
                        </p>
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
                            onClick={() => setOpen(false)}
                        >
                            리뷰 작성
                        </button>
                    </article>
                </section>
            </>
            }
        </>
    );
}

export default AskReview;