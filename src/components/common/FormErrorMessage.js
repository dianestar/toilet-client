import React from "react";
import styles from "../../styles/components/formErrorMessage.module.scss";

const FormErrorMessage = ({ message }) => {
    return (
        <div className={styles.message}>
            {message}
        </div>
    );
}

export default FormErrorMessage;