// import '../styles/globals.css'
import Layout from "../components/Layout"
import '../style/global.css';
function App({ Component, pageProps }) {
  const { title } = Component;
  return (
  <Layout title={title}>
    <Component {...pageProps} />
  </Layout>
  )
}

export default App