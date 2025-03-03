import gulp from "gulp";

import colours from "ansi-colors";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import size from "gulp-size";
import calc from "postcss-calc";
import lightningCss from "postcss-lightningcss";
import nested from "postcss-nested";
import partialImports from "postcss-import";
import presetEnv from "postcss-preset-env";
import sortMediaQueries from "postcss-sort-media-queries";
import systemUiFont from "postcss-font-family-system-ui";
import reporter from "postcss-reporter";

function watchCss(done) {
    const cssFiles = "src/site/css/**/*.css";
    const watcher = gulp.watch(cssFiles);

    watcher.on("change", function (path, stats) {
        console.log(`Watcher fired for: ${path}`);

        postCss(done);
    });

    done();
}

function postCss(done) {
    const entries = [
        {
            inputFile: "src/site/css/index.css",
            outputFile: "site.css"
        }
    ];

    const outputDest = "dist/css";

    entries.forEach(entry => {
        const pipeTitle = `${colours.magenta("[CSS]")} ${colours.green("[" + entry.outputFile + "]")}`;

        return gulp
            .src(entry.inputFile, { sourcemaps: true })
            .pipe(
                postcss([
                    partialImports,
                    calc,
                    presetEnv({
                        features: {
                            "cascade-layers": false
                        }
                    }),
                    nested,
                    systemUiFont,
                    sortMediaQueries({
                        sort: "mobile-first",
                    }),
                    lightningCss,
                    reporter({
                        clearReportedMessages: true,
                        clearAllMessages: true,
                        throwError: false,
                        positionless: "last",
                    }),
                ]),
            )
            .pipe(rename(entry.outputFile))
            .pipe(
                size({
                    title: pipeTitle,
                    showFiles: true,
                    showTotal: false,
                }),
            )
            .pipe(
                gulp.dest(outputDest, { sourcemaps: "." })
            )
        ;
    });

    done();
}

gulp.task("default", postCss);
gulp.task("dev", gulp.series(postCss, watchCss));