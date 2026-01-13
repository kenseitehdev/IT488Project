import './Vistera/VistraJS.js'
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import counter from './components/counter.js'
$.selector("#app").html(`
  <div>
    <h1 class="text-blue-500">Hello World, Frontend</h1>
    <div class="card">
    <counter-box></counter-box>
    </div>
  </div>
`);
