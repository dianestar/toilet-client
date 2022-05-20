import React from "react";
import styles from "../../styles/components/layout.module.scss";

const Layout = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default Layout;
