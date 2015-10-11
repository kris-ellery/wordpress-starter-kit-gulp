# WordPress Theme

## Table of Contents

* Dependencies
* WordPress
* Meta Information
* Default Task
* Build Task
* Server Task
* Assets Task
    * Data
    * Fonts
    * Images
    * Media
    * Miscellaneous
    * Vendors
* Scripts Task
    * Style Guide
* Styles Task
    * Structure
    * Style Guide
* Views Task

---

## Dependencies

Run: `npm cache clear && npm i`

*Note: Before you can install Web Start Kit dependencies, you will need to install [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/), and [Mamp](https://www.mamp.info/en/) (or any other server for PHP).*

---

## WordPress

You have to install WordPress inside `./build` directory and create a local MySQL database.

---

## Meta Information

Open `./package.json` file and set your project details (`name`, `description`, `version`, `author`, etc.). This information will be used to set your theme directory and CSS/JS headers.

---

## Default Task

This task will run `build` and `server` tasks.

Run: `gulp`

---

## Build Task

This task will generate a fresh build of your project. It will run several individual tasks on files within `./source` and then output them to `./build/wp-content/themes/{custom-name}`.

Run: `gulp build`

---

## Server Task

This task will start a local Node server for development purposes. Mamp URL must match proxy in `./server.js`. By default it's set to `http://localhost:8888/`. Also, Mamp needs to point to `./build` directory (WordPress root).

Run: `gulp server`

---

## Assets Task

This task will run several individual sub-tasks to copy static files from `./source` to `./build/wp-content/themes/{custom-name}`.

Run: `gulp assets`

### Data

This task will copy data files to `./build/wp-content/themes/{custom-name}/data`.

Run: `gulp data`

### Fonts

This task will copy font files to `./build/wp-content/themes/{custom-name}/fonts`.

Run: `gulp fonts`

## Images

This task will optimize and copy images to `./build/wp-content/themes/{custom-name}/images`.

Run: `gulp images`

### Media

This task will copy media files to `./build/wp-content/themes/{custom-name}/media`.

Run: `gulp media`

### Miscellaneous

This task will copy miscellaneous WordPress files, such as `style.css` or `screenshot.png`, to the root of `./build/wp-content/themes/{custom-name}`.

Run: `gulp misc`

### Meta

This task will add meta information to default `style.css`. You can set meta information in `./package.json` file.

Run: `gulp meta`

### Vendors

This task will copy vendor files to `./build/wp-content/themes/{custom-name}/vendors`.

Run: `gulp vendors`

---

## Scripts Task

This task will perform a series of sub-tasks to generate final JavaScript files.

* Select root files only from `./source/scripts`
* Include files
* Check for style guide errors
* Check for errors
* Add meta information banner
* Save unminified file
* Minify and optimize
* Save minified file

*Note: Each file on the root of `./source/scripts` will be compiled to its own file in `./build/scripts`. Each file can have own includes, just like Sass with `@import` functionality. See `./source/scripts/main.js` as an example.*

Run: `gulp scripts`

## Style Guide

Your JavaScript should adhere to most reasonable, yet opinionated, style guide. If you choose to ignore it, you can override settings in `./_js-guide.json` and `./_js-lint.json`. To learn more about JavaScript style guide go to [https://github.com/airbnb/javascript/tree/master/es5](https://github.com/airbnb/javascript/tree/master/es5).

---

## Styles Task

This task will perform a series of sub-tasks to generate final CSS files.

* Select all files from `./source/styles`
* Check for style guide errors
* Select root files only from `./source/styles`
* Compile Sass to CSS
* Add vendor prefixes
* Order CSS declarations
* Add meta data banner
* Save unminified file
* Combine media queries
* Minify and optimize
* Saved minified file

*Note: Each file on the root of `./source/styles` will be compiled to its own file in `./build/styles`.*

Run: `gulp styles`

### Structure

This project follows a strict naming convention using [BEM](https://en.bem.info/) methodology.

Directory structure and selector names are divided into namespaces based on [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) article by Harry Roberts.

### Style Guide

Your Sass should adhere to most reasonable, yet opinionated, style guide. If you choose to ignore it, you can override settings in `./_sass-lint.yml`.

---

## Views Task

This task will copy PHP files.

* Copy PHP files from `./source/views` to `./build/wp-content/themes/{custom-name}`

Run: `gulp views`
