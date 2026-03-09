import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
import card from '../components/card.js'
import auth from '../components/auth.js'
import create from '../components/createModal.js'
import read from '../components/readModal.js'
import update from '../components/updateModal.js'
import axios from 'axios'
import search from '../components/search.js'

let home = $.component.define({
	name: "home-page",
	props: [],
	template: `
<div id="auth-div"></div>
<div id="search-modal-root"></div>
<div id="create-modal-root"></div>
<div id="read-modal-root"></div>
<div id="update-modal-root"></div>
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
		$.selector("#read-modal-root").html(`<read-modal></read-modal>`);
		$.selector("#update-modal-root").html(`<update-modal></update-modal>`);
		$.selector("#search-modal-root").html(`<search-modal></search-modal>`);

		let itemsCache = [];

		const runSearch = () => {
			const searchInput = document.getElementById("searchInput");
			const modal = document.getElementById("searchModal");

			if (!searchInput || !modal) {
				console.log("search elements missing", { searchInput, modal });
				return;
			}

			const query = searchInput.value.trim().toLowerCase();

			if (!query) {
				$.selector("#searchResults").html(
					`<p class="text-gray-500 col-span-full">Enter a search term.</p>`
				);
				modal.classList.remove("hidden");
				return;
			}

			const matches = itemsCache.filter(item =>
				(item.title || "").toLowerCase().includes(query) ||
				(item.creator || "").toLowerCase().includes(query) ||
				(item.media_type || "").toLowerCase().includes(query) ||
				(item.notes || "").toLowerCase().includes(query)
			);

			if (matches.length === 0) {
				$.selector("#searchResults").html(
					`<p class="text-gray-500 col-span-full">No results found.</p>`
				);
			} else {
				$.selector("#searchResults").html(matches.map(item => `
  <item-card
    item_id="${item.item_id ?? item.id ?? ''}"
    title="${item.title ?? ''}"
    creator="${item.creator ?? ''}"
    tags="${item.tags ?? ''}"
    media_type="${item.media_type ?? ''}"
    year="${item.year ?? ''}"
    notes="${item.notes ?? ''}">
  </item-card>
`).join(''));
			}

			modal.classList.remove("hidden");
		};

		document.addEventListener("click", (e) => {
			const searchBtn = e.target.closest("#searchBtn");
			if (searchBtn) {
				runSearch();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.target && e.target.id === "searchInput" && e.key === "Enter") {
				e.preventDefault();
				runSearch();
			}
		});

		const addBtn = document.getElementById("addItemBtn");
		if (addBtn) {
			addBtn.addEventListener("click", () => {
				const modal = document.getElementById("createModal");
				if (modal) modal.classList.remove("hidden");
			});
		}

		const token = store.state.token || localStorage.getItem("token");
		if (!token) {
			$.selector("#itemContainer").html('');
			$.selector("#noItems").html(
				`<h2 class="mt-32 text-3xl text-center w-full">Please sign in to view your items.</h2>`
			);
			return;
		}

		try {
			const response = await axios.get("http://127.0.0.1:5000/api/items", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const data = response.data;
			itemsCache = data || [];

			let html = '';

			if (itemsCache.length > 0) {
				for (let i = 0; i < itemsCache.length; i++) {
					html += `
  <item-card
    item_id="${itemsCache[i].item_id ?? itemsCache[i].id ?? ''}"
    title="${itemsCache[i].title ?? ''}"
    creator="${itemsCache[i].creator ?? ''}"
    tags="${itemsCache[i].tags ?? ''}"
    media_type="${itemsCache[i].media_type ?? ''}"
    year="${itemsCache[i].year ?? ''}"
    notes="${itemsCache[i].notes ?? ''}">
  </item-card>
`;
				}
				$.selector("#itemContainer").html(html);
				$.selector("#noItems").html('');
			} else {
				$.selector("#itemContainer").html('');
				$.selector("#noItems").html(
					`<h2 class="mt-32 text-5xl text-center w-full">No items yet!</h2>`
				);
			}
		} catch (err) {
			console.error("Failed to load items:", err);
			$.selector("#itemContainer").html('');
			$.selector("#noItems").html(
				`<h2 class="mt-32 text-3xl text-center w-full text-red-500">Failed to load items.</h2>`
			);
		}
	}
});

export default home;