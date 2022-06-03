import React from "react";
import Layout from "../components/common/Layout";
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from "../components/ToiletInfo";
import styles from "../styles/pages/list.module.scss";

const arr = Array(5).fill(0);

const List = () => {
    return (
        <Layout>
            <section className={styles.list}>
                <SearchBox />
                <article className={styles.toiletInfoList}>
                {arr.map(() => {
                    return (
                        <div className={styles.onList}>
                            <ToiletInfo />
                        </div>
                    );
                })}
                </article>
                <NavBar />
            </section>
        </Layout>
    );
}

export default List;