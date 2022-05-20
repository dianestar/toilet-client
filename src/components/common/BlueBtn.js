import React from "react";
import styles from "../../styles/components/bluebtn.module.scss";

const BlueBtn = ({ text, onClick }) => {
    return (
        <button className={styles[`blue-btn`]} /*onClick={onClick}*/>{text}</button>
    );
}

export default BlueBtn;