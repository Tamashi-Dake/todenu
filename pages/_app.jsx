// import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../style/global.css";
import { useEffect } from "react";
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
      </Layout>
    </SessionProvider>
  );
}

export default App;
