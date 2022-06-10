import React, { useState, useEffect } from "react";
import styles from "../../styles/components/snackbar.module.scss";
import { ReactComponent as Error } from "../../assets/icons/error.svg"; 

const Snackbar = ({ text }) => {
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setDisplay(false);
        }, 2800);
    }, [])

    return (
        <div className={`${styles.snackbar} ${display && styles.show}`}>
            <Error className={styles.icon}/>
            <span>{text}</span>
        </div>
    );
}

export default Snackbar;