import React, { useState } from "react";
import styles from "../../styles/components/toiletModal.module.scss";
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as CircleCheck } from "../../assets/icons/circleCheck.svg";
import { DELETE_REQUEST } from "../../core/_axios/toilet";

const DeleteRequest = ({ open, setOpen, address = "서울시 강남구 역삼동 2-16" }) => {
    const [selected, setSelected] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const onChange = () => {
        setSelected(true);    
    }

    const onClick = async () => {
        try {
            const {
                data: { success, data }
            } = await DELETE_REQUEST({address});

            if (success) {
                setConfirmed(true);
                console.log(data);
            }
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
                            setSelected(false);
                            setOpen(false);
                        }}
                    />
                    <p className={styles.title}>삭제요청 하시는</p>
                    <p className={styles.title}>이유가 궁금해요!</p>
                    <p className={styles.desc}>3건 이상의 요청이 들어오면 자동 삭제됩니다.</p>
                    <article className={styles.options}>
                        <input
                            type="radio"
                            name="options"
                            id="disappeared"
                            className={styles.radio}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="disappeared"
                            className={styles.option}
                        >
                            없어진 화장실이에요.
                        </label>
                        <input
                            type="radio"
                            name="options"
                            id="duplicated"
                            className={styles.radio}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="duplicated"
                            className={styles.option}
                        >
                            중복 제보된 화장실이에요.
                        </label>
                        <input
                            type="radio"
                            name="options"
                            id="inadequate"
                            className={styles.radio}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="inadequate"
                            className={styles.option}
                        >
                            부적절한 내용이 있어요.
                        </label>
                    </article>
                    <button
                        className={`${styles.confirm} ${selected ? styles.enabled : styles.disabled}`}
                        onClick={onClick}
                    >
                        삭제 요청하기
                    </button>
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
                            setSelected(false);
                            setConfirmed(false);
                            setOpen(false);
                        }}
                    />
                    <article className={styles.confirmed}>
                        <CircleCheck className={styles.check}/>
                        <p className={styles.title}>삭제요청이 성공적으로</p>
                        <p className={styles.title}>접수됐습니다!</p>
                    </article>
                </section>
            </>
            }
        </>
);
}

export default DeleteRequest;