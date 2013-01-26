define(function(require) {
  var handlers = {
    next: function() {},
    prev: function() {},
    first: function() {},
    last: function() {},
  };

  var $ = require("zepto");

  $(function () {
    document.addEventListener('keydown', function(e) {
      // Shortcut for alt, ctrl and meta keys
      if (e.altKey || e.ctrlKey || e.metaKey) { return; }
      
      switch (e.which) {
      case 116: // F5
        break;
      case 13: // Enter
        break;
      case 27: // Esc
        break;
      case 33: // PgUp
      case 38: // Up
      case 37: // Left
      case 72: // H
      case 75: // K
        e.preventDefault();
        handlers.prev();
        break;
      case 34: // PgDown
      case 40: // Down
      case 39: // Right
      case 76: // L
      case 74: // J
        e.preventDefault();
        handlers.next();
        break;
      case 36: // Home
        e.preventDefault();
        handlers.first();
        break;
      case 35: // End
        e.preventDefault();
        handlers.last();
        break;
      case 9: // Tab = +1; Shift + Tab = -1
      case 32: // Space = +1; Shift + Space = -1
        e.preventDefault();
        handlers[e.shiftKey ? 'prev' : 'next']();
        break;
      default:
        // Behave as usual
      }
    }, false);
  });

  return handlers;
});