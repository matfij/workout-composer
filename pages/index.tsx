import { NextPage } from "next";
import Head from "next/head";
import { CSSProperties, Fragment } from "react";

const HomePage: NextPage = () => {
  const titleStyle: CSSProperties = { textAlign: "center" };

  return (
    <Fragment>
      <Head>
        <title>Workout Composer v2</title>
        <meta name="description" content="Build you dream workout routine." />
      </Head>
      <h1 style={titleStyle}>Workout Composer</h1>
    </Fragment>
  );
};

export default HomePage;
