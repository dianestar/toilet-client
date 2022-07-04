import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/components/reviewModal.module.scss";
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as CircleCheck } from "../../assets/icons/circleCheck.svg";

const ConfirmReview = ({ open, setOpen }) => {
    const navigate = useNavigate();

    return (
        <>
        {open &&
            <>
                <div className={styles.bg}></div>
                <section className={styles.wrapper}>
                    <Close
                        className={styles.close}
                        onClick={() => {
                            setOpen(false);
                            navigate("/my_review");
                        }}
                    />
                    <article className={styles.confirmed}>
                        <CircleCheck className={styles.check}/>
                        <p className={styles.title}>리뷰가 성공적으로</p>
                        <p className={styles.title}>작성되었습니다.</p>
                    </article>
                </section>
            </>
            }
        </>
    );
}

export default ConfirmReview;