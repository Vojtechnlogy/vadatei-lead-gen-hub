# This project is the Vadatei Website
# It was built with the help of Lovable, chat-gpt, gemini ai and using git hubs copilot feature

# The oragnization of the code is as followed
- assets has all the big jpgs used in the project
- components houses that main webpage of the website aswell as all the widgets that can be found on the website
- hooks houses the mobile integration
- Integration7supabase and the supabase files are all for potential integration to supabase useless code rn but can be usefull if we want to expand our data base storage
- Pages stores all the other pages on the website like the Terms of Use and Privacy Policy
- node_models houses all the liberies that are needed for this prject dont ask me how they work cause I got no idea
- 
## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


run script in terminal this generates or updates the site map
npm run generate-sitemap

!!!!!!!
Create good quality translations for the website ask Daniel for German Translation and ask Czech Person for Czech Translation

Try to figure out a way that we can add a phone number calling code - picker not priority

Future add a Partners section and a Reviews section

If Getting too few leads add Sign up to the main page.

Add a FAQ section

Create QR code and advertizing for the website

Examples section so that the clients have examples

Add and SEO page so that users who search stuff up have a good chance of finding somthing maybe a blog or case studies

AI SEO optimization

!!!!!!!!

Add this with the langauge toggle button

import { Link } from "react-router-dom";
import { localizedPath } from "@/lib/localize";

<Link to={localizedPath("privacyPolicy")}>Privacy Policy</Link>