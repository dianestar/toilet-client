import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Review from "../components/Review";
import DeleteConfirm from "../components/DeleteConfirm";
import styles from "../styles/pages/myReview.module.scss";

const arr = [0, 1, 0, 1, 0];

const MyReview = () => {
    const [open, setOpen] = useState(false);

    return (
        <Layout>
            <section className={styles[`my-review`]}>
                <Header text="리뷰 관리" />
                <article className={styles.wrapper}>
                    {arr.map((value, index) => {
                        return (
                            <Review key={index} yesImg={value} setOpen={setOpen}/>
                        )
                    })}
                </article>
                <DeleteConfirm open={open} setOpen={setOpen}/>
            </section>
        </Layout>
    );
}

export default MyReview;