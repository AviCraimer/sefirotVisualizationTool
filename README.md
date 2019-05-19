# How to Build
Uses Gulp 4.x for build system. If you have Gulp 3.X installed, you'll need to run from the node module with the command

=> **node_modules/gulp/bin/gulp.js**

**Do not store anything important in DIST folder**

The default gulp task builds the project without minimizing JS and CSS, and using the react development build. This makes it faster turn around time, and easier debugging (i.e., source maps actually work and React dev tools are available).

For production or QA, run the **prod** task.

If you add or change image files, run the **images** task.

