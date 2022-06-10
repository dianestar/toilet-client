import React, { useState } from "react";
import Layout from "../components/common/Layout";
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from "../components/ToiletInfo";
import DeleteRequest from "../components/DeleteRequest";
import styles from "../styles/pages/list.module.scss";

const arr = Array(5).fill(0);

const List = () => {
    const [open, setOpen] = useState(false);

    return (
        <Layout>
            <section className={styles.list}>
                <SearchBox />
                <article className={styles.toiletInfoList}>
                {arr.map((value, index) => {
                    return (
                        <div key={index} className={styles.onList}>
                            <ToiletInfo setOpen={setOpen}/>
                        </div>
                    );
                })}
                </article>
                <DeleteRequest open={open} setOpen={setOpen}/>
                <NavBar num={[1, 0, 1, 1]} />
            </section>
        </Layout>
    );
}

export default List;
