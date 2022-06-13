import React from "react";
import styles from "../../styles/components/askReview.module.scss";

const AskReview = () => {
    return (
        <>
            {open &&
            <>
                <div className={`${styles.bg} ${styles[`open-bg`]}`}></div>
                <section className={`${styles.wrapper} ${styles[`open-wrapper`]}`}>
                    <Close
                        classNAme={styles.close}
                        onClick={() => {

                        }}
                    />
                    <p>리뷰를 작성해주세요!</p>
                    <p>
                        화장실이 성공적으로 등록됐습니다!
                        <br/>
                        리뷰를 작성하면 다른 사용자들에게 더 많은 정보를
                        <br/>
                        제공할 수 있습니다!
                    </p>
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
        </>
    );
}

export default AskReview;