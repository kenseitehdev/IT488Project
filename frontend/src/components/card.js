import '../../src/Vistera/VistraJS.js'
import book from '../assets/book.svg'

let card = $.component.define({
	name: "item-card",
	props: ['itemNumber', 'name', 'description', 'author', 'genre', 'type', 'published'],
	template: `
<div class="item-card-wrapper group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-sm">
  <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
    <img class="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300" src="${book}" alt="Book cover">
  </div>
  
  <div class="p-6">
    <h3 class="item-name font-bold text-2xl mb-3 text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors"></h3>
   <h4 id="item-author"></h4> 
    <span class="item-published"></span>

    <p class="item-description text-gray-600 text-sm leading-relaxed my-4 line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
    
    <div class="border-t border-gray-200 my-4"></div>
    <div class="flex flex-wrap gap-2 items-center justify-center">
      
      <span class="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:shadow transition-shadow">
        <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
        <span class="item-genre"></span>
      </span>
      
      <span class="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:shadow transition-shadow">
        <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"/>
        </svg>
        <span class="item-type"></span>
      </span>
    </div>
  </div>
</div>
	`,
	onMount() {
		const root = this.$el || this;
		const name = root.querySelector(".item-name");
		const description = root.querySelector(".item-description");
		const author = root.querySelector("#item-author");
		const genre = root.querySelector(".item-genre");
		const type = root.querySelector(".item-type");
		const published = root.querySelector(".item-published");
		if (name) name.textContent = this.props.name?.value || 'Untitled';
		if (description) description.textContent = this.props.description?.value || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.';
		if (author) author.textContent = this.props.author?.value || 'Unknown Author';
		if (genre) genre.textContent = this.props.genre?.value || 'General';
		if (type) type.textContent = this.props.type?.value || 'Book';
		if (published) published.textContent = this.props.published?.value || 'Unknown Date';
	}
});

export default card;
