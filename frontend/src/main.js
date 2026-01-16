import './Vistera/VistraJS.js'
import './style.css'
import home from './pages/home.js'
import nav from './components/nav.js'

$.selector("#app").html(`
  <div>
    <nav-bar></nav-bar>
    <home-page></home-page>
    <footer-bar></footer-bar>
  </div>
`);
