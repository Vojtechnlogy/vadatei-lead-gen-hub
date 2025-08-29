import React from "react";
import type { PageMetaData } from "./pageMetaMap";

const PageTemplate: React.FC<PageMetaData> = ({ title, description, canonical, lang, image }) => (
  <html lang={lang}>
    <head>
      {/* Cookiebot Consent Management */}
      <script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="c73a80bb-4f3f-436a-bc67-9688e2dfa18c"
        data-blockingmode="auto"
        type="text/javascript"
      />
      {/* Google Consent Mode */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
          `,
        }}
      />
      {/* Google tag (gtag.js) - load once and configure both IDs */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NLZ99GFK4S"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
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

      {/* Google Fonts (single import with latin-ext for Czech support) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Lato:wght@300;400;700&family=Lora:wght@400;700&display=swap&subset=latin-ext"
        rel="stylesheet"
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://vadatei.com/assets/digital-transformation.jpg" />
      <meta property="og:see_also" content="https://www.linkedin.com/company/vadatei/" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vadatei" />
      <meta name="twitter:image" content="https://vadatei.com/assets/digital-transformation.jpg" />

      {/* Canonical + Hreflang */}
    <link rel="canonical" href="https://vadatei.com/en/" />
    <link rel="alternate" href="https://vadatei.com/en/" hrefLang="en" />
    <link rel="alternate" href="https://vadatei.com/cz/" hrefLang="cs" />
    <link rel="alternate" href="https://vadatei.com/de/" hrefLang="de" />
    <link rel="alternate" href="https://vadatei.com/" hrefLang="x-default" />
    
      {/* Favicons / Touch icons / Manifest */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon_48x48.png" /> {/* Added 48x48 favicon */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="apple-mobile-web-app-title" content="Vadatei" />
      <meta name="application-name" content="Vadatei" />

      {/* seznam meta tags */}
      <meta name="seznam-wmt" content="aOzH3Q2gu3YWjgXBtgyqcYhYK1RxfboC" />
    </head>
    <body>
      <div id="root"></div>
      {/* Vite will inject scripts here */}
    </body>
  </html>
);

export default PageTemplate;