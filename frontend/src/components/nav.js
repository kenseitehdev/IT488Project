import '../../src/Vistera/VistraJS.js'
import store from '../store.js'

let nav = $.component.define({
	name: "nav-bar",
	props: [],
	template: `
<div>
  <nav class="block w-full bg-white shadow-md rounded-md text-black mb-8">
    <div class="container-fluid mx-auto flex flex-wrap items-center justify-between px-12">
      <a href="#" class="block cursor-pointer py-1.5 text-6xl text-black font-bold">
       <h1> Homestack</h1>
      </a>

      <div class="inline-flex">
        <input id="searchInput" class="border-2 w-lg border-black border-solid rounded-lg my-2" type="text" />
        <button id="searchBtn" class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          Search
        </button>
         </div><div class="inline-flex">
        <button id="username" class="rounded-lg bg-black text-white px-4 py-2">Guest</button>
       <button id="logoutBtn" class="rounded-lg px-4 bg-red-500 text-white mr-8">Logout</button></div>   </nav>
  <div id="auth"></div>
</div>
`,
onMount() {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

console.log("NAV searchBtn:", searchBtn);
console.log("NAV searchInput:", searchInput);
if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    window.dispatchEvent(new CustomEvent("homestack-search", {
      detail: { query }
    }));
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchInput.value.trim();
      window.dispatchEvent(new CustomEvent("homestack-search", {
        detail: { query }
      }));
    }
  });
}
  if (!store.state.token && savedToken) {
    store.state.token = savedToken;
  }

  if (!store.state.user && savedUser) {
    try {
      store.state.user = JSON.parse(savedUser);
    } catch (e) {
      console.error("Failed to parse saved user:", e);
      localStorage.removeItem("user");
    }
  }

  const user = store.state.user;
  const username = user
    ? (user.email || user.name || user.username || "User")
    : "Guest";

  $.selector("#username").text(username);

  const logoutBtn = document.getElementById("logoutBtn");

  if (!user) {
    logoutBtn.classList.add("hidden");
  } else {
    logoutBtn.classList.remove("hidden");
  }

  logoutBtn.addEventListener("click", () => {
    store.state.user = null;
    store.state.token = null;

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    document.getElementById("username").textContent = "Guest";
    logoutBtn.classList.add("hidden");

    location.reload();
  });
}
});

export default nav;