import React from "react";
import styles from "../../styles/components/snackbar.module.scss";
import { ReactComponent as Error } from "../../assets/icons/error.svg"; 
import { ReactComponent as Success } from "../../assets/icons/success.svg";

const Snackbar = ({ type, text }) => {
    return (
        <div className={styles.snackbar}>
            {type === "success"
            ?
            <Success className={styles.icon}/>
            :
            <Error className={styles.icon}/>
            }
            <span>{text}</span>
        </div>
    );
}

export default Snackbar;