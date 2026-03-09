import '../Vistera/VistraJS.js'

let read = $.component.define({
  name: "read-modal",
  props: ['title', 'media_type', 'creator', 'year', 'tags', 'notes'],
  template: `
<div id="readModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
  <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative">

    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800">View Item</h2>
      <button id="closeReadModal" type="button" class="text-gray-500 hover:text-black text-2xl font-bold leading-none">
        ×
      </button>
    </div>

    <div class="space-y-5">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Title</label>
        <div id="readTitle" class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Media Type</label>
          <div id="readMediaType" class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"></div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Year</label>
          <div id="readYear" class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"></div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Creator</label>
        <div id="readCreator" class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"></div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
        <div id="readTags" class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"></div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
        <div id="readNotes" class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 min-h-[120px] whitespace-pre-wrap"></div>
      </div>

      <div class="flex justify-end pt-4">
        <button
          id="cancelReadModal"
          type="button"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>
  `,
  onMount() {
    const modal = document.getElementById("readModal");
    const closeBtn = document.getElementById("closeReadModal");
    const cancelBtn = document.getElementById("cancelReadModal");

    const hideModal = () => {
      modal.classList.add("hidden");
    };

    if (closeBtn) closeBtn.addEventListener("click", hideModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideModal);

    const title = this.props.title?.value || 'Untitled';
    const mediaType = this.props.media_type?.value || 'Unknown';
    const creator = this.props.creator?.value || 'Unknown Creator';
    const year = this.props.year?.value || 'Unknown Year';
    const tags = this.props.tags?.value || 'General';
    const notes = this.props.notes?.value || 'No notes available.';

    document.getElementById("readTitle").textContent = title;
    document.getElementById("readMediaType").textContent = mediaType;
    document.getElementById("readCreator").textContent = creator;
    document.getElementById("readYear").textContent = year;
    document.getElementById("readTags").textContent = tags;
    document.getElementById("readNotes").textContent = notes;
  }
});

export default read;