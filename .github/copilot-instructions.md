# copilot-instruction.md

> **Purpose**  
> You are assisting in a VitePress site that demonstrates how to recreate classic desktop-UI concepts (Qt/GTK/WinForms patterns) using primarily **plain HTML + CSS**. The audience is developers new to web UIs coming from classic UI toolkits. Favor **native HTML** and **modern platform APIs** (e.g., Popover, `<dialog>`, `details/summary`) over scripts. If something isn’t fully supported yet, **choose the forward path** and mention progressive enhancement briefly.

---

## 1) Site organization

- **Chapters** group concepts (e.g., `buttons`, `menus`, `dialogs`).
- Each **example** shows:
  1) An inline render (HTML included into the page).  
  2) A **code-group** with tabs for `HTML` and `CSS`.

**Canonical include pattern:**
```md
<!--@include: @/components/buttons/button-styled.md-->
::: code-group
<<< @/components/buttons/button-styled.md{html}[HTML]
<<< @/styles/buttons.css#styled-button-icon[CSS]
:::

Where things live
	•	HTML examples: @/components/<chapter>/<example>.md (HTML-only snippet; no frontmatter).
	•	Chapter CSS: @/styles/<chapter>.css with named regions (and a MARK comment) per example.
	•	The chapter page (docs/<chapter>.md) includes both.

Suggested repo layout

docs/
  .vitepress/
  components/
    buttons/
      button-styled.md
      button-with-icon.md
      button-split-popover.md
    menus/
      menu-basic.md
      menu-context-popover.md
  styles/
    buttons.css
    menus.css
  index.md
  buttons.md
  menus.md


⸻

2) CSS regions & editor markers (MANDATORY)

Each example’s CSS must be wrapped in a named region and preceded by a MARK line so VS Code folding works nicely:

/* MARK: Icon */
/* #region styled-button-icon */

/* styles… */

/* #endregion styled-button-icon */

	•	The #region name must match what the chapter imports (e.g. #styled-button-icon).
	•	Always include both MARK and #region wrappers when proposing CSS.

⸻

3) Authoring a new example (step-by-step)
	1.	Create HTML: docs/components/<chapter>/<example>.md
Keep it semantic and minimal. No headings/frontmatter.
	2.	Add CSS: docs/styles/<chapter>.css
Add a MARK + region pair for the example.
	3.	Wire it in: docs/<chapter>.md

<!--@include: @/components/<chapter>/<example>.md-->
::: code-group
<<< @/components/<chapter>/<example>.md{html}[HTML]
<<< @/styles/<chapter>.css#<region-name>[CSS]
:::


	4.	Preview and check a11y (see checklist).

⸻

4) Conventions (adapted to this project)
	•	No CSS variables for colors. Use direct hex/rgb values to keep examples simple and focused on the HTML patterns.
	•	Examples: `#3b82f6` (blue-500), `#2563eb` (blue-600), `white`, `#ccc`, `rgba(0, 0, 0, 0.15)`.
	•	No frameworks (no Tailwind/Bootstrap). Keep to HTML+CSS; tiny JS only when behavior cannot be expressed natively.
	•	Prefer native/future APIs:
	•	Menus & popovers: Popover API (popover attribute, popovertarget, anchor / CSS Anchor Positioning if helpful).
	•	Disclosure: details/summary.
	•	Modals: <dialog> with .showModal() progressive enhancement.
	•	Form behaviors: native controls first.

⸻

5) Accessibility & semantics
	•	Use real elements (<button>, <a>, <ul>/<li>, <nav>, <dialog>, <form>, etc.).
	•	Provide visible focus styles (≥ 3:1 contrast). Use :focus-visible.
	•	Icon-only controls need an accessible name (aria-label).
	•	For composite widgets (menus/tabs), prefer native where possible. When ARIA is needed, follow APG roles/states.
	•	Works at 320px width and in high zoom scenarios (≥ 200%).

⸻

6) JavaScript (only when necessary)
	•	First try native patterns (Popover, details/summary, <dialog>).
	•	If JS is needed (e.g., keyboard roving, state sync), keep it tiny, framework-free, and progressive:
	•	Sync aria-expanded, set initial focus when a popover/menu opens, close on Escape.
	•	Do not break the static render if JS is absent.

⸻

7) Example templates (ready to copy)

7.1 Buttons — “Styled button with icon”

File: docs/components/buttons/button-styled.md

<!-- Example: Styled button with leading icon -->
<button class="btn">
  <span class="btn__icon" aria-hidden="true">★</span>
  <span class="btn__label">Favorite</span>
</button>

CSS region in docs/styles/buttons.css

/* MARK: Icon */
/* #region styled-button-icon */

.btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: .5rem;
  padding: .5rem .9rem;
  line-height: 1.2;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.btn:hover { background: #2563eb; }

.btn:focus-visible {
  outline: 3px solid Highlight;
  outline-offset: 2px;
}

.btn__icon { display: inline-block; font-size: 1.1em; line-height: 0; }

.btn[disabled] { opacity: .6; cursor: not-allowed; }

/* #endregion styled-button-icon */

Chapter include (docs/buttons.md)

<!--@include: @/components/buttons/button-styled.md-->
::: code-group
<<< @/components/buttons/button-styled.md{html}[HTML]
<<< @/styles/buttons.css#styled-button-icon[CSS]
:::


⸻

7.2 Buttons — “Split button (action + menu via Popover API)”

Uses the Popover API (no position: absolute). The caret button opens a popover that’s anchored to the toggle using CSS Anchor Positioning (future-friendly). Where Anchor Positioning is unsupported, the popover still opens (browser default top-layer placement).

HTML docs/components/buttons/button-split-popover.md

<!-- Example: Split button with popover menu (native Popover API) -->
<div class="split-btn" role="group">
  <button class="btn">Run</button>

  <!-- The toggle is the anchor for positioning -->
  <button class="btn split-btn__toggle"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-controls="run-menu"
          aria-label="More options"
          id="run-toggle"
          popovertarget="run-menu">
    ▾
  </button>

  <!-- Native popover (top layer). Anchored to the toggle. -->
  <ul class="menu" id="run-menu" role="menu" popover anchor="run-toggle">
    <li role="none"><button type="button" role="menuitem" class="menu__item">Run fast</button></li>
    <li role="none"><button type="button" role="menuitem" class="menu__item">Run safe</button></li>
  </ul>
</div>

<script>
  // Progressive enhancement: keep aria-expanded in sync & basic keyboard handling.
  const split = document.currentScript.previousElementSibling;
  const toggle = split.querySelector('.split-btn__toggle');
  const menu   = split.querySelector('#run-menu');

  menu.addEventListener('toggle', () => {
    const open = menu.matches(':popover-open');
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      // move focus to first item
      split.querySelector('.menu__item')?.focus();
    } else {
      // restore focus to the toggle
      toggle.focus();
    }
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') menu.hidePopover?.();
  });
</script>

CSS region in docs/styles/buttons.css

/* MARK: Split button (Popover) */
/* #region button-split-popover */

.split-btn {
  display: inline-grid;
  grid-template-columns: 1fr auto;
  vertical-align: middle;
}

.split-btn .btn { border-radius: .5rem 0 0 .5rem; }
.split-btn .split-btn__toggle { border-radius: 0 .5rem .5rem 0; }

/* Popover menu appearance (no absolute positioning) */
.menu {
  margin: 0;
  padding: .25rem;
  list-style: none;
  border: 1px solid #ccc;
  background: white;
  color: inherit;
  border-radius: .5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 12rem;

  /* Anchor Positioning (future-friendly). The toggle is the anchor. */
  /* If unsupported, UA will position the popover; still usable. */
  position-try: bottom right, top right, bottom left;
  inset-area: auto;
}

/* Menu items */
.menu__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: .5rem .6rem;
  background: transparent;
  border: none;
  color: inherit;
  border-radius: .4rem;
  cursor: pointer;
}

.menu__item:hover,
.menu__item:focus-visible {
  background: #f3f4f6;
  outline: none;
}

/* #endregion button-split-popover */

Chapter include

<!--@include: @/components/buttons/button-split-popover.md-->
::: code-group
<<< @/components/buttons/button-split-popover.md{html}[HTML]
<<< @/styles/buttons.css#button-split-popover[CSS]
:::


⸻

7.3 Menus — “Context menu via Popover + contextmenu”

(Optional additional pattern showing native-first approach)

HTML docs/components/menus/menu-context-popover.md

<!-- Example: Context menu using native Popover API -->
<div class="context-area" tabindex="0" aria-label="Canvas">
  Right-click (or use the menu key) inside this area.
</div>

<ul class="ctx-menu" id="ctx" role="menu" popover>
  <li role="none"><button role="menuitem" class="ctx-item">Cut</button></li>
  <li role="none"><button role="menuitem" class="ctx-item">Copy</button></li>
  <li role="none"><button role="menuitem" class="ctx-item">Paste</button></li>
</ul>

<script>
  const area = document.currentScript.previousElementSibling;
  const menu = document.getElementById('ctx');

  area.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // Position near pointer if UA allows; otherwise let UA decide.
    // When Anchor Positioning supports pointer-anchoring, prefer that.
    menu.showPopover?.();
    menu.querySelector('.ctx-item')?.focus();
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') menu.hidePopover?.();
  });

  document.addEventListener('pointerdown', (e) => {
    if (!menu.contains(e.target)) menu.hidePopover?.();
  });
</script>

CSS region in docs/styles/menus.css

/* MARK: Context menu (Popover) */
/* #region menu-context-popover */

.context-area {
  padding: 2rem;
  border: 1px dashed #9ca3af;
  background: white;
  color: inherit;
  border-radius: .5rem;
}

.ctx-menu {
  margin: 0;
  padding: .25rem;
  list-style: none;
  border: 1px solid #ccc;
  background: white;
  color: inherit;
  border-radius: .5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 12rem;
}

.ctx-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: .5rem .6rem;
  background: none;
  border: none;
  color: inherit;
  border-radius: .4rem;
  cursor: pointer;
}

.ctx-item:hover,
.ctx-item:focus-visible {
  background: #f3f4f6;
  outline: none;
}

/* #endregion menu-context-popover */

Chapter include

<!--@include: @/components/menus/menu-context-popover.md-->
::: code-group
<<< @/components/menus/menu-context-popover.md{html}[HTML]
<<< @/styles/menus.css#menu-context-popover[CSS]
:::


⸻

8) Writing style for chapter text
	•	Briefly map the pattern to its desktop-UI equivalent.
	•	Call out the native/future API used and why (e.g., “Popover replaces ad-hoc absolute menus”).
	•	Note key a11y behaviors (focus, keyboard, roles) in 1–2 bullets.
	•	Keep prose short; let the live snippet and code tabs teach.

⸻

9) Performance & compatibility
	•	Prefer modern CSS (Flexbox, Grid, :focus-visible, color-mix(), Anchor Positioning when helpful).
	•	Provide graceful behavior if a feature is missing (e.g., popover still opens even if not perfectly anchored).
	•	Avoid fixed heights; allow components to adapt to user settings and zoom.
	•	Use system color keywords for simplicity and accessible contrast.

⸻

10) Checklists

Example submission checklist
	•	HTML example under docs/components/<chapter>/.
	•	Matching CSS MARK + region added in docs/styles/<chapter>.css.
	•	Chapter page includes the snippet and code-group tabs.
	•	Focus visible, keyboard navigation verified.
	•	Works at 320px width and at 200% zoom.
	•	Uses native/future APIs where applicable (Popover, <dialog>, details/summary>).
	•	No CSS variables for colors.

Accessibility checklist
	•	Interactive elements are native where possible.
	•	Icon-only controls have aria-label.
	•	If ARIA is used (e.g., role="menu"), states like aria-expanded are kept in sync.
	•	No tabindex > 0; logical tab order.

⸻

11) Boilerplates

New example HTML

<!-- docs/components/<chapter>/<example>.md -->
<!-- Example: <Short description> -->
<section class="<chapter>-example" aria-label="<Human-readable label>">
  <!-- semantic markup -->
</section>

New CSS region

/* MARK: <MARK label> */
/* #region <region-name> */

/* styles... */

/* #endregion <region-name> */

Chapter include block

<!--@include: @/components/<chapter>/<example>.md-->
::: code-group
<<< @/components/<chapter>/<example>.md{html}[HTML]
<<< @/styles/<chapter>.css#<region-name>[CSS]
:::


⸻

12) Glossary: desktop → web
	•	Toolbar → container with role="toolbar" + real <button> controls.
	•	Menu / MenuBar → Prefer Popover API (top layer) for menus; add roles/keyboard if needed.
	•	Dialog / Modal → <dialog> (native modal) with non-modal fallback.
	•	Disclosure → details/summary for simple toggles.
	•	List / ListView → <ul>/<li> (or <table>/<ol> where semantically appropriate) + CSS.

