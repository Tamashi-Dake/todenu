// import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../style/global.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
function App({ Component, pageProps, session }) {
  const { title } = Component;
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);
  return (
    <SessionProvider session={session}>
      <Layout title={title} session={session}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Layout>
    </SessionProvider>
  );
}

export default App;
