# Resizeable

You can create a resizeable element using the native CSS resize property. The browser handles the resizing behavior for you.

<div style="resize: both; overflow: auto; border: 1px solid #ccc; padding: 1rem; width: 300px; height: 150px;">
  This box can be resized! Try dragging the bottom-right corner.
</div>


```html
<div style="resize: both; overflow: auto; border: 1px solid #ccc; padding: 1rem; width: 300px; height: 150px;">
  This box can be resized! Try dragging the bottom-right corner.
</div>
```

Notes
	•	resize: both; allows resizing horizontally and vertically.
	•	overflow: auto; is required for the resize handle to appear.
	•	You can limit resizing to one direction using:
	•	resize: vertical;
	•	resize: horizontal;

🔗 References
	•	MDN: resize - CSS property
