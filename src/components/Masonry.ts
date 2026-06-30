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
		column-count: var(--masonry-lg);
		column-gap: var(--column-gap);
	}

	@container (width <= 1080px) {
		#items {
			column-count: var(--masonry-md);
		}
	}

	@container (width <= 660px) {
		#items {
			column-count: var(--masonry-sm);
		}
	}

	slot {
		display: contents;
	}

	::slotted(*) {
		display: block;
		break-inside: avoid;
		page-break-inside: avoid;
		-webkit-column-break-inside: avoid;
		margin-block-end: var(--row-gap);
	}
</style>

<div id="items" part="grid">
	<slot></slot>
</div>
`;

class MasonryComponent extends HTMLElement {
	#shadow: ShadowRoot;

	constructor() {
		super();

		this.#shadow = this.attachShadow({ mode: "open" });

		const template = document.createElement("template");
		template.innerHTML = TEMPLATE_STRING;

		this.#shadow.appendChild(template.content.cloneNode(true));
	}

	static get observedAttributes() {
		return ["sm", "md", "lg"];
	}

	connectedCallback() {
		this.#syncAttributes();
	}

	attributeChangedCallback() {
		this.#syncAttributes();
	}

	#syncAttributes() {
		this.style.setProperty("--masonry-sm", String(this.#parseColumnCount(this.getAttribute("sm"), 1)));

		this.style.setProperty("--masonry-md", String(this.#parseColumnCount(this.getAttribute("md"), 2)));

		this.style.setProperty("--masonry-lg", String(this.#parseColumnCount(this.getAttribute("lg"), 3)));
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
