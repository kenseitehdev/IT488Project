import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
import card from '../components/card.js'
import axios from 'axios'
let home = $.component.define({
	name: "home-page",
	props: [],
	template: `<div id="home-body" class="mx-8">
<div class="flex justify-start mb-4 w-[10%]">
	<button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4 fill-current"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>	</button>
</div>
<div class="flex justify-end mb-4 ml-[90%] -mt-[6.5%]">
	<button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4 fill-current">
			<path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z"/>
		</svg>
	</button>
</div>
		<div id="noItems"></div>
						<div id="itemContainer" class="grid grid-cols-3 gap-6"></div>
		</div>
	`,
	onMount() {
const response =  axios.get("http://127.0.0.1:5000/api/items");
const data = response.data;
		let html = '';
		if (data){
		for (let i = 0; i < data.length; i++) {
			html += `
				<item-card
					id="${data[i].id}"
					itemNumber="${data[i].itemNumber}"
					name="${data[i].name}">
				</item-card>
			`;
		}
}else{
html=`<h2 class="mt-32 text-5xl text-center w-full">No items yet!</h2>`;}
		data?	$.selector("#itemContainer").html(html): $.selector("#noItems").html(html);
}});

export default home;