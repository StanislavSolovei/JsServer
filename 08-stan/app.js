// Lekcja 4. Stan aplikacji i przerysowanie widoku.
// Zasada: zmieniamy stan, potem wolamy rysuj(). Nigdy odwrotnie.

// --- STAN, jedyne miejsce, w ktorym trzymamy prawde o aplikacji ---

let zadania = [
  { id: 1, tresc: "Powtorzyc fetch i async/await", zrobione: false },
  { id: 2, tresc: "Oddac prace domowa", zrobione: true }
];

// udostepniamy stan w konsoli, zeby dalo sie go ogladac na lekcji
window.zadania = zadania;

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const bladPola = document.getElementById("blad");
const lista = document.getElementById("lista");
const licznik = document.getElementById("licznik");

// --- WIDOK, funkcja rysujaca caly stan od nowa ---

function rysuj() {
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

  // licznik powstaje z tego samego stanu, wiec nigdy sie nie rozjedzie z lista
  const zrobione = zadania.filter((z) => z.zrobione).length;
  licznik.textContent = `Zrobione: ${zrobione} z ${zadania.length}`;
}

// --- ZMIANY STANU, kazda konczy sie wywolaniem rysuj() ---

function dodaj(tresc) {
  // Date.now() daje numer, ktory na pewno sie nie powtorzy
  zadania.push({ id: Date.now(), tresc, zrobione: false });
  rysuj();
}

function usun(id) {
  zadania = zadania.filter((z) => z.id !== id);
  window.zadania = zadania;
  rysuj();
}

function przelacz(id) {
  const zadanie = zadania.find((z) => z.id === id);
  if (zadanie) {
    zadanie.zrobione = !zadanie.zrobione;
    rysuj();
  }
}

// --- ZDARZENIA ---

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const tresc = poleTresc.value.trim();

  if (tresc === "") {
    bladPola.textContent = "Wpisz tresc zadania";
    poleTresc.classList.add("niepoprawne");
    return;
  }

  bladPola.textContent = "";
  poleTresc.classList.remove("niepoprawne");

  dodaj(tresc);
  formularz.reset();
  poleTresc.focus();
});

// delegacja zdarzen: jeden nasluch na liscie zamiast jednego na kazdym przycisku
// dzieki temu przerysowanie listy niczego nie psuje
lista.addEventListener("click", (e) => {
  const doUsuniecia = e.target.closest("[data-usun]");
  if (doUsuniecia) {
    // Number jest konieczne, bo z atrybutu HTML wszystko wychodzi jako tekst
    usun(Number(doUsuniecia.dataset.usun));
    return;
  }

  const doPrzelaczenia = e.target.closest("[data-przelacz]");
  if (doPrzelaczenia) {
    przelacz(Number(doPrzelaczenia.dataset.przelacz));
  }
});

rysuj();
