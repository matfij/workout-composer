import localStyle from "./Navigation.module.css"
import Link from "next/link";
import { FunctionComponent } from "react";

const Navigation: FunctionComponent = () => {
  return (
    <nav className={localStyle.navWrapper}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/exercises">Exercises</Link>
        </li>
        <li>
          <Link href="/exercises/add">Add exercise</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
