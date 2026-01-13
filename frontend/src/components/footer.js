import '../../src/Vistera/VistraJS.js'

let footer = $.component.define({
	name: "footer-bar",
	props: [],
	template: `
<footer class="bg-black text-white py-4 px-3 mt-16 absolute bottom-0 left-0 right-0">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p class="text-xs text-gray-400 md:text-sm">Copyright 2026 &copy; All Rights Reserved</p>
        </div>
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li class="mx-4"><a href="#" class="text-gray-400 hover:text-white">IT488</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Terms of Use</a></li>
            </ul>
        </div>
    </div>
</footer>
`,
	onMount() {
}
});
export default footer;
