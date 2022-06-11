import React from "react";
import Layout from "../components/common/Layout";
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from "../components/ToiletInfo";
import DeleteRequest from "../components/DeleteRequest";
import styles from "../styles/pages/list.module.scss";

const arr = Array(5).fill(0);

const List = () => {
    return (
        <Layout>
            <section className={styles.list}>
                <SearchBox />
                {arr.map((value, index) => {
                    return (
                        <ToiletInfo type="onList"/>
                    );
                })}
                <NavBar num={[1, 0, 1, 1]} />
            </section>
        </Layout>
    );
}

export default List;
