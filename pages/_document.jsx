import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Các thẻ <meta>, <link>, scripts, styles, ... */}

          <meta name="description" content="Next.js + Tailwind CSS" />
          <meta
            name="keywords"
            content="Next.js, Tailwind CSS, Code Menu, Todenu"
          />
          <meta name="author" content="Code Menu,Todenu, Tamashi Dake" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
