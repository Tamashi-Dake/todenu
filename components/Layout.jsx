import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";


// lấy children từ _app.jsx được bao trong Layout làm props
const Layout = ({ children, title = "Default title" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
