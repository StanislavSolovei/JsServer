// Lekcja 5, cwiczenie.
//
// Ten plik DZIALA. To jest wersja z poprzedniej lekcji, w jednym kawalku.
// Masz dwa zadania: sprawic, zeby dane przezyly odswiezenie strony,
// a potem rozbic ten plik na cztery mniejsze.
//
// Pracuj krokami. Po kazdym kroku odswiez strone i sprawdz, czy nadal dziala.

const KLUCZ = "zaw-web-zadania";

let zadania = [
  { id: 1, tresc: "Powtorzyc fetch i async/await", zrobione: false },
  { id: 2, tresc: "Oddac prace domowa", zrobione: true }
];

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const bladPola = document.getElementById("blad");
const lista = document.getElementById("lista");
const licznik = document.getElementById("licznik");

// ZADANIE 1, zapis
// Napisz funkcje zapisz(), ktora odklada tablice zadania do localStorage.
// Pamietaj, ze localStorage przechowuje wylacznie tekst.
// Podpowiedz: localStorage.setItem(KLUCZ, JSON.stringify(zadania))
function zapisz() {
}

// ZADANIE 2, odczyt
// Napisz funkcje wczytaj(), ktora przy starcie aplikacji odtwarza tablice
// z localStorage. Jesli nic nie bylo zapisane, zostaw dane przykladowe.
// Uwaga: getItem zwraca null, gdy nic nie ma, a JSON.parse(null) sie wywali.
function wczytaj() {
}

// ZADANIE 3
// Dopisz wywolanie zapisz() wszedzie tam, gdzie zmienia sie stan.
// Zastanow sie, ile takich miejsc jest w tym pliku. Powinny byc trzy.

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

  const zrobione = zadania.filter((z) => z.zrobione).length;
  licznik.textContent = `Zrobione: ${zrobione} z ${zadania.length}`;
}

function dodaj(tresc) {
  zadania.push({ id: Date.now(), tresc, zrobione: false });
  rysuj();
}

function usun(id) {
  zadania = zadania.filter((z) => z.id !== id);
  rysuj();
}

function przelacz(id) {
  const zadanie = zadania.find((z) => z.id === id);
  if (zadanie) {
    zadanie.zrobione = !zadanie.zrobione;
    rysuj();
  }
}

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const tresc = poleTresc.value.trim();
  if (tresc === "") {
    bladPola.textContent = "Wpisz tresc zadania";
    return;
  }

  bladPola.textContent = "";
  dodaj(tresc);
  formularz.reset();
});

lista.addEventListener("click", (e) => {
  const doUsuniecia = e.target.closest("[data-usun]");
  if (doUsuniecia) {
    usun(Number(doUsuniecia.dataset.usun));
    return;
  }

  const doPrzelaczenia = e.target.closest("[data-przelacz]");
  if (doPrzelaczenia) {
    przelacz(Number(doPrzelaczenia.dataset.przelacz));
  }
});

wczytaj();
rysuj();

// ZADANIE 4, podzial na moduly
//
// Rozbij ten plik na cztery. Rob to po jednym pliku naraz i po kazdym kroku
// sprawdzaj, czy aplikacja nadal dziala.
//
//   stan.js   - tablica zadania oraz funkcje dodaj, usun, przelacz, zapisz, wczytaj
//   widok.js  - funkcja rysuj i wszystko, co dotyka HTML
//   api.js    - pobranie danych startowych z pliku ../dane/zadania.json
//   main.js   - importy, nasluchy zdarzen, uruchomienie aplikacji
//
// Pamietaj o trzech rzeczach:
//   1. w HTML musi byc <script type="module" src="main.js">
//   2. sciezki w imporcie musza miec rozszerzenie: "./stan.js", nie "./stan"
//   3. moduly nie dzialaja po file://, potrzebny jest Live Server
//
// Test poprawnego podzialu:
//   w api.js nie ma ani jednego getElementById
//   w widok.js nie ma ani jednego fetch
