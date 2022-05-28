import React from "react";
import styles from "../styles/components/searchBox.module.scss";
import tempProfile from "../assets/images/KakaoTalk_Photo_2022-04-18-22-19-10 003.jpeg"
import Search from "../assets/icons/Search.svg";

const SearchBox = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.profile} src={tempProfile} alt="profile"/>
            <span className={styles.position}>서울시 어쩌구 2-16</span>
            <img src={Search} alt="search" />
        </div>
    );
}

export default SearchBox;