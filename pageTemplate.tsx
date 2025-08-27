import React from "react";
import type { PageMetaData } from "./pageMetaMap";

const PageTemplate: React.FC<PageMetaData> = ({ title, description }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Add other meta tags, favicons, etc. here */}
    </head>
    <body>
      <div id="root"></div>
      {/* Vite will inject scripts here */}
    </body>
  </html>
);

export default PageTemplate;