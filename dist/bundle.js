(() => {
  var n = {
      56: (n, e, t) => {
        "use strict";
        n.exports = function (n) {
          var e = t.nc;
          e && n.setAttribute("nonce", e);
        };
      },
      72: (n) => {
        "use strict";
        var e = [];
        function t(n) {
          for (var t = -1, o = 0; o < e.length; o++)
            if (e[o].identifier === n) {
              t = o;
              break;
            }
          return t;
        }
        function o(n, o) {
          for (var a = {}, i = [], s = 0; s < n.length; s++) {
            var d = n[s],
              c = o.base ? d[0] + o.base : d[0],
              l = a[c] || 0,
              p = "".concat(c, " ").concat(l);
            a[c] = l + 1;
            var u = t(p),
              h = {
                css: d[1],
                media: d[2],
                sourceMap: d[3],
                supports: d[4],
                layer: d[5],
              };
            if (-1 !== u) e[u].references++, e[u].updater(h);
            else {
              var m = r(h, o);
              (o.byIndex = s),
                e.splice(s, 0, { identifier: p, updater: m, references: 1 });
            }
            i.push(p);
          }
          return i;
        }
        function r(n, e) {
          var t = e.domAPI(e);
          return (
            t.update(n),
            function (e) {
              if (e) {
                if (
                  e.css === n.css &&
                  e.media === n.media &&
                  e.sourceMap === n.sourceMap &&
                  e.supports === n.supports &&
                  e.layer === n.layer
                )
                  return;
                t.update((n = e));
              } else t.remove();
            }
          );
        }
        n.exports = function (n, r) {
          var a = o((n = n || []), (r = r || {}));
          return function (n) {
            n = n || [];
            for (var i = 0; i < a.length; i++) {
              var s = t(a[i]);
              e[s].references--;
            }
            for (var d = o(n, r), c = 0; c < a.length; c++) {
              var l = t(a[c]);
              0 === e[l].references && (e[l].updater(), e.splice(l, 1));
            }
            a = d;
          };
        };
      },
      113: (n) => {
        "use strict";
        n.exports = function (n, e) {
          if (e.styleSheet) e.styleSheet.cssText = n;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(n));
          }
        };
      },
      217: () => {
        class n extends HTMLElement {
          constructor() {
            super(),
              this.attachShadow({ mode: "open" }),
              (this.shadowRoot.innerHTML =
                '\n            <style>\n                .spinner {\n                    border: 4px solid #f3f3f3;\n                    border-top: 4px solid #3498db;\n                    border-radius: 50%;\n                    width: 40px;\n                    height: 40px;\n                    animation: spin 1s linear infinite;\n                    margin: 20px auto;\n                }\n                @keyframes spin {\n                    0% { transform: rotate(0deg); }\n                    100% { transform: rotate(360deg); }\n                }\n            </style>\n            <div class="spinner"></div>\n        ');
          }
        }
        customElements.define("loading-spinner", n);
      },
      314: (n) => {
        "use strict";
        n.exports = function (n) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var t = "",
                  o = void 0 !== e[5];
                return (
                  e[4] && (t += "@supports (".concat(e[4], ") {")),
                  e[2] && (t += "@media ".concat(e[2], " {")),
                  o &&
                    (t += "@layer".concat(
                      e[5].length > 0 ? " ".concat(e[5]) : "",
                      " {",
                    )),
                  (t += n(e)),
                  o && (t += "}"),
                  e[2] && (t += "}"),
                  e[4] && (t += "}"),
                  t
                );
              }).join("");
            }),
            (e.i = function (n, t, o, r, a) {
              "string" == typeof n && (n = [[null, n, void 0]]);
              var i = {};
              if (o)
                for (var s = 0; s < this.length; s++) {
                  var d = this[s][0];
                  null != d && (i[d] = !0);
                }
              for (var c = 0; c < n.length; c++) {
                var l = [].concat(n[c]);
                (o && i[l[0]]) ||
                  (void 0 !== a &&
                    (void 0 === l[5] ||
                      (l[1] = "@layer"
                        .concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {")
                        .concat(l[1], "}")),
                    (l[5] = a)),
                  t &&
                    (l[2]
                      ? ((l[1] = "@media "
                          .concat(l[2], " {")
                          .concat(l[1], "}")),
                        (l[2] = t))
                      : (l[2] = t)),
                  r &&
                    (l[4]
                      ? ((l[1] = "@supports ("
                          .concat(l[4], ") {")
                          .concat(l[1], "}")),
                        (l[4] = r))
                      : (l[4] = "".concat(r))),
                  e.push(l));
              }
            }),
            e
          );
        };
      },
      430: () => {
        class n extends HTMLElement {
          constructor() {
            super(), this.attachShadow({ mode: "open" });
          }
          connectedCallback() {
            this.render(),
              this.shadowRoot
                .querySelector(".btn-search")
                .addEventListener("click", () => {
                  const n = this.shadowRoot
                    .querySelector("#searchByDate")
                    .value.trim();
                  this.dispatchEvent(
                    new CustomEvent("search-note", { detail: n, bubbles: !0 }),
                  );
                });
          }
          render() {
            this.shadowRoot.innerHTML =
              '\n            <style>\n                header {\n                    background-color: var(--primary-color);\n                    padding: 10px 20px;\n                    display: flex;\n                    flex-direction: column; /* Change to column for better responsiveness */\n                    align-items: center;\n                    max-width:1000vh\n                }\n                .wrapper-header {\n                    width: 100%;\n                    display: flex;\n                    justify-content: space-between;\n                    align-items: center;\n                }\n                @media (max-width: 600px) {\n                    .wrapper-header {\n                        flex-direction: column; /* Stack elements on smaller screens */\n                        align-items: flex-start; /* Align items to the start */\n                        display: inline-block;\n                    }\n                    .title {\n                        margin-bottom: 10px; /* Add space below title */\n                    }\n                }\n\n                .wrapper-header {\n                    display: flex;\n                    width: 100%;\n                    max-width: 1200px;\n                    margin: 0 auto;\n                    align-items: center;\n                }\n                .title {\n                    color: var(--secondary-color);\n                    font-size: 24px;\n                    font-weight: bold;\n                }\n                .wrapper-list {\n                    display: flex;\n                    align-items: center;\n                    gap: 10px;\n                }\n                #searchByDate {\n                    padding: 8px 12px;\n                    border: 1px solid var(--third-color);\n                    border-radius: 5px;\n                    font-size: 14px;\n                    background-color: var(--secondary-color);\n                    color: var(--third-color);\n                }\n                .btn-search {\n                    background-color: var(--wrapper-color);\n                    color: white;\n                    border: none;\n                    padding: 8px 16px;\n                    font-size: 14px;\n                    cursor: pointer;\n                    border-radius: 5px;\n                }\n            </style>\n            <header>\n                <div class="wrapper-header">\n                    <h1 class="title">My Notes-App</h1>\n                    <nav>\n                        <ul>\n                            <li class="wrapper-list">\n                                <input type="date" id="searchByDate" placeholder="search">\n                                <button class="btn-search" type="button">Search</button>\n                            </li>\n                        </ul>\n                    </nav>\n                </div>\n            </header>\n        ';
          }
        }
        customElements.define("app-header", n);
      },
      540: (n) => {
        "use strict";
        n.exports = function (n) {
          var e = document.createElement("style");
          return n.setAttributes(e, n.attributes), n.insert(e, n.options), e;
        };
      },
      601: (n) => {
        "use strict";
        n.exports = function (n) {
          return n[1];
        };
      },
      659: (n) => {
        "use strict";
        var e = {};
        n.exports = function (n, t) {
          var o = (function (n) {
            if (void 0 === e[n]) {
              var t = document.querySelector(n);
              if (
                window.HTMLIFrameElement &&
                t instanceof window.HTMLIFrameElement
              )
                try {
                  t = t.contentDocument.head;
                } catch (n) {
                  t = null;
                }
              e[n] = t;
            }
            return e[n];
          })(n);
          if (!o)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          o.appendChild(t);
        };
      },
      714: () => {
        class n extends HTMLElement {
          constructor() {
            super(), this.attachShadow({ mode: "open" }), (this.notes = []);
          }
          connectedCallback() {
            this.render(),
              document.addEventListener("search-note", (n) => {
                const e = n.detail;
                if (e) {
                  const n = this.notes.filter(
                    (n) =>
                      new Date(n.createdAt).toISOString().split("T")[0] === e,
                  );
                  this.displayNotes(n);
                } else this.displayNotes(this.notes);
              });
          }
          set notesList(n) {
            (this.notes = n), this.displayNotes(n);
          }
          displayNotes(n) {
            const e = this.shadowRoot.querySelector(".notes-container");
            e &&
              ((e.innerHTML = ""),
              n && 0 !== n.length
                ? n.forEach((n) => {
                    const t = document.createElement("div");
                    t.classList.add("note-card"),
                      (t.innerHTML = `\n                <h3>${n.title}</h3>\n                <p>${n.body}</p>\n                <p><strong>Tanggal:</strong> ${new Date(n.createdAt).toLocaleDateString()}</p>\n                <div class="action-buttons">\n                    <button class="delete-btn" data-id="${n.id}">Hapus</button>\n                    <button class="archive-btn" data-id="${n.id}">\n                        ${n.archived ? "Kembalikan" : "Arsipkan"}\n                    </button>\n                </div>\n            `),
                      t
                        .querySelector(".delete-btn")
                        .addEventListener("click", () => {
                          this.dispatchEvent(
                            new CustomEvent("delete-note", {
                              detail: n.id,
                              bubbles: !0,
                              composed: !0,
                            }),
                          );
                        }),
                      t
                        .querySelector(".archive-btn")
                        .addEventListener("click", () => {
                          this.dispatchEvent(
                            new CustomEvent("toggle-archive", {
                              detail: { id: n.id, archived: n.archived },
                              bubbles: !0,
                              composed: !0,
                            }),
                          );
                        }),
                      e.appendChild(t);
                  })
                : (e.innerHTML =
                    '<p style="color: var(--third-color); font-style: italic;">Tidak ada catatan.</p>'));
          }
          render() {
            this.shadowRoot.innerHTML =
              '\n            <style>\n                .notes-container {\n                    display: grid;\n                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n                    gap: 15px;\n                    padding: 20px;\n                    max-width: 1200px;\n                    margin: 0 auto;\n                }\n\n                .note-card {\n                    background-color: var(--secondary-color);\n                    padding: 15px;\n                    border-radius: 10px;\n                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n                    text-align: left;\n                    display: flex;\n                    flex-direction: column;\n                    gap: 10px;\n                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n                }\n\n                .note-card:hover {\n                    transform: translateY(-5px);\n                    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);\n                }\n\n                .note-card h3 {\n                    color: var(--third-color);\n                    font-size: 18px;\n                    font-weight: bold;\n                    margin-bottom: 5px;\n                }\n\n                .note-card p {\n                    font-size: 14px;\n                    color: var(--third-color);\n                }\n\n                .action-buttons {\n                    display: flex;\n                    justify-content: flex-end;\n                    gap: 10px;\n                }\n\n                .delete-btn,\n                .archive-btn {\n                    background-color: var(--wrapper-color);\n                    color: white;\n                    border: none;\n                    padding: 8px 12px;\n                    font-size: 14px;\n                    cursor: pointer;\n                    border-radius: 5px;\n                    transition: background 0.3s;\n                }\n\n                .delete-btn:hover,\n                .archive-btn:hover {\n                    background-color: #d8431f;\n                }\n\n                @media (max-width: 768px) {\n                    .notes-container {\n                        grid-template-columns: repeat(auto-fit, minmax(200px, 3fr));\n                        padding: 10px;\n                    }\n\n                    .note-card {\n                        padding: 12px;\n                    }\n                }\n\n                @media (max-width: 480px) {\n                    .notes-container {\n                        grid-template-columns: 1fr;\n                        padding: 5px;\n                    }\n                }\n            </style>\n            <div class="notes-container"></div>\n        ';
          }
        }
        customElements.define("notes-container", n);
      },
      755: (n, e, t) => {
        "use strict";
        t.d(e, { A: () => s });
        var o = t(601),
          r = t.n(o),
          a = t(314),
          i = t.n(a)()(r());
        i.push([
          n.id,
          ":root {\n    --primary-color: #57B4BA;\n    --secondary-color:  #FDFBEE;\n    --third-color: #015551;\n    --wrapper-color: #FE4F2D;\n}\n\n*,\n*::before,\n*::after {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n\nheader {\n    background-color: var(--primary-color);\n    padding: 10px 20px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.wrapper-header {\n    display: flex;\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    align-items: center;\n}\n\n.title {\n    color: var(--secondary-color);\n    font-size: 24px;\n    font-weight: bold;\n    margin-right: auto;\n}\n\nnav ul {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\nli {\n    list-style-type: none;\n}\n\n.wrapper-list {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n/* Input Date */\n#searchByDate {\n    padding: 8px 12px;\n    border: 1px solid var(--third-color);\n    border-radius: 5px;\n    font-size: 14px;\n    background-color: var(--secondary-color);\n    color: var(--third-color);\n}\n\n/* Tombol Search */\n.btn-search {\n    background-color: var(--wrapper-color);\n    color: white;\n    border: none;\n    padding: 8px 16px;\n    font-size: 14px;\n    cursor: pointer;\n    border-radius: 5px;\n    transition: background 0.3s;\n}\n\n/* Hover Effect */\n.btn-search:hover {\n    background-color: #d8431f;\n}\n\n/* SECTION WRAPPER */\n.notes-section {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 20px;\n    padding: 20px;\n}\n\n/* FORM STYLING */\n.form {\n    background-color: var(--secondary-color);\n    padding: 20px;\n    border-radius: 10px;\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n    width: 100%;\n    max-width: 450px;\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 15px;\n}\n\n/* FORM GROUP */\n.form-group {\n    display: grid;\n    gap: 5px;\n}\n\n.form-group label {\n    font-size: 14px;\n    font-weight: bold;\n    color: var(--third-color);\n}\n\n/* INPUT STYLING */\n.form-group input {\n    width: 100%;\n    padding: 10px;\n    border: 1px solid var(--third-color);\n    border-radius: 5px;\n    font-size: 14px;\n    background-color: white;\n    color: var(--third-color);\n    outline: none;\n}\n\n/* BUTTON WRAPPER */\n.form-action {\n    display: flex;\n    justify-content: flex-end;\n}\n\n/* BUTTON STYLING */\n#addNotes {\n    background-color: var(--wrapper-color);\n    color: white;\n    border: none;\n    padding: 10px 15px;\n    font-size: 16px;\n    cursor: pointer;\n    border-radius: 5px;\n    transition: background 0.3s;\n    -webkit-transition: background 0.3s;\n    -moz-transition: background 0.3s;\n    -ms-transition: background 0.3s;\n    -o-transition: background 0.3s;\n}\n\n/* HOVER EFFECT */\n#addNotes:hover {\n    background-color: #d8431f;\n}\n\n/* RESPONSIVE DESIGN */\n@media (max-width: 600px) {\n    .form {\n        width: 100%;\n        max-width: 100%;\n        padding: 15px;\n    }\n\n    .form-action {\n        justify-content: center;\n    }\n\n    #addNotes {\n        width: 100%;\n        text-align: cente;\n    }\n}\n\n\n/* Responsive Design */\n@media (max-width: 600px) {\n    header {\n        flex-direction: column;\n        text-align: center;\n    }\n\n    .wrapper-header {\n        flex-direction: column;\n        gap: 10px;\n    }\n\n    nav ul {\n        justify-content: center;\n    }\n}\n",
          "",
        ]);
        const s = i;
      },
      825: (n) => {
        "use strict";
        n.exports = function (n) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = n.insertStyleElement(n);
          return {
            update: function (t) {
              !(function (n, e, t) {
                var o = "";
                t.supports && (o += "@supports (".concat(t.supports, ") {")),
                  t.media && (o += "@media ".concat(t.media, " {"));
                var r = void 0 !== t.layer;
                r &&
                  (o += "@layer".concat(
                    t.layer.length > 0 ? " ".concat(t.layer) : "",
                    " {",
                  )),
                  (o += t.css),
                  r && (o += "}"),
                  t.media && (o += "}"),
                  t.supports && (o += "}");
                var a = t.sourceMap;
                a &&
                  "undefined" != typeof btoa &&
                  (o +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                      " */",
                    )),
                  e.styleTagTransform(o, n, e.options);
              })(e, n, t);
            },
            remove: function () {
              !(function (n) {
                if (null === n.parentNode) return !1;
                n.parentNode.removeChild(n);
              })(e);
            },
          };
        };
      },
      947: () => {
        class n extends HTMLElement {
          constructor() {
            super(), this.attachShadow({ mode: "open" });
          }
          connectedCallback() {
            this.render(),
              this.shadowRoot
                .querySelector("#notes")
                .addEventListener("submit", (n) => {
                  n.preventDefault();
                  const e = this.shadowRoot
                      .querySelector("#notesFormTitle")
                      .value.trim(),
                    t = this.shadowRoot
                      .querySelector("#notesFormBody")
                      .value.trim();
                  e && t
                    ? (this.dispatchEvent(
                        new CustomEvent("add-note", {
                          detail: { title: e, body: t },
                          bubbles: !0,
                          composed: !0,
                        }),
                      ),
                      this.shadowRoot.querySelector("#notes").reset())
                    : alert("Harap isi semua bidang!");
                });
          }
          render() {
            this.shadowRoot.innerHTML =
              '\n            <style>\n                .form {\n                    background-color: var(--secondary-color);\n                    padding: 25px;\n                    border-radius: 10px;\n                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);\n                    width: 100%;\n                    max-width: 500px;\n                    display: grid;\n                    gap: 15px;\n                    margin: 0 auto;\n                }\n\n                .form-group {\n                    display: grid;\n                    gap: 8px;\n                }\n\n                .form-group label {\n                    font-size: 14px;\n                    font-weight: bold;\n                    color: var(--third-color);\n                }\n\n                .form-group input, .form-group textarea {\n                    width: 90%;\n                    padding: 10px;\n                    border: 1px solid var(--third-color);\n                    border-radius: 5px;\n                    font-size: 14px;\n                    background-color: white;\n                    color: var(--third-color);\n                    outline: none;\n                }\n\n                textarea {\n                    resize: vertical;\n                    min-height: 100px;\n                }\n\n                .form-action {\n                    display: flex;\n                    justify-content: center;\n                    width: 100%;\n                }\n\n                #addNotes {\n                    background-color: var(--wrapper-color);\n                    color: white;\n                    border: none;\n                    padding: 12px 18px;\n                    font-size: 16px;\n                    cursor: pointer;\n                    border-radius: 8px;\n                    transition: background 0.3s;\n                    width: 100%;\n                    max-width: 200px;\n                    text-align: center;\n                }\n\n                #addNotes:hover {\n                    background-color: #d8431f;\n                }\n\n                @media (max-width: 600px) {\n                    .form {\n                        width: 100%;\n                        max-width: 100%;\n                        padding: 20px;\n                    }\n\n                    .form-action {\n                        justify-content: center;\n                    }\n\n                    #addNotes {\n                        width: 100%;\n                        text-align: center;\n                    }\n                }\n            </style>\n            <form class="form" id="notes">\n                <div class="form-group">\n                    <label for="notesFormTitle">Judul</label>\n                    <input type="text" id="notesFormTitle" placeholder="Masukkan judul" required>\n                </div>\n                <div class="form-group">\n                    <label for="notesFormBody">Isi Catatan</label>\n                    <textarea id="notesFormBody" placeholder="Masukkan isi catatan" required></textarea>\n                </div>\n                <div class="form-action">\n                    <button id="addNotes" type="submit">Tambah Catatan</button>\n                </div>\n            </form>\n        ';
          }
        }
        customElements.define("notes-form", n);
      },
    },
    e = {};
  function t(o) {
    var r = e[o];
    if (void 0 !== r) return r.exports;
    var a = (e[o] = { id: o, exports: {} });
    return n[o](a, a.exports, t), a.exports;
  }
  (t.n = (n) => {
    var e = n && n.__esModule ? () => n.default : () => n;
    return t.d(e, { a: e }), e;
  }),
    (t.d = (n, e) => {
      for (var o in e)
        t.o(e, o) &&
          !t.o(n, o) &&
          Object.defineProperty(n, o, { enumerable: !0, get: e[o] });
    }),
    (t.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e)),
    (t.nc = void 0),
    (() => {
      "use strict";
      t(430), t(947), t(714);
      var n = t(72),
        e = t.n(n),
        o = t(825),
        r = t.n(o),
        a = t(659),
        i = t.n(a),
        s = t(56),
        d = t.n(s),
        c = t(540),
        l = t.n(c),
        p = t(113),
        u = t.n(p),
        h = t(755),
        m = {};
      (m.styleTagTransform = u()),
        (m.setAttributes = d()),
        (m.insert = i().bind(null, "head")),
        (m.domAPI = r()),
        (m.insertStyleElement = l()),
        e()(h.A, m),
        h.A && h.A.locals && h.A.locals,
        t(217),
        document.addEventListener("DOMContentLoaded", () => {
          let n = [];
          const e = document.createElement("loading-spinner");
          async function t() {
            o();
            try {
              await new Promise((n) => setTimeout(n, 2e3));
              const e = await fetch("https://notes-api.dicoding.dev/v2/notes"),
                t = await e.json();
              e.ok
                ? ((n = t.data), a())
                : console.error("Gagal mengambil notes:", t.message);
            } catch (n) {
              console.error("Terjadi kesalahan saat mengambil catatan:", n);
            } finally {
              r();
            }
          }
          function o() {
            e.style.display = "block";
          }
          function r() {
            e.style.display = "none";
          }
          function a(e = n) {
            const t = document.querySelector("notes-container");
            t
              ? t.displayNotes(e)
              : console.error("Error: notes-container tidak ditemukan!");
          }
          document.body.appendChild(e),
            document.addEventListener("add-note", async (n) => {
              const { title: e, body: a } = n.detail;
              if (e.trim() && a.trim()) {
                o();
                try {
                  const n = await fetch(
                      "https://notes-api.dicoding.dev/v2/notes",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: e, body: a }),
                      },
                    ),
                    o = await n.json();
                  n.ok ? t() : alert("Gagal menambahkan catatan: " + o.message);
                } catch (n) {
                  alert("Terjadi kesalahan saat menambahkan catatan."),
                    console.error(n);
                } finally {
                  r();
                }
              } else alert("Judul dan isi catatan tidak boleh kosong.");
            }),
            document.addEventListener("delete-note", async (n) => {
              const e = n.detail;
              o();
              try {
                const n = await fetch(
                    `https://notes-api.dicoding.dev/v2/notes/${e}`,
                    { method: "DELETE" },
                  ),
                  o = await n.json();
                n.ok ? t() : alert("Gagal menghapus catatan: " + o.message);
              } catch (n) {
                alert("Terjadi kesalahan saat menghapus catatan."),
                  console.error(n);
              } finally {
                r();
              }
            }),
            document
              .querySelector("notes-container")
              .addEventListener("toggle-archive", async (n) => {
                const { note_id: e, archived: a } = n.detail,
                  i = `https://notes-api.dicoding.dev/v2/notes/${e}/${a}`;
                o();
                try {
                  await fetch(i, { method: "POST" }), await t();
                } catch (n) {
                  alert("Gagal mengubah status arsip."), console.error(n);
                } finally {
                  r();
                }
              }),
            document
              .querySelector("notes-container")
              .addEventListener("toggle-unarchive", async (n) => {
                const { note_id: e, unarchived: a } = n.detail,
                  i = `https://notes-api.dicoding.dev/v2/notes/${e}/${a}`;
                o();
                try {
                  await fetch(i, { method: "POST" }), await t();
                } catch (n) {
                  alert("Gagal mengubah status unarsip."), console.error(n);
                } finally {
                  r();
                }
              }),
            document.addEventListener("search-note", (e) => {
              const t = e.detail;
              t
                ? a(
                    n.filter(
                      (n) =>
                        new Date(n.createdAt).toISOString().split("T")[0] === t,
                    ),
                  )
                : a();
            }),
            t();
        });
    })();
})();
