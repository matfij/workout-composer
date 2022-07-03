import { NextPage } from "next";
import { CSSProperties, Fragment } from "react";

const HomePage: NextPage = () => {
  const titleStyle: CSSProperties = { textAlign: 'center' };

  return (
    <Fragment>
      <h1 style={titleStyle}>Workout Composer</h1>
      
    </Fragment>
  );
};

export default HomePage;
