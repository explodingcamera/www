declare global {
	namespace JSX {
		interface IntrinsicElements {
			"masonry-grid": MasonryGridProps;
		}
	}
}

export interface MasonryGridProps {
	sm?: string;
	md?: string;
	lg?: string;
}

const TEMPLATE_STRING = `
<style>
	:host {
		display: block;
		container-type: inline-size;

		--masonry-sm: 1;
		--masonry-md: 2;
		--masonry-lg: 3;

		--column-gap: 1rem;
		--row-gap: var(--column-gap);

		contain: layout paint;
	}

	#items {
		display: grid;
		grid-template-columns: repeat(var(--masonry-lg), minmax(0, 1fr));
		grid-auto-rows: 1px;
		align-items: start;
		column-gap: var(--column-gap);
		row-gap: var(--row-gap);
	}

	@container (width <= 1080px) {
		#items {
			grid-template-columns: repeat(var(--masonry-md), minmax(0, 1fr));
		}
	}

	@container (width <= 660px) {
		#items {
			grid-template-columns: repeat(var(--masonry-sm), minmax(0, 1fr));
		}
	}

	slot {
		display: contents;
	}

	::slotted(*) {
		display: block;
		margin-block-end: 0;
	}
</style>

<div id="items" part="grid">
	<slot></slot>
</div>
`;

class MasonryComponent extends HTMLElement {
	#shadow: ShadowRoot;
	#items: HTMLElement;
	#slot: HTMLSlotElement;
	#resizeObserver: ResizeObserver;
	#animationFrame: number | undefined;

	constructor() {
		super();

		this.#shadow = this.attachShadow({ mode: "open" });

		const template = document.createElement("template");
		template.innerHTML = TEMPLATE_STRING;

		this.#shadow.appendChild(template.content.cloneNode(true));
		const items = this.#shadow.querySelector<HTMLElement>("#items");
		const slot = this.#shadow.querySelector<HTMLSlotElement>("slot");

		if (!items || !slot) throw new Error("Invalid masonry template");

		this.#items = items;
		this.#slot = slot;
		this.#resizeObserver = new ResizeObserver(() => this.#scheduleLayout());
	}

	static get observedAttributes() {
		return ["sm", "md", "lg"];
	}

	connectedCallback() {
		this.#syncAttributes();
		this.#slot.addEventListener("slotchange", this.#observeItems);
		this.#observeItems();
	}

	disconnectedCallback() {
		this.#slot.removeEventListener("slotchange", this.#observeItems);
		this.#resizeObserver.disconnect();

		if (this.#animationFrame !== undefined) {
			cancelAnimationFrame(this.#animationFrame);
			this.#animationFrame = undefined;
		}
	}

	attributeChangedCallback() {
		this.#syncAttributes();
	}

	#syncAttributes() {
		this.style.setProperty("--masonry-sm", String(this.#parseColumnCount(this.getAttribute("sm"), 1)));

		this.style.setProperty("--masonry-md", String(this.#parseColumnCount(this.getAttribute("md"), 2)));

		this.style.setProperty("--masonry-lg", String(this.#parseColumnCount(this.getAttribute("lg"), 3)));
	}

	#observeItems = () => {
		this.#resizeObserver.disconnect();

		for (const item of this.#slot.assignedElements()) {
			this.#resizeObserver.observe(item);
		}

		this.#scheduleLayout();
	};

	#scheduleLayout() {
		if (this.#animationFrame !== undefined) return;

		this.#animationFrame = requestAnimationFrame(() => {
			this.#animationFrame = undefined;
			const styles = getComputedStyle(this.#items);
			const rowHeight = Number.parseFloat(styles.gridAutoRows);
			const rowGap = Number.parseFloat(styles.rowGap);

			for (const item of this.#slot.assignedElements() as HTMLElement[]) {
				const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
				item.style.gridRowEnd = `span ${rowSpan}`;
			}

			this.dataset.layoutReady = "";
		});
	}

	#parseColumnCount(value: string | null, fallback: number) {
		const parsed = Number.parseInt(value ?? "", 10);

		if (!Number.isFinite(parsed) || parsed < 1) {
			return fallback;
		}

		return parsed;
	}
}

if (!customElements.get("masonry-grid")) {
	customElements.define("masonry-grid", MasonryComponent);
}
