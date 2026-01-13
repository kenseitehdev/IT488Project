import './Vistera/VistraJS.js'
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import counter from './components/counter.js'
import card from './components/card.js'
import nav from './components/nav.js'
import footer from './components/footer.js'

$.selector("#app").html(`
  <div>
    <nav-bar></nav-bar>
    <div class="content mx-8">
    <h1 class="text-blue-500">Hello World, Frontend</h1>
    <counter-box></counter-box>
    <item-card></item-card>
    </div>
    <footer-bar></footer-bar>
  </div>
`);
