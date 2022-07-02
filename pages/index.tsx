import { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";

const HomePage: NextPage = () => {
  return (
    <Fragment>
      {" "}
      <h1>Workout Composer</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/exercises">Exercises</Link>
        </li>
        <li>
          <Link href="/exercises/123">Exercise details</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default HomePage;
