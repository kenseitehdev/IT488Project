import '../../src/Vistera/VistraJS.js'
import book from '../assets/book.svg'

let card = $.component.define({
	name: "item-card",
	props: [],
	template: `
<div class="max-w-sm rounded overflow-hidden shadow-lg w-1/4">
  <img class="w-full fill-white" src="${book}" >
  <div class="px-4 py-2">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#author</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#genre</span>
  </div>
</div>
	`,
	onMount() {
}
});
export default card;
