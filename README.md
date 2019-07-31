guacamole-dev-util
==================

**guacamole-dev-util** is an extension for [Apache
Guacamole](http://guacamole.apache.org) which provides functions and constants
useful for developing, testing, and debugging Guacamole. These functions and
constants are exposed on a global object called `G`.

Functions
---------

### `G.CAS()`

Presses Ctrl+Alt+Shift within the active remote desktop connection.

### `G.toggleMenu()`

Toggles visibility of the Guacamole menu. This function only has an effect
while within the client (while using a connection).

### `G.sendKeys(...)`

Sends the given sequence of keys. Arguments passed to this function are processed in order, and interpreted in the following manner:

 * Numbers are interpreted as raw X11 keysyms to be held down for the duration
   of the current call.
 * Arrays are interpreted as sets of parameters to be passed to a nested call
   to `G.sendKeys()`.
 * Strings are interpreted as text to be typed, with each character receiving
   both press and release events.
 * All other types are coerced to strings and processed as such.

For example, to send Ctrl+Alt+Del:

```js
G.sendKeys(G.L_CTRL, G.L_ALT, G.DELETE);
```

To press Ctrl, send Shift+T (releasing Shift once T is pressed), and finally
send F, all while continuing to hold Ctrl:

```js
G.sendKeys(G.L_CTRL, [G.L_SHIFT, 'T'], 'f');
```

### `G.sendArgv(name, value)`

Sends the given connection parameter value to the current, active remote
desktop connection using an argument value stream with the given name. The
argument value stream is opened with the "text/plain" mimetype.

#### Parameters

Name    | Type     | Description
------- | -------- | -----------
`name`  | `String` | The name of the connection parameter to send
`value` | `String` | The value of the connection parameter.

### `G.sendPipe(name, value)`

Sends the given text data through the current, active remote desktop connection
using a pipe stream with the given name. The pipe stream is opened with the
"text/plain" mimetype.

#### Parameters

Name    | Type     | Description
------- | -------- | -----------
`name`  | `String` | The name of the pipe stream to open.
`value` | `String` | The text data to send along the pipe stream.

Keysym Constants
----------------

The following constants are defined on the `G` object and contain the numeric
value of the corresponding X11 key:

Constant            | Key Name
------------------- | --------
`ALTGR`             | AltGr
`BACKSPACE`         | Backspace
`CAPS_LOCK`         | Caps Lock
`CONTEXT_MENU`      | Context Menu
`DELETE`            | Delete
`DOWN`              | Down arrow
`END`               | End
`ENTER`             | Enter/Return
`ESCAPE`            | Escape
`F1`                | F1
`F2`                | F2
`F3`                | F3
`F4`                | F4
`F5`                | F5
`F6`                | F6
`F7`                | F7
`F8`                | F8
`F9`                | F9
`F10`               | F10
`F11`               | F11
`F12`               | F12
`F13`               | F13
`F14`               | F14
`F15`               | F15
`F16`               | F16
`F17`               | F17
`F18`               | F18
`F19`               | F19
`F20`               | F20
`F21`               | F21
`F22`               | F22
`F23`               | F23
`F24`               | F24
`INSERT`            | Insert
`L_ALT`             | Left Alt
`L_CTRL`            | Left Ctrl
`LEFT`              | Left arrow
`L_META`            | Left Meta
`L_SHIFT`           | Left Shift
`L_SUPER`           | Left Super
`NUM_LOCK`          | Num Lock
`PAGE_DOWN`         | Page Down
`PAGE_UP`           | Page Up
`PRINT_SCREEN`      | Print Screen
`R_ALT`             | Right Alt
`R_CTRL`            | Right Ctrl
`RIGHT`             | Right arrow
`R_META`            | Right Meta
`R_SHIFT`           | Right Shift
`R_SUPER`           | Right Super
`SCROLL_LOCK`       | Scroll Lock
`TAB`               | Tab
`UP`                | Up arrow
`WIN`               | Windows
