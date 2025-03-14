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
    --breakpoint-sm: 660;
    --breakpoint-md: 1080;
    --column-gap: 1rem;
  }

  #grid {
    gap: var(--column-gap);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  #grid > div {
    flex: 1;
    break-inside: avoid;
  }

  #items {
    opacity: 0;
    position: absolute;
    top: 10000px;
    left: 10000px;
  }
</style>
<div id="items">
  <slot></slot>
</div>
<div id="grid" part="grid"></div>
`;

class MasonryComponent extends HTMLElement {
	#shadow: ShadowRoot;
	#resizeObserver: ResizeObserver | null = null;
	#columns = 0;
	#grid: HTMLDivElement;

	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: "open" });

		const template = document.createElement("template");
		template.innerHTML = TEMPLATE_STRING;

		this.#shadow.appendChild(template.content.cloneNode(true));
		if (!this.shadowRoot) throw new Error("Shadow root not found");
		const grid = this.shadowRoot.querySelector<HTMLDivElement>("#grid");
		if (!grid) throw new Error("Grid not found");
		this.#grid = grid;
	}

	connectedCallback() {
		this.renderColumns();
		this.#resizeObserver = new ResizeObserver(() => {
			this.renderColumns();
		});
		this.#resizeObserver.observe(this);
	}

	disconnectedCallback() {
		this.#resizeObserver?.disconnect();
	}

	static get observedAttributes() {
		return ["sm", "md", "lg"];
	}

	attributeChangedCallback() {
		this.renderColumns();
	}

	renderColumns() {
		const width = this.clientWidth;
		let numColumns: number;

		const sm = Number.parseInt(getComputedStyle(this).getPropertyValue("--breakpoint-sm"));
		const md = Number.parseInt(getComputedStyle(this).getPropertyValue("--breakpoint-md"));

		if (width <= sm) {
			numColumns = Number.parseInt(this.getAttribute("sm") || "1");
		} else if (width <= md) {
			numColumns = Number.parseInt(this.getAttribute("md") || "2");
		} else {
			numColumns = Number.parseInt(this.getAttribute("lg") || "3");
		}

		if (numColumns === this.#columns) return;

		// remove existing columns
		while (this.#grid.firstChild) {
			this.#grid.removeChild(this.#grid.firstChild);
		}

		for (let i = 0; i < numColumns; i++) {
			const columnDiv = document.createElement("div");
			const columnSlot = document.createElement("slot");
			columnSlot.name = `column-${i}`;
			columnDiv.append(columnSlot);
			this.#grid.appendChild(columnDiv);
		}
		this.#columns = numColumns;
		this.renderItems();
	}

	renderItems() {
		const children = Array.from(this.children);

		for (const [i, child] of children.entries()) {
			const columnIndex = i % this.#columns;
			const column = `column-${columnIndex}`;
			if (child.slot !== column) child.slot = column;
		}
	}
}

customElements.define("masonry-grid", MasonryComponent);
