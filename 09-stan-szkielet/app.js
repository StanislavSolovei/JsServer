// Lekcja 4, cwiczenie. Uzupelnij miejsca oznaczone jako ZADANIE.
//
// ZASADA, ktorej pilnujemy przez cala lekcje:
// przypisanie do innerHTML moze byc TYLKO w funkcji rysuj().
// Reszta kodu zmienia stan i wola rysuj().

// --- STAN ---

let zadania = [
  { id: 1, tresc: "Powtorzyc fetch i async/await", zrobione: false },
  { id: 2, tresc: "Oddac prace domowa", zrobione: true }
];

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const bladPola = document.getElementById("blad");
const lista = document.getElementById("lista");
const licznik = document.getElementById("licznik");

// --- WIDOK ---

function rysuj() {
  // ZADANIE 1
  // Zbuduj cala liste na podstawie tablicy zadania.
  // Kazdy element ma zawierac tresc zadania i przycisk usuwania.
  // Zadanie zrobione ma dostac klase "zrobione" na elemencie li.
  // Podpowiedz: map, operator warunkowy ? :, na koncu join("")
  lista.innerHTML = "";

  // ZADANIE 2
  // Ustaw tekst licznika w formacie: Zrobione: 1 z 2
  // Podpowiedz: filter i wlasciwosc length
  licznik.textContent = "";
}

// --- ZMIANY STANU ---

function dodaj(tresc) {
  // ZADANIE 3
  // Dopisz nowe zadanie do tablicy i przerysuj widok.
  // Jako id uzyj Date.now(), zrobione ustaw na false.
}

function usun(id) {
  // ZADANIE 4
  // Usun z tablicy zadanie o podanym id i przerysuj widok.
  // Podpowiedz: filter zwraca NOWA tablice, wiec zmienna musi byc let
}

// --- ZDARZENIA ---

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

// ZADANIE 5
// Podepnij JEDEN nasluch kliniecia na elemencie lista (delegacja zdarzen).
// Sprawdz, czy kliknieto w przycisk z atrybutem data-usun, i wywolaj usun().
// Uwaga: dataset zwraca tekst, wiec potrzebna jest konwersja przez Number().
//
// Dla chetnych: klikniecie w tresc zadania ma przelaczac je na zrobione
// i z powrotem.

rysuj();
