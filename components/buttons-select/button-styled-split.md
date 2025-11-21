<!-- Split button with popover menu (native Popover API) -->
<div class="split-button" role="group">
  <button class="main-action">Save</button>
  <button class="dropdown-toggle"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-controls="save-options"
          aria-label="More save options"
          id="save-toggle"
          popovertarget="save-options">
    <span class="material-icons" aria-hidden="true">arrow_drop_down</span>
  </button>
</div>
<!-- Native popover (top layer). Anchored to the toggle. -->
<ul class="dropdown-menu" id="save-options" role="menu" popover anchor="save-toggle">
  <li role="none"><button type="button" role="menuitem">Save as draft</button></li>
  <li role="none"><button type="button" role="menuitem">Export...</button></li>
</ul>