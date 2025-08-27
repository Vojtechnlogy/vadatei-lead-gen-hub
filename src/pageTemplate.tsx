import React from "react";
import type { PageMetaData } from "./pageMetaMap";

const PageTemplate: React.FC<PageMetaData> = ({ title, description, canonical, lang }) => (
  <html lang={lang}>
    <head>
      {/* Google tag (gtag.js) - load once and configure both IDs */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NLZ99GFK4S"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NLZ99GFK4S');
            gtag('config', 'AW-17502148935');
          `,
        }}
      />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Vadatei" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0f172a" />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://vadatei.com/your-og-image.png" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vadatei" />
      <meta name="twitter:image" content="https://vadatei.com/your-og-image.png" />

      {/* Canonical + Hreflang */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" href="https://vadatei.com/en/" hrefLang="en" />
      <link rel="alternate" href="https://vadatei.com/cz/" hrefLang="cs" />
      <link rel="alternate" href="https://vadatei.com/de/" hrefLang="de" />
      <link rel="alternate" href="https://vadatei.com/" hrefLang="x-default" />

      {/* Favicons / Touch icons / Manifest */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </head>
    <body>
      <div id="root"></div>
      {/* Vite will inject scripts here */}
    </body>
  </html>
);

export default PageTemplate;