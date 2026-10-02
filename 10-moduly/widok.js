// widok.js
// Odpowiedzialnosc: wszystko, co dotyka HTML.
// Test poprawnosci: w tym pliku nie moze byc ani jednego fetch.

const lista = document.getElementById("lista");
const licznik = document.getElementById("licznik");
const status = document.getElementById("status");
const bladPola = document.getElementById("blad");

export function rysuj(zadania) {
  if (zadania.length === 0) {
    lista.innerHTML = "<li>Brak zadan. Dodaj pierwsze.</li>";
  } else {
    lista.innerHTML = zadania
      .map((z) => `
        <li class="${z.zrobione ? "zrobione" : ""}">
          <div class="pozycja">
            <span class="tresc" data-przelacz="${z.id}">${z.tresc}</span>
            <button class="maly" data-usun="${z.id}">usun</button>
          </div>
        </li>
      `)
      .join("");
  }

  const zrobione = zadania.filter((z) => z.zrobione).length;
  licznik.textContent = `Zrobione: ${zrobione} z ${zadania.length}`;
}

export function ustawStatus(tekst, klasa = "") {
  status.textContent = tekst;
  status.className = `status ${klasa}`;
}

export function pokazBlad(tekst) {
  bladPola.textContent = tekst;
}
