import "./components/app-header.js";
import "./components/notes-form.js";
import "./components/notes-container.js";
import "./style/styling.css";
import "./components/loading-spinner.js";

document.addEventListener("DOMContentLoaded", () => {
  let savedNotes = [];

  const loadingElement = document.createElement("loading-spinner");
  document.body.appendChild(loadingElement);

  async function fetchNotesFromAPI() {
    showLoading(); // Tampilkan loading

    try {
      // Simulasi delay loading)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
      const data = await response.json();

      if (response.ok) {
        savedNotes = data.data;
        displayNotes();
      } else {
        console.error("Gagal mengambil notes:", data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil catatan:", error);
    } finally {
      hideLoading(); // Sembunyikan loading setelah selesai
    }
  }

  function showLoading() {
    loadingElement.style.display = "block";
  }

  function hideLoading() {
    loadingElement.style.display = "none";
  }

  function displayNotes(filteredNotes = savedNotes) {
    const notesContainer = document.querySelector("notes-container");
    if (notesContainer) {
      notesContainer.displayNotes(filteredNotes);
    } else {
      console.error("Error: notes-container tidak ditemukan!");
    }
  }

  document.addEventListener("add-note", async (event) => {
    const { title, body } = event.detail;

    if (!title.trim() || !body.trim()) {
      alert("Judul dan isi catatan tidak boleh kosong.");
      return;
    }

    showLoading(); // Tampilkan loading saat submit

    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      const result = await response.json();

      if (response.ok) {
        fetchNotesFromAPI(); // Refresh daftar catatan dari server
      } else {
        alert("Gagal menambahkan catatan: " + result.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan catatan.");
      console.error(error);
    } finally {
      hideLoading();
    }
  });

  document.addEventListener("delete-note", async (event) => {
    const noteId = event.detail;

    showLoading();

    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (response.ok) {
        fetchNotesFromAPI(); // Refresh daftar catatan setelah hapus
      } else {
        alert("Gagal menghapus catatan: " + result.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus catatan.");
      console.error(error);
    } finally {
      hideLoading();
    }
  });

  document
    .querySelector("notes-container")
    .addEventListener("toggle-archive", async (event) => {
      const { note_id, archived } = event.detail;
      const url = `https://notes-api.dicoding.dev/v2/notes/${note_id}/${archived}`;
      showLoading();

      try {
        await fetch(url, { method: "POST" });
        await fetchNotesFromAPI(); //
      } catch (error) {
        alert("Gagal mengubah status arsip.");
        console.error(error);
      } finally {
        hideLoading();
      }
    });

  document
    .querySelector("notes-container")
    .addEventListener("toggle-unarchive", async (event) => {
      const { note_id, unarchived } = event.detail;
      const url = `https://notes-api.dicoding.dev/v2/notes/${note_id}/${unarchived}`;
      showLoading();

      try {
        await fetch(url, { method: "POST" });
        await fetchNotesFromAPI(); //
      } catch (error) {
        alert("Gagal mengubah status unarsip.");
        console.error(error);
      } finally {
        hideLoading();
      }
    });

  document.addEventListener("search-note", (event) => {
    const searchDate = event.detail;
    if (searchDate) {
      const filteredNotes = savedNotes.filter(
        (note) =>
          new Date(note.createdAt).toISOString().split("T")[0] === searchDate,
      );
      displayNotes(filteredNotes);
    } else {
      displayNotes();
    }
  });

  fetchNotesFromAPI(); // Initial fetch
});
