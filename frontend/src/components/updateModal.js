import '../Vistera/VistraJS.js'
import store from '../store.js'

let update = $.component.define({
  name: "update-modal",
  props: [],
  template: `<div id="updateModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
  <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative">
    
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Update Item</h2>
      <button id="closeUpdateModal" type="button" class="text-gray-500 hover:text-black text-2xl font-bold leading-none">
        ×
      </button>
    </div>

    <form id="updateItemForm" class="space-y-5">
      <input id="updateItemId" type="hidden" />

      <div>
        <label for="updateTitle" class="block text-sm font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          id="updateTitle"
          type="text"
          placeholder="Enter item title"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="updateMediaType" class="block text-sm font-semibold text-gray-700 mb-2">
            Media Type
          </label>
          <select
            id="updateMediaType"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select media type</option>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="game">Game</option>
            <option value="board game">Board Game</option>
            <option value="vinyl">Vinyl</option>
          </select>
        </div>

        <div>
          <label for="updateYear" class="block text-sm font-semibold text-gray-700 mb-2">
            Year
          </label>
          <input
            id="updateYear"
            type="text"
            placeholder="e.g. 1999"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div>
        <label for="updateCreator" class="block text-sm font-semibold text-gray-700 mb-2">
          Creator
        </label>
        <input
          id="updateCreator"
          type="text"
          placeholder="Author, director, artist, etc."
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label for="updateTags" class="block text-sm font-semibold text-gray-700 mb-2">
          Tags
        </label>
        <input
          id="updateTags"
          type="text"
          placeholder="Comma-separated tags"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label for="updateNotes" class="block text-sm font-semibold text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          id="updateNotes"
          rows="4"
          placeholder="Optional notes"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        ></textarea>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button
          id="cancelUpdateModal"
          type="button"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          id="submitUpdateItem"
          type="submit"
          class="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>
  `,
  onMount() {
    const modal = document.getElementById("updateModal");
    const closeBtn = document.getElementById("closeUpdateModal");
    const cancelBtn = document.getElementById("cancelUpdateModal");
    const form = document.getElementById("updateItemForm");

    const hideModal = () => {
      modal.classList.add("hidden");
    };

    if (closeBtn) closeBtn.addEventListener("click", hideModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideModal);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const token = store.state.token || localStorage.getItem("token");
      const itemId = document.getElementById("updateItemId").value;

      const payload = {
        title: document.getElementById("updateTitle").value.trim(),
        media_type: document.getElementById("updateMediaType").value.trim(),
        creator: document.getElementById("updateCreator").value.trim(),
        year: document.getElementById("updateYear").value.trim(),
        tags: document.getElementById("updateTags").value.trim(),
        notes: document.getElementById("updateNotes").value.trim()
      };

      try {
        const res = await fetch(`http://127.0.0.1:5000/api/items/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("update item response:", data);

        if (!res.ok) {
          alert(data.error || "Failed to update item");
          return;
        }

        hideModal();
        window.location.reload();
      } catch (err) {
        console.error("update item error:", err);
        alert("Update item request failed");
      }
    });
  }
});

export default update;