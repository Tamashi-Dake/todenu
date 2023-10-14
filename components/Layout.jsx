import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { NextAuthProvider } from "./Provider";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
// lấy children từ _app.jsx được bao trong Layout làm props
const Layout = ({ children, title = "Default title", session }) => {
  const { data: sessionData, status } = useSession({ session });

  // don't know why this is not working
  // useEffect(() => {
  //   const checkSessionExpiration = () => {
  //     if (sessionData && sessionData.expires) {
  //       const currentTime = Math.floor(Date.now() / 1000);
  //       if (sessionData.expires <= currentTime) {
  //         // Session hết hạn, hiển thị cảnh báo và làm mới trang
  //         alert("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
  //         window.location.reload();
  //       }
  //     }
  //   };

  //   const interval = setInterval(checkSessionExpiration, 1000); // Kiểm tra mỗi giây

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [sessionData]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextAuthProvider>
        <Navbar />
        <>{children}</>
        <Footer />
      </NextAuthProvider>
    </>
  );
};

export default Layout;
