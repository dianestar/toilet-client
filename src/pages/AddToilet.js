import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import AskReview from "../components/modal/AskReview";

const AddToilet = () => {
    const [open, setOpen] = useState(true);

    return (
        <>
        <Layout>
            <Header text="화장실 추가" />
            <AskReview open={open} setOpen={setOpen}/>
        </Layout>
        </>
    );
}

export default AddToilet;