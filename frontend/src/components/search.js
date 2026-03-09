import '../Vistera/VistraJS.js'

let search = $.component.define({
  name: "search-modal",
  props: [],
  template: `
<div id="searchModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
  <div class="bg-white w-full max-w-6xl rounded-2xl shadow-2xl p-8 relative max-h-[80vh] overflow-y-auto">

    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Search Results</h2>
      <button id="closeSearchModal" type="button" class="text-gray-500 hover:text-black text-2xl font-bold leading-none">
        ×
      </button>
    </div>

    <div id="searchResults" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <p class="text-gray-500 col-span-full">No results yet.</p>
    </div>

    <div class="flex justify-end pt-6">
      <button
        id="cancelSearchModal"
        type="button"
        class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        Close
      </button>
    </div>
  </div>
</div>
  `,
  onMount() {
    const modal = document.getElementById("searchModal");
    const closeBtn = document.getElementById("closeSearchModal");
    const cancelBtn = document.getElementById("cancelSearchModal");

    const hideModal = () => {
      modal.classList.add("hidden");
    };

    if (closeBtn) closeBtn.addEventListener("click", hideModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideModal);
  }
});

export default search;