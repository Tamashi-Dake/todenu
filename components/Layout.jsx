import Head from "next/head";
import Header from "./Header";
import Footer from "./footer";
import { NextAuthProvider } from "./Provider";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ReduxProvider } from "../lib/redux/Provider";
// lấy children từ _app.jsx được bao trong Layout làm props
const Layout = ({ children, title = "Default title", session }) => {
  const { data: sessionData, status } = useSession({ session });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextAuthProvider>
        <Header />
        <div className="min-h-screen p-10">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
        <Footer />
      </NextAuthProvider>
    </>
  );
};

export default Layout;
