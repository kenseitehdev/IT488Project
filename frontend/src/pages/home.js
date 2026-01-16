import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
import card from '../components/card.js'

let home = $.component.define({
	name: "home-page",
	props: [],
	template: `
 <div>
    <div class="content mx-8">
    <item-card></item-card>
    </div>
  </div>
`,
	onMount() {
     
}
});
export default home;
