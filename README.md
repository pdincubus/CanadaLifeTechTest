# CanadaLifeTechTest

## Project set up

This repository is running the Eleventy (11ty) Static Site Generator (SSG) for speed, simplicity, and flexibility. It is configured using the Nunjucks templating language (Not Liquid as many use by default), and all front end JavaScript is written as ES6 Modules, in a progressively enhanced way.

As the calculator requires JavaScript to function, obvious and useful messages have been included as a fallback for any user with JavaScript disabled, or who have no control over how their network/ISP handles or mangles their data.

The default Frontmatter format in SSGs is often YAML-based, but this is too prone to error so this project uses JSON-based Frontmatter instead.

## What's done

* Eleventy
    - Deploys onto Vercel from the `main` branch at [https://canada-life-tech-test.vercel.app/](https://canada-life-tech-test.vercel.app/)
* Basic desktop, tablet, and mobile layout
    - I've used some elements of the Canada Life live site to give it some familiarity
    - Used the Canada Life logo
    - Used the colour schemes scraped from the site (mostly the red, greys, and black)
    - Added a very basic header, footer, and hero block that is similar to the live site so the page looks more like a site than a tech test
* If you have JavaScript disabled, you'll see a `<noscript>` alert telling you so, and nothing will function, but it will at least not look broken.
* Basic calculations are done using an ES6 class
* Jest setup to test the class
    - Tests are basic, but this isn't my area of expertise
    - ChatGPT 03-mini-high helped me through it
* PostCSS is running through Gulp which allows:
    - [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
    - [Media query sorting](https://www.npmjs.com/package/postcss-sort-media-queries)
    - [LightningCSS](https://www.npmjs.com/package/postcss-lightningcss)
    - [Partial stylesheet imports](https://www.npmjs.com/package/postcss-import)
    - Extra-functionality [calc()](https://www.npmjs.com/package/postcss-calc)
    - [system-ui](https://www.npmjs.com/package/postcss-font-family-system-ui) font stack
    - [Nested CSS](https://www.npmjs.com/package/postcss-nested) - I know this is now widely available natively, but because PostCSS offers so much other nice stuff, I'm currently sticking with it until the native version works itself out and everybody agrees on it.
    - [Preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)

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

## Demo site

You can find a deployment of the `main` branch on [https://canada-life-tech-test.vercel.app/](https://canada-life-tech-test.vercel.app/)