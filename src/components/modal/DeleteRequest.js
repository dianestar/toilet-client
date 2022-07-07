import React, { useState, useEffect } from "react";
import styles from "../../styles/components/requestModal.module.scss";
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as CircleCheck } from "../../assets/icons/circleCheck.svg";
import { TOILET_DELETE_REQUEST } from "../../core/_axios/toilet";
import { REVIEW_DELETE_REQUEST } from "../../core/_axios/review";

const DeleteRequest = ({ open, setOpen, id, type, toggle, setToggle }) => {
    const [selected, setSelected] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [reasons, setReasons] = useState([]);

    const onChange = () => {
        setSelected(true);    
    }

    const onClick = async () => {
        try {
            if (type === "toilet") {
                const {
                    data: { success, data }
                } = await TOILET_DELETE_REQUEST({address: id});
    
                if (success) {
                    setConfirmed(true);
                    console.log(data);
                }
            }
            
            else {
                const {
                    data: { success, data }
                } = await REVIEW_DELETE_REQUEST({id});

                if (success) {
                    setConfirmed(true);
                    console.log(data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (type === "toilet") {
            setReasons(["없어진 화장실이에요.", "중복 제보된 화장실이에요", "부적절한 내용이 있어요"]);
        }
        else {
            setReasons(["잘못된 정보가 포함되어 있어요", "욕설 등 부적절한 표현이 있어요", "화장실과 관련 없는 내용이에요"]);
        }
    }, [type])

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
                    <p className={styles.title}>{type === "toilet" ? "삭제요청" : "신고"} 하시는</p>
                    <p className={styles.title}>이유가 궁금해요!</p>
                    <p className={styles.desc}>3건 이상의 요청이 들어오면 자동 삭제됩니다.</p>
                    <article className={styles.options}>
                        {reasons.map((v, i) => 
                            <React.Fragment key={i}>
                                <input 
                                    type="radio"
                                    name="options"
                                    id={String(i)}
                                    className={styles.radio}
                                    onChange={onChange}
                                />
                                <label
                                    htmlFor={String(i)}
                                    className={styles.option}
                                >
                                    {v}
                                </label>
                            </React.Fragment>
                        )}
                    </article>
                    <button
                        className={`${styles.confirm} ${selected ? styles.enabled : styles.disabled}`}
                        onClick={onClick}
                    >
                        {type === "toilet" ? "삭제 요청하기" : "신고하기"}
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
                            setToggle(!toggle);
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