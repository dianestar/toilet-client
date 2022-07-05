import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Review from "../components/Review";
import styles from "../styles/pages/myReview.module.scss";
import { GET_USER_REVIEWS } from "../core/_axios/review";

const MyReview = () => {
    const [reviews, setReviews] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getReviews = async() => {
            try {
                const {
                    data: { success, data }
                } = await GET_USER_REVIEWS();
    
                if (success) {
                    console.log(data);
                    setReviews(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getReviews();
    }, [toggle])

    return (
        <Layout>
            <section className={styles[`my-review`]}>
                <Header type="back" text="리뷰 관리" />
                <article className={styles.wrapper}>
                    {reviews.map((value) => {
                        return (
                            <Review key={value.id} reviewInfo={value} toggle={toggle} setToggle={setToggle}/>
                        )
                    })}
                </article>
            </section>
        </Layout>
    );
}

export default MyReview;