import htmlminifier from 'html-minifier';

export default async function(eleventyConfig) {
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

    eleventyConfig.addPassthroughCopy({ 'public/fonts': 'fonts' });
    eleventyConfig.addPassthroughCopy({ 'public/img': 'img' });
    eleventyConfig.addPassthroughCopy({ 'public/js': 'js' });
    eleventyConfig.addPassthroughCopy({ 'public/css': 'css' });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'site/includes',
            layouts: 'site/layouts',
            data: 'site/data'
        },
        passthroughFileCopy: true,
        htmlTemplateEngine: 'njk',
        templateFormats: ['njk'],
    };
}