import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
import card from '../components/card.js'
import auth from '../components/auth.js'
import create from '../components/createModal.js'
import axios from 'axios'

let home = $.component.define({
	name: "home-page",
	props: [],
	template: `
<div id="auth-div"></div>
<div id="create-modal-root"></div>

<div id="home-body" class="mx-8">
  <div class="flex justify-start mb-4 w-[10%]">
    <button id="addItemBtn" class="bg-black hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-4 h-4 fill-current">
        <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
      </svg>
      Add
    </button>
  </div>

  <div id="noItems"></div>
  <div id="itemContainer" class="grid grid-cols-3 gap-6"></div>
</div>
`,
	async onMount() {
		$.selector("#auth-div").html(`<auth-modal></auth-modal>`);
		$.selector("#create-modal-root").html(`<create-modal></create-modal>`);

		const addBtn = document.getElementById("addItemBtn");
		if (addBtn) {
			addBtn.addEventListener("click", () => {
				const modal = document.getElementById("createModal");
				if (modal) {
					modal.classList.remove("hidden");
				}
			});
		}

		try {
			const response = await axios.get("http://127.0.0.1:5000/api/items");
			const data = response.data;

			console.log("items:", data);

			let html = '';

			if (data && data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					html += `
  <item-card
    item_id="${data[i].item_id ?? data[i].id ?? ''}"
    title="${data[i].title ?? ''}"
    creator="${data[i].creator ?? ''}"
    tags="${data[i].tags ?? ''}"
    media_type="${data[i].media_type ?? ''}"
    year="${data[i].year ?? ''}"
    notes="${data[i].notes ?? ''}">
  </item-card>
`;
				}
				$.selector("#itemContainer").html(html);
				$.selector("#noItems").html('');
			} else {
				html = `<h2 class="mt-32 text-5xl text-center w-full">No items yet!</h2>`;
				$.selector("#noItems").html(html);
				$.selector("#itemContainer").html('');
			}
		} catch (err) {
			console.error("Failed to load items:", err);
			$.selector("#noItems").html(
				`<h2 class="mt-32 text-3xl text-center w-full text-red-500">Failed to load items.</h2>`
			);
		}
	}
});

export default home;