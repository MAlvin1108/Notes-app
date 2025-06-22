class NotesForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("#notes")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const title = this.shadowRoot
          .querySelector("#notesFormTitle")
          .value.trim();
        const body = this.shadowRoot
          .querySelector("#notesFormBody")
          .value.trim();

        if (title && body) {
          this.dispatchEvent(
            new CustomEvent("add-note", {
              detail: { title, body },
              bubbles: true,
              composed: true, // Pastikan event bisa dikirim ke DOM utama
            }),
          );
          this.shadowRoot.querySelector("#notes").reset();
        } else {
          alert("Harap isi semua bidang!");
        }
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .form {
                    background-color: var(--secondary-color);
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 500px;
                    display: grid;
                    gap: 15px;
                    margin: 0 auto;
                }

                .form-group {
                    display: grid;
                    gap: 8px;
                }

                .form-group label {
                    font-size: 14px;
                    font-weight: bold;
                    color: var(--third-color);
                }

                .form-group input, .form-group textarea {
                    width: 90%;
                    padding: 10px;
                    border: 1px solid var(--third-color);
                    border-radius: 5px;
                    font-size: 14px;
                    background-color: white;
                    color: var(--third-color);
                    outline: none;
                }

                textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                .form-action {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                #addNotes {
                    background-color: var(--wrapper-color);
                    color: white;
                    border: none;
                    padding: 12px 18px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: background 0.3s;
                    width: 100%;
                    max-width: 200px;
                    text-align: center;
                }

                #addNotes:hover {
                    background-color: #d8431f;
                }

                @media (max-width: 600px) {
                    .form {
                        width: 100%;
                        max-width: 100%;
                        padding: 20px;
                    }

                    .form-action {
                        justify-content: center;
                    }

                    #addNotes {
                        width: 100%;
                        text-align: center;
                    }
                }
            </style>
            <form class="form" id="notes">
                <div class="form-group">
                    <label for="notesFormTitle">Judul</label>
                    <input type="text" id="notesFormTitle" placeholder="Masukkan judul" required>
                </div>
                <div class="form-group">
                    <label for="notesFormBody">Isi Catatan</label>
                    <textarea id="notesFormBody" placeholder="Masukkan isi catatan" required></textarea>
                </div>
                <div class="form-action">
                    <button id="addNotes" type="submit">Tambah Catatan</button>
                </div>
            </form>
        `;
  }
}

customElements.define("notes-form", NotesForm);
