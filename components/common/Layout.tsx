import localStyle from "./Layout.module.css";
import { FunctionComponent, ReactNode } from "react";
import Navigation from "./Navigation";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Workout Composer</title>
      </Head>
      <Navigation></Navigation>
      <main className={localStyle.mainWrapper}>{props.children}</main>
    </>
  );
};

export default Layout;
