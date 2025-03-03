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