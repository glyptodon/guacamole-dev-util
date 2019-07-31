/*
 * Copyright (C) 2019 Glyptodon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* global Guacamole, _ */
(function defineGuacamoleDebugUtils() {

    /**
     * Returns the X11 keysym which types the Unicode character with the given
     * codepoint.
     *
     * @private
     * @param {Number} codepoint
     *     The Unicode codepoint to retrieve the X11 keysym for.
     *
     * @returns {Number}
     *     The keysym which types the given Unicode codepoint, or null if there
     *     is no such keysym.
     */
    var getKeysym = function getKeysym(codepoint) {

        // Keysyms for control characters
        if (codepoint <= 0x1F || (codepoint >= 0x7F && codepoint <= 0x9F))
            return 0xFF00 | codepoint;

        // Keysyms for ASCII chars
        if (codepoint >= 0x0000 && codepoint <= 0x00FF)
            return codepoint;

        // Keysyms for Unicode
        if (codepoint >= 0x0100 && codepoint <= 0x10FFFF)
            return 0x01000000 | codepoint;

        return null;

    };

    /**
     * Sends the given text value along the given output stream.
     *
     * @private
     * @param {Guacamole.OutputStream} stream
     *     The output stream receiving the text.
     *
     * @param {String} value
     *     The text to send.
     */
    var sendText = function sendText(stream, value) {
        var writer = new Guacamole.StringWriter(stream);
        writer.sendText(value);
        writer.sendEnd();
    };

    /**
     * Utility object with various functions and constants useful for Guacamole
     * development, testing, and debugging.
     */
    window.G = {

        /**
         * The X11 keysym of the AltGr key.
         *
         * @type {Number}
         */
        'ALTGR' : 0xFE03,

        /**
         * The X11 keysym of the Backspace key.
         *
         * @type {Number}
         */
        'BACKSPACE' : 0xFF08,

        /**
         * The X11 keysym of the Caps Lock key.
         *
         * @type {Number}
         */
        'CAPS_LOCK' : 0xFFE5,

        /**
         * The X11 keysym of the Context Menu key.
         *
         * @type {Number}
         */
        'CONTEXT_MENU' : 0xFF67,

        /**
         * The X11 keysym of the Delete key.
         *
         * @type {Number}
         */
        'DELETE' : 0xFFFF,

        /**
         * The X11 keysym of the down arrow key.
         *
         * @type {Number}
         */
        'DOWN' : 0xFF54,

        /**
         * The X11 keysym of the End key.
         *
         * @type {Number}
         */
        'END' : 0xFF57,

        /**
         * The X11 keysym of the Enter/Return key.
         *
         * @type {Number}
         */
        'ENTER' : 0xFF0D,

        /**
         * The X11 keysym of the Escape key.
         *
         * @type {Number}
         */
        'ESCAPE' : 0xFF1B,

        /**
         * The X11 keysym of the F1 key.
         *
         * @type {Number}
         */
        'F1' : 0xFFBE,

        /**
         * The X11 keysym of the F2 key.
         *
         * @type {Number}
         */
        'F2' : 0xFFBF,

        /**
         * The X11 keysym of the F3 key.
         *
         * @type {Number}
         */
        'F3' : 0xFFC0,

        /**
         * The X11 keysym of the F4 key.
         *
         * @type {Number}
         */
        'F4' : 0xFFC1,

        /**
         * The X11 keysym of the F5 key.
         *
         * @type {Number}
         */
        'F5' : 0xFFC2,

        /**
         * The X11 keysym of the F6 key.
         *
         * @type {Number}
         */
        'F6' : 0xFFC3,

        /**
         * The X11 keysym of the F7 key.
         *
         * @type {Number}
         */
        'F7' : 0xFFC4,

        /**
         * The X11 keysym of the F8 key.
         *
         * @type {Number}
         */
        'F8' : 0xFFC5,

        /**
         * The X11 keysym of the F9 key.
         *
         * @type {Number}
         */
        'F9' : 0xFFC6,

        /**
         * The X11 keysym of the F10 key.
         *
         * @type {Number}
         */
        'F10' : 0xFFC7,

        /**
         * The X11 keysym of the F11 key.
         *
         * @type {Number}
         */
        'F11' : 0xFFC8,

        /**
         * The X11 keysym of the F12 key.
         *
         * @type {Number}
         */
        'F12' : 0xFFC9,

        /**
         * The X11 keysym of the F13 key.
         *
         * @type {Number}
         */
        'F13' : 0xFFCA,

        /**
         * The X11 keysym of the F14 key.
         *
         * @type {Number}
         */
        'F14' : 0xFFCB,

        /**
         * The X11 keysym of the F15 key.
         *
         * @type {Number}
         */
        'F15' : 0xFFCC,

        /**
         * The X11 keysym of the F16 key.
         *
         * @type {Number}
         */
        'F16' : 0xFFCD,

        /**
         * The X11 keysym of the F17 key.
         *
         * @type {Number}
         */
        'F17' : 0xFFCE,

        /**
         * The X11 keysym of the F18 key.
         *
         * @type {Number}
         */
        'F18' : 0xFFCF,

        /**
         * The X11 keysym of the F19 key.
         *
         * @type {Number}
         */
        'F19' : 0xFFD0,

        /**
         * The X11 keysym of the F20 key.
         *
         * @type {Number}
         */
        'F20' : 0xFFD1,

        /**
         * The X11 keysym of the F21 key.
         *
         * @type {Number}
         */
        'F21' : 0xFFD2,

        /**
         * The X11 keysym of the F22 key.
         *
         * @type {Number}
         */
        'F22' : 0xFFD3,

        /**
         * The X11 keysym of the F23 key.
         *
         * @type {Number}
         */
        'F23' : 0xFFD4,

        /**
         * The X11 keysym of the F24 key.
         *
         * @type {Number}
         */
        'F24' : 0xFFD5,

        /**
         * The X11 keysym of the Insert key.
         *
         * @type {Number}
         */
        'INSERT' : 0xFF63,

        /**
         * The X11 keysym of the left Alt key.
         *
         * @type {Number}
         */
        'L_ALT' : 0xFFE9,

        /**
         * The X11 keysym of the left Ctrl key.
         *
         * @type {Number}
         */
        'L_CTRL' : 0xFFE3,

        /**
         * The X11 keysym of the left arrow key.
         *
         * @type {Number}
         */
        'LEFT' : 0xFF51,

        /**
         * The X11 keysym of the left Meta key.
         *
         * @type {Number}
         */
        'L_META' : 0xFFE7,

        /**
         * The X11 keysym of the left Shift key.
         *
         * @type {Number}
         */
        'L_SHIFT' : 0xFFE1,

        /**
         * The X11 keysym of the left Super key.
         *
         * @type {Number}
         */
        'L_SUPER' : 0xFFEB,

        /**
         * The X11 keysym of the Num Lock key.
         *
         * @type {Number}
         */
        'NUM_LOCK' : 0xFF7F,

        /**
         * The X11 keysym of the Page Down key.
         *
         * @type {Number}
         */
        'PAGE_DOWN' : 0xFF56,

        /**
         * The X11 keysym of the Page Up key.
         *
         * @type {Number}
         */
        'PAGE_UP' : 0xFF55,

        /**
         * The X11 keysym of the Print Screen key.
         *
         * @type {Number}
         */
        'PRINT_SCREEN' : 0xFF61,

        /**
         * The X11 keysym of the right Alt key.
         *
         * @type {Number}
         */
        'R_ALT' : 0xFE03,

        /**
         * The X11 keysym of the right Ctrl key.
         *
         * @type {Number}
         */
        'R_CTRL' : 0xFFE4,

        /**
         * The X11 keysym of the right arrow key.
         *
         * @type {Number}
         */
        'RIGHT' : 0xFF53,

        /**
         * The X11 keysym of the right Meta key.
         *
         * @type {Number}
         */
        'R_META' : 0xFFE8,

        /**
         * The X11 keysym of the right Shift key.
         *
         * @type {Number}
         */
        'R_SHIFT' : 0xFFE2,

        /**
         * The X11 keysym of the right Super key.
         *
         * @type {Number}
         */
        'R_SUPER' : 0xFFEC,

        /**
         * The X11 keysym of the Scroll Lock key.
         *
         * @type {Number}
         */
        'SCROLL_LOCK' : 0xFF14,

        /**
         * The X11 keysym of the Tab key.
         *
         * @type {Number}
         */
        'TAB' : 0xFF09,

        /**
         * The X11 keysym of the up arrow key.
         *
         * @type {Number}
         */
        'UP' : 0xFF52,

        /**
         * The X11 keysym of the Windows key.
         *
         * @type {Number}
         */
        'WIN' : 0xFFEB,

        /**
         * Toggles visibility of the Guacamole menu. This function only has an
         * effect while within the client (while using a connection).
         */
        'toggleMenu' : function toggleMenu() {
            var scope = $('#content').scope();
            if (scope) {
                scope.menu.shown = !scope.menu.shown;
                scope.$apply();
            }
        },

        /**
         * Sends the given sequence of keys. Arguments passed to this function
         * are processed in order, with numbers being interpreted as raw X11
         * keysyms to be held down for the duration of the call (press event
         * only), arrays as sets of parameters to be passed to a nested call of
         * sendKeys(), and all other types coerced to strings and processed as
         * text to be typed (each character resulting in both a press and
         * release event). Raw X11 keysyms are finally released in reverse
         * order once all arguments have been processed.
         *
         * @example
         * // Send Ctrl+Alt+Del
         * G.sendKeys(G.L_CTRL, G.L_ALT, G.DELETE);
         *
         * @example
         * // Press Ctrl, Send Shift+T (while holding Ctrl), and finally send F
         * // (still holding Ctrl), releasing Ctrl when complete
         * G.sendKeys(G.L_CTRL, [G.L_SHIFT, 'T'], 'f');
         *
         * @param {...*} [values]
         *     The keysyms, text, or sequences of key events to be sent, in
         *     order.
         */
        'sendKeys' : function sendKeys(values) {

            var i;
            var scope = $('#content').scope();

            // Send all values provided in sequence
            for (i = 0; i < arguments.length; i++) {

                // Hold down received raw keysyms (to be released later) 
                var value = arguments[i];
                if (_.isNumber(value))
                    scope.$broadcast('guacSyntheticKeydown', value);

                // Chain any received arrays via nested calls to sendKeys()
                else if (_.isArray(value))
                    G.sendKeys.apply(this, value);

                // Send everything else as strings as if typed by the user (via
                // keydown and keyup)
                else {
                    var str = '' + value;
                    for (var j = 0; j < str.length; j++) {
                        var keysym = getKeysym(str.codePointAt(j));
                        scope.$broadcast('guacSyntheticKeydown', keysym);
                        scope.$broadcast('guacSyntheticKeyup', keysym);
                    }
                }

            } // end for each argument

            // Release all keys pressed as raw keysyms, reverse order
            for (i = arguments.length - 1; i >= 0; i--) {
                var value = arguments[i];
                if (_.isNumber(value))
                    scope.$broadcast('guacSyntheticKeyup', value);
            }

        }, // end sendKeys()

        /**
         * Sends the given connection parameter value to the current,
         * active remote desktop connection using an argument value stream with
         * he given name. The argument value stream is opened with the
         * "text/plain" mimetype.
         *
         * @param {String} name
         *     The name of the connection parameter to send
         *
         * @param {String} value
         *     The value of the connection parameter.
         */
        'sendArgv' : function sendArgv(name, value) {

            // Pull ManagedClient from scope, if present
            var managedClient = $('#content').scope().client;
            if (!managedClient)
                return;

            // Send name/value pair as argument value stream
            var client = managedClient.client;
            var stream = client.createArgumentValueStream('text/plain', name);
            sendText(stream, value);

        },

        /**
         * Sends the given text data through the current, active remote desktop
         * connection using a pipe stream with the given name. The pipe stream
         * is opened with the "text/plain" mimetype.
         *
         * @param {String} name
         *     The name of the pipe stream to open.
         *
         * @param {String} value
         *     The text data to send along the pipe stream.
         */
        'sendPipe' : function sendPipe(name, value) {

            // Pull ManagedClient from scope, if present
            var managedClient = $('#content').scope().client;
            if (!managedClient)
                return;

            // Send name/value pair as pipe stream
            var client = managedClient.client;
            var stream = client.createPipeStream('text/plain', name);
            sendText(stream, value);

        },

        /**
         * Presses Ctrl+Alt+Shift within the active remote desktop connection.
         */
        'CAS' : function CAS() {
            G.sendKeys(G.L_CTRL, G.L_ALT, G.L_SHIFT);
        }

    }; // end window.G utility object

})();
