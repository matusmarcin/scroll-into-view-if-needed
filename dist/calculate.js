var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var handleScroll = function (parent, _a) {
    var scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
    parent.scrollLeft = scrollLeft;
    parent.scrollTop = scrollTop;
};
export default function calculate(target, options) {
    if (!target || !(target instanceof HTMLElement))
        throw new Error('Element is required in scrollIntoViewIfNeeded');
    var config = __assign({ handleScroll: handleScroll }, options);
    var defaultOffset = { top: 0, right: 0, bottom: 0, left: 0 };
    config.offset = config.offset
        ? __assign({}, defaultOffset, config.offset) : defaultOffset;
    function withinBounds(value, min, max, extent) {
        if (config.centerIfNeeded === false ||
            (max <= value + extent && value <= min + extent)) {
            return Math.min(max, Math.max(min, value));
        }
        else {
            return (min + max) / 2;
        }
    }
    var offset = config.offset;
    var offsetTop = offset.top;
    var offsetLeft = offset.left;
    var offsetBottom = offset.bottom;
    var offsetRight = offset.right;
    function makeArea(left, top, width, height) {
        return {
            left: left + offsetLeft,
            top: top + offsetTop,
            width: width,
            height: height,
            right: left + offsetLeft + width + offsetRight,
            bottom: top + offsetTop + height + offsetBottom,
            translate: function (x, y) {
                return makeArea(x + left + offsetLeft, y + top + offsetTop, width, height);
            },
            relativeFromTo: function (lhs, rhs) {
                var newLeft = left + offsetLeft, newTop = top + offsetTop;
                lhs = lhs.offsetParent;
                rhs = rhs.offsetParent;
                if (lhs === rhs) {
                    return area;
                }
                for (; lhs; lhs = lhs.offsetParent) {
                    newLeft += lhs.offsetLeft + lhs.clientLeft;
                    newTop += lhs.offsetTop + lhs.clientTop;
                }
                for (; rhs; rhs = rhs.offsetParent) {
                    newLeft -= rhs.offsetLeft + rhs.clientLeft;
                    newTop -= rhs.offsetTop + rhs.clientTop;
                }
                return makeArea(newLeft, newTop, width, height);
            },
        };
    }
    var parent, area = makeArea(target.offsetLeft, target.offsetTop, target.offsetWidth, target.offsetHeight);
    while ((parent = target.parentNode) instanceof HTMLElement &&
        target !== config.boundary) {
        var clientLeft = parent.offsetLeft + parent.clientLeft;
        var clientTop = parent.offsetTop + parent.clientTop;
        // Make area relative to parent's client area.
        area = area
            .relativeFromTo(target, parent)
            .translate(-clientLeft, -clientTop);
        var scrollLeft = withinBounds(parent.scrollLeft, area.right - parent.clientWidth, area.left, parent.clientWidth);
        var scrollTop = withinBounds(parent.scrollTop, area.bottom - parent.clientHeight, area.top, parent.clientHeight);
        // Pass the new coordinates to the handleScroll callback
        config.handleScroll(parent, { scrollLeft: scrollLeft, scrollTop: scrollTop }, config);
        // Determine actual scroll amount by reading back scroll properties.
        area = area.translate(clientLeft - parent.scrollLeft, clientTop - parent.scrollTop);
        target = parent;
    }
    setTimeout(function () {
        if (config.onDone) {
            config.onDone();
        }
    }, config.duration || 0);
}
