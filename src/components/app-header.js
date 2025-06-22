class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector(".btn-search")
      .addEventListener("click", () => {
        const searchDate = this.shadowRoot
          .querySelector("#searchByDate")
          .value.trim();
        this.dispatchEvent(
          new CustomEvent("search-note", { detail: searchDate, bubbles: true }),
        );
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: var(--primary-color);
                    padding: 10px 20px;
                    display: flex;
                    flex-direction: column; /* Change to column for better responsiveness */
                    align-items: center;
                    max-width:1000vh
                }
                .wrapper-header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                @media (max-width: 600px) {
                    .wrapper-header {
                        flex-direction: column; /* Stack elements on smaller screens */
                        align-items: flex-start; /* Align items to the start */
                        display: inline-block;
                    }
                    .title {
                        margin-bottom: 10px; /* Add space below title */
                    }
                }

                .wrapper-header {
                    display: flex;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    align-items: center;
                }
                .title {
                    color: var(--secondary-color);
                    font-size: 24px;
                    font-weight: bold;
                }
                .wrapper-list {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                #searchByDate {
                    padding: 8px 12px;
                    border: 1px solid var(--third-color);
                    border-radius: 5px;
                    font-size: 14px;
                    background-color: var(--secondary-color);
                    color: var(--third-color);
                }
                .btn-search {
                    background-color: var(--wrapper-color);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 5px;
                }
            </style>
            <header>
                <div class="wrapper-header">
                    <h1 class="title">My Notes-App</h1>
                    <nav>
                        <ul>
                            <li class="wrapper-list">
                                <input type="date" id="searchByDate" placeholder="search">
                                <button class="btn-search" type="button">Search</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
  }
}

customElements.define("app-header", AppHeader);
