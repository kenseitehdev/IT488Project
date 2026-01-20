import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
import card from '../components/card.js'

let home = $.component.define({
	name: "home-page",
	props: [],
	template: `
<div class="content mx-8 grid grid-cols-3 gap-6">
  <item-card id="1" itemNumber="1" name="itemHere"></item-card>
  <item-card id="2" itemNumber="2" name="itemHere2"></item-card>
  <item-card id="3" itemNumber="3" name="itemHere3"></item-card>
  <item-card id="4" itemNumber="4" name="itemHere4"></item-card>
  <item-card id="5" itemNumber="5" name="itemHere5"></item-card>
</div>
`,
	onMount() {
     
}
});
export default home;
