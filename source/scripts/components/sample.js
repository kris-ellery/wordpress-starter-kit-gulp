;(function($, window, document, undefined) {

  'use strict';

  /**
   * This is the description for my namespace object.
   *
   * @namespace MyNamespace
   * @author Ultron
   */

  var MyNamespace = {

    /**
     * Initialize namespace object
     * @function init
     * @memberof MyNamespace
     */

    init: function() {

      this._cache();
      this._events();

    }, // init()

    /**
     * Cache reusable data
     * @function _cache
     * @memberof MyNamespace
     */

    _cache: function() {

      this.$win = $(window);
      this.$html = $('html');

    }, // cache()

    /**
     * Attach event listeners
     * @function _events
     * @memberof MyNamespace
     */

    _events: function() {

      this.$html.on(
        'click.component.MyNamespace',
        '.js-trigger',
        this.myClickHandler.bind(this)
      );

      this.$win.on(
        'resize.component.MyNamespace',
        this.myResizeHandler.bind(this)
      );

    }, // bind()

    /**
     * Handle click event
     * @function myClickHandler
     * @memberof MyNamespace
     */

    myClickHandler: function() {

    }, // myClickHandler()

    /**
     * Handle `window` resize event
     * @function myResizeHandler
     * @memberof MyNamespace
     */

    myResizeHandler: function() {

    } // myResizeHandler()

  }; // MyNamespace

  MyNamespace.init();

})(jQuery, window, document);
