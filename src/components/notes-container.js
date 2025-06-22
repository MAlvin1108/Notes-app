class NotesContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [];
  }

  connectedCallback() {
    this.render();

    document.addEventListener("search-note", (event) => {
      const searchDate = event.detail;
      if (searchDate) {
        const filteredNotes = this.notes.filter(
          (note) =>
            new Date(note.createdAt).toISOString().split("T")[0] === searchDate,
        );
        this.displayNotes(filteredNotes);
      } else {
        this.displayNotes(this.notes);
      }
    });
  }

  set notesList(data) {
    this.notes = data;
    this.displayNotes(data);
  }

  displayNotes(notes) {
    const container = this.shadowRoot.querySelector(".notes-container");
    if (!container) return;

    container.innerHTML = "";

    if (!notes || notes.length === 0) {
      container.innerHTML = `<p style="color: var(--third-color); font-style: italic;">Tidak ada catatan.</p>`;
      return;
    }

    notes.forEach((note) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");
      noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <p><strong>Tanggal:</strong> ${new Date(note.createdAt).toLocaleDateString()}</p>
                <div class="action-buttons">
                    <button class="delete-btn" data-id="${note.id}" title="Hapus">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1.5 14.5c-.1.8-.8 1.5-1.6 1.5H8.1c-.8 0-1.5-.7-1.6-1.5L5 6m5 0V4c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2" />
                        </svg>
                    </button>
                    <button class="archive-btn" data-id="${note.id}" title="${note.archived ? "Kembalikan Catatan" : "Arsipkan Catatan"}">
                        ${
                          note.archived
                            ? `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                 <polyline points="17 8 12 3 7 8" />
                                 <line x1="12" y1="3" x2="12" y2="15" />
                               </svg>`
                            : `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                 <rect x="3" y="3" width="18" height="4" />
                                 <path d="M21 7v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" />
                                 <polyline points="9 10 12 13 15 10" />
                               </svg>`
                        }
                    </button>
                </div>
            `;

      // Event hapus
      noteCard.querySelector(".delete-btn").addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("delete-note", {
            detail: note.id,
            bubbles: true,
            composed: true,
          }),
        );
      });

      // Event arsip / unarsip
      noteCard.querySelector(".archive-btn").addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("toggle-archive", {
            detail: { id: note.id, archived: note.archived },
            bubbles: true,
            composed: true,
          }),
        );
      });

      container.appendChild(noteCard);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .notes-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 15px;
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .note-card {
                    background-color: var(--secondary-color);
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                }

                .note-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
                }

                .note-card h3 {
                    color: var(--third-color);
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .note-card p {
                    font-size: 14px;
                    color: var(--third-color);
                }

                .action-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                }

                .delete-btn {
                    background-color: red;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background 0.3s;
                
                } 
                
                .archive-btn {
                    background-color: green;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background 0.3s;
                }

                .delete-btn:hover,
                .archive-btn:hover {
                    background-color: #d8431f;
                }

                @media (max-width: 768px) {
                    .notes-container {
                        grid-template-columns: repeat(auto-fit, minmax(200px, 3fr));
                        padding: 10px;
                    }

                    .note-card {
                        padding: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .notes-container {
                        grid-template-columns: 1fr;
                        padding: 5px;
                    }
                }
            </style>
            <div class="notes-container"></div>
        `;
  }
}

customElements.define("notes-container", NotesContainer);
