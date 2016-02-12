# WordPress Theme Starter Kit with Gulp

WordPress Theme Starter Kit is an opinionated build automation for front-end web development based on [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/), [Bower](http://bower.io/), [Babel](https://babeljs.io/), and [Sass](http://sass-lang.com/).

*Note: WordPress Theme Starter Kit is simply a guideline and it doesn't solve everything. It is up to you to modify whatever necessary to achieve your project goals.*

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
    * Meta
    * Vendors
* Scripts Task
* Styles Task
    * Structure
* Views Task

---

## Dependencies

Run: `npm cache clear && npm i && bower cache clean && bower install`

*Note: Before you can install WordPress Theme Starter Kit dependencies, you will need to install [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/), and [Bower](http://bower.io/).*

---

## WordPress

You have to install WordPress inside `./build` directory and create a local MySQL database.

---

## Meta Information

Open `./package.json` file and set your project details (`name`, `description`, `version`, `author`, etc.). This information will be used to set your theme directory and CSS/JS headers.

---

## Default Task

Run `build` and `server` tasks.

Run: `gulp`

---

## Build Task

Generate a fresh build of your project. Task will run several individual tasks on files within `./src` and then output them to `./build/wp-content/themes/{custom-name}/`.

Run: `gulp build`

---

## Server Task

Start a local dev server. Mamp URL must match proxy in `./gulpfile.babel.js`. By default it's set to `http://localhost:8888/`. Also, Mamp needs to point to `./build` directory (WordPress root). For more information about BrowserSync go to [http://www.browsersync.io/](http://www.browsersync.io/).

Run: `gulp server`

---

## Assets Task

Run several individual tasks to copy static files from `./src` to `./build/wp-content/themes/{custom-name}/`.

Run: `gulp assets`

### Data

Copy data files to `./build/wp-content/themes/{custom-name}/data`.

Run: `gulp data`

### Fonts

Copy font files to `./build/wp-content/themes/{custom-name}/fonts`.

Run: `gulp fonts`

## Images

Copy images to `./build/wp-content/themes/{custom-name}/images`. As a personal preference WordPress Theme Starter Kit doesn't use automated image optimization. It is strongly recommended to use services like [TinyPNG](https://tinypng.com/) and [TinyJPG](https://tinyjpg.com/) to optimize images manually.

Run: `gulp images`

### Media

Copy media files to `./build/wp-content/themes/{custom-name}/media`.

Run: `gulp media`

### Miscellaneous

Copy miscellaneous WordPress files, such as `style.css` or `screenshot.png`, to the root of `./build/wp-content/themes/{custom-name}`.

Run: `gulp misc`

### Meta

Add meta information to default `style.css`. You can set meta information in `./package.json` file.

Run: `gulp meta`

### Vendors

Bundle vendor files to `./build/wp-content/themes/{custom-name}/vendors`. You can install new client-side vendors using Bower, then reference appropriate files in `./src/vendors/bundle.js` and `./src/vendors/bundle.min.js`. WordPress Theme Starter Kit comes with jQuery example.

Run: `gulp vendors`

---

## Scripts Task

Run a series of sub-tasks to generate final JavaScript files. See `./gulpfile.babel.js` for reference.

*Note: Each file on the root of `./src/scripts` will be compiled to its own file in `./build/wp-content/themes/{custom-name}/scripts`. Each file can have own includes, just like Sass with `@import` functionality. See `./src/scripts/main.js` as an example.*

Run: `gulp scripts`

---

## Styles Task

Run a series of sub-tasks to generate final CSS files. See `./gulpfile.babel.js` for reference.

*Note: Each file on the root of `./src/styles` will be compiled to its own file in `./build/wp-content/themes/{custom-name}/styles`.*

Run: `gulp styles`

### BEM Structure

WordPress Theme Starter Kit follows a strict naming convention using [BEM](https://en.bem.info/) methodology.

Directory structure and selector names are divided into namespaces based on [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) article by Harry Roberts.

---

## Views Task

Copy PHP files to `./build/wp-content/themes/{custom-name}`

Run: `gulp views`
