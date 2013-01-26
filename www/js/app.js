
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Install the layouts
    require('layouts/layouts');

    // Install key handlers
    keyhandlers = require('keyhandlers');

    // Write your app here.
    var onAnimationEnd = require('layouts/anim').onAnimationEnd;

    function getSibling(node, offset) {
        var parent = $(node).parents('x-view');
        var views = parent.find('x-view');
        var i = views.get().indexOf(node.get(0));

        return [i + offset, views.get(i + offset)];
    }

    function prev() {
        var view = $(this).parents('x-view').first();
        var sib = getSibling(view.find('x-view.open'), -1);
        var offset = sib[0];
        var node = $(sib[1]);

        if(node.length) {
            $('header .next').removeClass('hidden');
            view.find('x-view').removeClass('open');
            node.addClass('open');
            node.get(0).openAlone(null, 'slideRight');

            if(offset == 0) {
                $('header .prev').addClass('hidden');
            }
        }
    }

    function next() {
        var view = $(this).parents('x-view').first();
        var sib = getSibling(view.find('x-view.open'), 1);
        var offset = sib[0];
        var node = $(sib[1]);

        if(node.length) {
            $('header .prev').removeClass('hidden');
            view.find('x-view').removeClass('open');
            node.addClass('open');
            node.get(0).openAlone(null, 'slideLeft');

            if(offset == view.find('x-view').length - 1) {
                $('header .next').addClass('hidden');
            }
        }
    }

    $('button.prev').click(prev);
    $('button.next').click(next);

    keyhandlers.next = function() { next.call($('x-view.open')); };
    keyhandlers.prev = function() { prev.call($('x-view.open')); }

    onAnimationEnd($('x-view.animations .box'), function() {
        $(this).css({ 'animation-name': 'none' });
    });
});
