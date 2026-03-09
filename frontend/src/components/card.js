import '../Vistera/VistraJS.js'
import boardGame from '../assets/boardGame.svg'
import book from '../assets/book.svg'
import game from '../assets/game.svg'
import movie from '../assets/movie.svg'
import vinyl from '../assets/vinyl.svg'

function getAssetByType(type) {
	const t = String(type || '').trim().toLowerCase();

	if (t === 'book') return book;
	if (t === 'movie' || t === 'film') return movie;
	if (t === 'game' || t === 'video game' || t === 'videogame') return game;
	if (t === 'boardgame' || t === 'board game' || t === 'board_game') return boardGame;
	if (t === 'vinyl' || t === 'record' || t === 'music' || t === 'album') return vinyl;

	return book;
}

let card = $.component.define({
	name: "item-card",
	props: ['item_id', 'title', 'creator', 'tags', 'media_type', 'year', 'notes'],
	template: `
<div class="item-card-wrapper group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-sm">
  <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
    <img class="item-image w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300" src="${book}" alt="Item cover">
  </div>

  <div class="p-6">
    <h3 class="item-title font-bold text-2xl mb-3 text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors"></h3>
    <h4 class="item-creator text-gray-700 font-medium mb-1"></h4>
    <span class="item-year text-sm text-gray-500"></span>

    <p class="item-notes text-gray-600 text-sm leading-relaxed my-4 line-clamp-3">
      No notes available.
    </p>

    <div class="border-t border-gray-200 my-4"></div>

    <div class="flex flex-wrap gap-2 items-center justify-center">
      <span class="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:shadow transition-shadow">
        <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
        <span class="item-tags"></span>
      </span>

      <span class="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:shadow transition-shadow">
        <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"/>
        </svg>
        <span class="item-media-type"></span>
      </span>
    </div>

    <div class="flex justify-center gap-2 mt-4">
      <button class="edit-btn bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
      <button class="delete-btn bg-red-600 text-white px-3 py-1 rounded">Delete</button>
    </div>
  </div>
</div>
	`,
	onMount() {
		const root = this.$el || this;

		const image = root.querySelector(".item-image");
		const title = root.querySelector(".item-title");
		const creator = root.querySelector(".item-creator");
		const tags = root.querySelector(".item-tags");
		const mediaType = root.querySelector(".item-media-type");
		const year = root.querySelector(".item-year");
		const notes = root.querySelector(".item-notes");

		const mediaTypeValue = this.props.media_type?.value || '';
		const titleValue = this.props.title?.value || 'Untitled';
		const creatorValue = this.props.creator?.value || 'Unknown Creator';
		const tagsValue = this.props.tags?.value || 'General';
		const yearValue = this.props.year?.value || 'Unknown Year';
		const notesValue = this.props.notes?.value || 'No notes available.';

		if (image) {
			image.src = getAssetByType(mediaTypeValue);
			image.alt = `${mediaTypeValue || 'item'} cover`;
		}

		if (title) title.textContent = titleValue;
		if (creator) creator.textContent = creatorValue;
		if (tags) tags.textContent = tagsValue;
		if (mediaType) mediaType.textContent = mediaTypeValue || 'Unknown';
		if (year) year.textContent = yearValue;
		if (notes) notes.textContent = notesValue;
	}
});

export default card;