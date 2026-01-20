import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
import card from '../components/card.js'

let home = $.component.define({
	name: "home-page",
	props: [],
	template: `
		<div class="mx-8">
<div class="flex justify-end mb-4">
	<button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4 fill-current">
			<path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z"/>
		</svg>
	</button>
</div>
			<div id="itemContainer" class="grid grid-cols-3 gap-6"></div>
		</div>
	`,
	onMount() {
		let data = [
			{ id: 1, itemNumber: 1, name: "itemHere1" },
			{ id: 2, itemNumber: 2, name: "itemHere2" },
			{ id: 3, itemNumber: 3, name: "itemHere3" },
			{ id: 4, itemNumber: 4, name: "itemHere4" },
			{ id: 5, itemNumber: 5, name: "itemHere5" },
			{ id: 6, itemNumber: 6, name: "itemHere6" },
		];
		
		let html = '';
		for (let i = 0; i < data.length; i++) {
			html += `
				<item-card 
					id="${data[i].id}" 
					itemNumber="${data[i].itemNumber}" 
					name="${data[i].name}">
				</item-card>
			`;
		}
		
		$.selector("#itemContainer").html(html);
	}
});

export default home;
