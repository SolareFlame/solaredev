import { createApp } from 'vue'

import '@fontsource-variable/albert-sans'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/600-italic.css'

// tokens.css and loader.css are linked from index.html (needed before this script runs).
import './styles/base.css'
import './styles/layout.css'
import './styles/intro.css'

import App from './App.vue'
import { startIntro } from './intro'

createApp(App).mount('#app')

// Japanese font for the decorative kanji: ~120 @font-face rules (split by unicode-range),
// so loaded as a separate stylesheet that doesn't block the first render.
void import('@fontsource/noto-sans-jp/900.css')

hideLoader()

/**
 * Lifts the loading screen once web fonts and images (paper texture, avatar) are in,
 * and starts the opening sequence underneath it.
 */
function hideLoader() {
  const loader = document.getElementById('loader')
  if (!loader) {
    startIntro()
    return
  }

  const pageLoaded = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })

  void Promise.all([document.fonts.ready, pageLoaded]).then(() => {
    loader.classList.add('loader--hidden')
    startIntro()
    setTimeout(() => loader.remove(), 800) // exit duration (loader.css)
  })
}
