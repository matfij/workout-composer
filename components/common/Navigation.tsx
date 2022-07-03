import Link from "next/link";
import { FunctionComponent } from "react";

const Navigation: FunctionComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/exercises">Exercises</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
