<template>
  <div>
    <div ref="pipContent" class="pip-box">
      <h3>📌 Floating Widget</h3>
      <p>This is a custom HTML element in Picture-in-Picture.</p>
      <button>Click me</button>
    </div>

    <button @click="togglePiP">
      {{ isActive ? 'Close PiP' : 'Open in Picture-in-Picture' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pipContent = ref(null)
let pipWindow = null
const isActive = ref(false)

const togglePiP = async () => {
  if (!('documentPictureInPicture' in window)) {
    alert('Document Picture-in-Picture API is not supported in this browser.')
    return
  }

  if (isActive.value) {
    pipWindow?.close()
    return
  }

  try {
    pipWindow = await documentPictureInPicture.requestWindow({
      width: pipContent.value.offsetWidth,
      height: pipContent.value.offsetHeight
    })

    // Copy styles
    Array.from(document.styleSheets).forEach(styleSheet => {
      try {
        const rules = Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('')
        const style = document.createElement('style')
        style.textContent = rules
        pipWindow.document.head.appendChild(style)
      } catch {
        if (styleSheet.href) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = styleSheet.href
          pipWindow.document.head.appendChild(link)
        }
      }
    })

    pipWindow.document.body.appendChild(pipContent.value)

    // Bind event manually in PiP window
    const pipButton = pipContent.value.querySelector('button')
    pipButton?.addEventListener('click', () => {
      pipWindow.alert('Clicked inside PiP!')
    })

    pipWindow.addEventListener('pagehide', () => {
      document.body.appendChild(pipContent.value)
      isActive.value = false
    })

    isActive.value = true
  } catch (err) {
    console.error('Failed to open PiP:', err)
  }
}
</script>

<style scoped>
.pip-box {
  border: 1px solid #ccc;
  padding: 1rem;
  width: 300px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>
