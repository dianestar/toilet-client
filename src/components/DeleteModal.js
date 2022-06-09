import React, { useState } from "react";
import styles from "../styles/components/deleteModal.module.scss";
import { ReactComponent as Close } from '../assets/icons/close.svg';

const DeleteModal = ({ open, setOpen }) => {
    const [selected, setSelected] = useState(false);
    const onChange = () => {
        setSelected(true);    
    }

    return (
        <>
            {open &&
            <>
                <div className={styles.bg}></div>
                <section className={styles.wrapper}>
                    <Close className={styles.close} onClick={() => setOpen(false)}/>
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
                    <button className={`${styles.confirm} ${selected ? styles.enabled : styles.disabled}`}>삭제 요청하기</button>
                </section>
            </>
            }
        </>
);
}

export default DeleteModal;