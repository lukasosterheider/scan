import { initializeStore, RootState } from "@store/index";
import { GetServerSidePropsResult } from "next";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { Default } from "../layouts/Default";
import "../styles/globals.css";

export interface ScanAppProps {
  initialReduxState: RootState;
}

export default function ScanApp({ Component, pageProps }): JSX.Element {
  return (
    <Default {...pageProps}>
      <NextNProgress color='#64a8e7' height={4} options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </Default>
  );
}

export function getServerSideProps(): GetServerSidePropsResult<ScanAppProps> {
  const store = initializeStore();
  return {
    props: {
      initialReduxState: store.getState(),
    },
  };
}
