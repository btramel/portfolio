import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* preconnect scripts... */}
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto+Mono&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
