
import '../../src/Vistera/VistraJS.js'

let nav = $.component.define({
	name: "nav-bar",
	props: [],
	template: `
      <nav class="block w-full  py-2 bg-white shadow-md rounded-mdmt-10 text-black mb-8">
  <div class="container-fluid mx-auto flex flex-wrap items-center justify-between px-12 ">
    <a href="#" class="block cursor-pointer py-1.5 text-4xl text-black font-bold">
      Homestack
    </a>
    <div class="inline-flex"><input class="border-2 border-black border-solid rounded-lg my-2" type="text" /> 
      <button class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        Search
      </button>
    <button class="rounded-lg bg-black text-white">User</button></div>
    
    </div>
    <button class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden" type="button">
      <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </span>
    </button>
  </div>
</nav>	`,
	onMount() {
}
});
export default nav;
