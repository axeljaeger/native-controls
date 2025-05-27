# Dialog

The `<dialog>` element provides a built-in way to display modal dialogs in HTML — without external libraries.

## Example

<button onclick="document.getElementById('nativeDialog').showModal()">Open Dialog</button>

<dialog id="nativeDialog">
  <p>This is a native HTML dialog!</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>

## Source Code

````html
<button onclick="document.getElementById('nativeDialog').showModal()">Open Dialog</button>

<dialog id="nativeDialog">
  <p>This is a native HTML dialog!</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>

