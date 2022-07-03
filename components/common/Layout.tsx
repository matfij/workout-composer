import { FunctionComponent, ReactNode } from "react";
import Navigation from "./Navigation";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Navigation></Navigation>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
