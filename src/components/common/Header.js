import React from "react";
import Back from "../../assets/icons/Back.svg";
import styles from "../../styles/components/header.module.scss";

const Header = ({text}) => {
    return (
        <section className={styles.header}>
            <img src={Back} alt="back"/>
            <span className={styles[`header-title`]}>{text}</span>
        </section>
    );
}

export default Header;