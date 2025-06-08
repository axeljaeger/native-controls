<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

# Buttons & Selection

## Buttons
Elements that trigger an immediate action. Styles are reset to the browser's default style.

<!--@include: @/components/buttons/button-simple.md-->
::: code-group
<<< @/components/buttons/button-simple.md{html}[HTML]
:::

### Predefines roles
Buttons can have predefined actions for forms.

<!--@include: @/components/buttons/button-roles.md-->
::: code-group
<<< @/components/buttons/button-roles.md{html}[HTML]
<<< @/styles/buttons-select.css#styled-button[CSS]
:::

### Styling buttons

<!--@include: @/components/buttons/button-styled.md-->
::: code-group
<<< @/components/buttons/button-styled.md{html}[HTML]
<<< @/styles/buttons-select.css#styled-button[CSS]
:::

### Button with icon
You can put arbitrary HTML elements inside the button, such das icons. Make sure to adjust the spacing, for example using flex-box.

Here, an icon from an icon font is used, see [Icons](../guides/icons).

<!--@include: @/components/buttons/button-styled-icon.md-->

::: code-group
<<< @/components/buttons/button-styled-icon.md{html}[HTML]
<<< @/styles/buttons-select.css#styled-button-icon[CSS]
:::

### Different visual roles

<!--@include: @/components/buttons/button-styled-visual-roles.md-->

::: code-group
<<< @/components/buttons/button-styled-visual-roles.md{html}[HTML]
<<< @/styles/buttons-select.css#styled-button-icon[CSS]
:::

### Split button with menu
<!--@include: @/components/buttons/button-styled-split.md-->

::: code-group
<<< @/components/buttons/button-styled-split.md{html}[HTML]
<<< @/styles/buttons-select.css#split-button[CSS]
:::

> [!WARNING]
> The mechanism for the popup menu is currently only available in Chrome from version 125 


### Toolbar button
<!--@include: @/components/buttons/button-toolbutton.md-->

::: code-group
<<< @/components/buttons/button-toolbutton.md{html}[HTML]
<<< @/styles/buttons-select.css#tool-button[CSS]
:::


## Toggle Controls (On/Off, Many-of-Many)
Allow toggling of states or selecting multiple options:

<input type="checkbox" id="terms">
<label for="terms">Accept terms</label>

```html
<input type="checkbox" id="terms">
<label for="terms">Accept terms</label>
```

HTML label element ensures that the label is also clickable

<label class="toolbar-toggle">
  <input type="checkbox" />
  <span class="material-icons">format_bold</span>
</label>

### Styling checkbox
Change tickbox using emoji

Icon only: Ex: Photoshop layer view

Animations for transitioning
- Up down
- Only down
  - Maybe without clip but fade?
- Same for horizontal
- 90 degree rotate with fade
- Cube transition
- Zoom in/out
- Flip
- Fade
Without clip:
- Zoom out fade / reveal


Lottie animation?
- Opening Eye?
- 




### Mobile style switcher

You can do it with CSS [^css-switcher], but there is also a native version on the horizon [^native-switcher]. WebKit already has support [^native-switcher-webkit]




## Exclusive Selection (One-of-Many)
Choose one option among several:

- `<input type="radio">`
- `<select>` (single mode)
- Tab group (via ARIA)

```html
<input type="radio" name="color" value="red" checked> Red
<input type="radio" name="color" value="blue"> Blue
```

---

### Multi-Selection
Choose multiple options from a list:

- `<select multiple>`
- Checkbox groups

```html
<select multiple>
  <option>Apple</option>
  <option>Banana</option>
  <option>Cherry</option>
</select>
```

---

## Accessibility Considerations

- Use semantic HTML whenever possible
- Provide visible labels or use `aria-label`
- Maintain keyboard operability (`tab`, `space`, `enter`)
- Avoid `div`-based buttons unless roles and interactions are fully replicated

## Related Topics

- [Icons](../guides/icons) – for visual enhancement of controls

## References

[^css-switcher]: https://www.w3schools.com/howto/howto_css_switch.asp
[^native-switcher]: Native switch at WHATWG: [Proposal](https://github.com/whatwg/html/pull/9546) and [Bugreport](https://github.com/whatwg/html/issues/4180)
[^native-switcher-webkit]: Native switcher in Webkit: [Blog article](https://webkit.org/blog/15054/an-html-switch-control/)