# CanadaLifeTechTest

## Project set up

This repository is running the Eleventy (11ty) Static Site Generator (SSG) for speed, simplicity, and flexibility. It is configured using the Nunjucks templating language (Not Liquid as many use by default), and all front end JavaScript is written as ES6 Modules, in a progressively enhanced way.

As the calculator requires JavaScript to function, obvious and useful messages have been included as a fallback for any user with JavaScript disabled, or who have no control over how their network/ISP handles or mangles their data.

The default Frontmatter format in SSGs is often YAML-based, but this is too prone to error so this project uses JSON-based Frontmatter instead.

## Getting up and running

### Prerequisites

* PNPM
* Node

### Development

`pnpm i` followed by `pnpm run dev`. This will give you a webserver running locally on [localhost:8080](localhost:8080).

### Production

`pnpm run prod`

### Tests

`pnpm run test`

### Compress images

Any SVG images have already been compressed, but for most other images in JPG, PNG or WEBP formats, AVIF is a better choice. You can run `pnpm run compress-images` to have all `src` images compressed and output into the `public/img` assets folder.

## What's done

* **Eleventy**
    - Deploys onto Vercel from the `main` branch at [https://canada-life-tech-test.vercel.app/](https://canada-life-tech-test.vercel.app/)
    - I'd like to think the setup of 11ty is straight forward. I change a few things out of the box, like output dir, and where some of the input dirs I prefer to use are
    - Includes are used where it makes sense to break things down into more component-y things
    - There's a single macro for outputting SVG icons, which I've stolen from one of my other 11ty sites (I also use a similar component in Astro sites) so you can see how those would be useful too
    - The [order of things in the `<head>` is done for best performance](https://shffld.com/articles/2024/01/get-your-head-on-straight/) (some things are missing because this is a stripped down tech test)
* **Basic desktop, tablet, and mobile layout**
    - I've used some elements of the Canada Life live site to give it some familiarity
    - Used the Canada Life logo
    - Used the colour schemes scraped from the site (mostly the red, greys, and black)
    - Added a very basic header, footer, and hero block that is similar to the live site so the page looks more like a site than a tech test
    - I've avoided trying to style the range input for now, other than to remove margin and padding from around it
* **If you have JavaScript disabled**
    - You'll see a `<noscript>` alert telling you so, and nothing will function, but it will at least not look broken.
* **An ES6 class handles the calculator**
    - ChatGPT wrote the JSDoc comments
    - I did everything else
    - There's no TypeScript stuff in there
    - Yes, the range slider is using steps of £1000. I thought this was nice to show how the premium costs change. In real terms, I'd imagine steps more like £10,000 or £50,000 would make more sense for general use.
    - The class should only initialise if the correct DOM elements are there on page load. Granted, in this scenario that is a given, but I tend to always do this to avoid classes trying to init when on the wrong page, or when content is missing.
    - The classes uses default values for args, and lots of things are hard-wired in there that could (given more time) be made more flexible and either passed in or made a little less hard-wired.
* **Jest setup to test the class**
    - Tests are basic, but this isn't my area of expertise
    - ChatGPT 03-mini-high helped me through it
* **PostCSS is running through Gulp**
    - [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
    - [Media query sorting](https://www.npmjs.com/package/postcss-sort-media-queries)
    - [LightningCSS](https://www.npmjs.com/package/postcss-lightningcss)
    - [Partial stylesheet imports](https://www.npmjs.com/package/postcss-import)
    - Extra-functionality [calc()](https://www.npmjs.com/package/postcss-calc)
    - [system-ui](https://www.npmjs.com/package/postcss-font-family-system-ui) font stack
    - [Nested CSS](https://www.npmjs.com/package/postcss-nested) - I know this is now widely available natively, but because PostCSS offers so much other nice stuff, I'm currently sticking with it until the native version works itself out and everybody agrees on it.
    - [Preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)