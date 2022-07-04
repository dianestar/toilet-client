import React from "react";
import styles from "../../styles/components/bluebtn.module.scss";

const BlueBtn = ({ text, active = true }) => {
    return (
        <button className={`${styles.btn} ${active ? styles.enabled : styles.disabled}`}>{text}</button>
    );
}

export default BlueBtn;