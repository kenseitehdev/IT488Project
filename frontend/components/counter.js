
import '../src/Vistera/VistraJS.js'
let counter = $.component.define({
	name: "counter-box",
	props: [],
	template: `
		<div class="bg-red-500">
			<p>🔢 Counter: {{ count.value }}</p>
			<button id="increment">➕ Increment</button>
			<button id="decrement">➖ Decrement</button>
			<button id="reset">🔁 Reset</button>
		</div>
	`,
	onMount() {
		const self = this;
		self.count = $.reactive(0);

		self.$watch(self.count, () => {

			queueMicrotask(() => {
				$.selector(self).find("#increment").on("click", () => self.count.value++);
				$.selector(self).find("#decrement").on("click", () => self.count.value--);
				$.selector(self).find("#reset").on("click", () => self.count.value = 0);
			});
            		self.update({ count: self.count.value });

		});

	}
});
export default counter;
