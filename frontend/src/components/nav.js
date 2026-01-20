
import '../../src/Vistera/VistraJS.js'
import store from '../store.js'
let nav = $.component.define({
	name: "nav-bar",
	props: [],
	template: `
     <div> <nav class="block w-full  py-2 bg-white shadow-md rounded-mdmt-10 text-black mb-8">
  <div class="container-fluid mx-auto flex flex-wrap items-center justify-between px-12 ">
    <a href="#" class="block cursor-pointer py-1.5 text-4xl text-black font-bold">
      Homestack
    </a>
    <div class="inline-flex"><input class="border-2 border-black border-solid rounded-lg my-2" type="text" /> 
      <button class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        Search
      </button>
    <button id="username" class="rounded-lg bg-black text-white">User</button></div>
    
    </div>
  </div>
</nav>	<div id="auth"></div></div>`,
	onMount() {
        
        let user=store.state.user;
       let username  = user ? user != null : "Guest";
        $.selector("#username").text(username);
        if (username=="Guest"){
            alert("Auth Modal");
        }
}
});
export default nav;
