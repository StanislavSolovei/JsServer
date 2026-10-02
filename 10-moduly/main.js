// main.js
// Odpowiedzialnosc: spiac wszystko razem i obsluzyc zdarzenia.
// To jedyny plik podlaczony w HTML, przez <script type="module">.

import { pobierzZadaniaStartowe } from "./api.js";
import * as stan from "./stan.js";
import { rysuj, ustawStatus, pokazBlad } from "./widok.js";

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const lista = document.getElementById("lista");
const przyciskWyczysc = document.getElementById("wyczysc");

async function start() {
  // najpierw probujemy pamieci przegladarki, dopiero potem serwera
  const bylyDaneWPamieci = stan.wczytajZPamieci();

  if (bylyDaneWPamieci) {
    ustawStatus("Wczytano dane z pamieci przegladarki", "ok");
  } else {
    try {
      const startowe = await pobierzZadaniaStartowe();
      stan.ustawStan(startowe);
      ustawStatus("Pierwsze uruchomienie, wczytano dane startowe", "ok");
    } catch (blad) {
      stan.ustawStan([]);
      ustawStatus("Nie udalo sie pobrac danych startowych, zaczynamy od pustej listy", "blad");
      console.error(blad);
    }
  }

  odswiez();
}

function odswiez() {
  rysuj(stan.pobierzStan());
}

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const tresc = poleTresc.value.trim();

  if (tresc === "") {
    pokazBlad("Wpisz tresc zadania");
    return;
  }

  pokazBlad("");
  stan.dodaj(tresc);
  odswiez();

  formularz.reset();
  poleTresc.focus();
});

// delegacja zdarzen: jeden nasluch na calej liscie
lista.addEventListener("click", (e) => {
  const doUsuniecia = e.target.closest("[data-usun]");
  if (doUsuniecia) {
    stan.usun(Number(doUsuniecia.dataset.usun));
    odswiez();
    return;
  }

  const doPrzelaczenia = e.target.closest("[data-przelacz]");
  if (doPrzelaczenia) {
    stan.przelacz(Number(doPrzelaczenia.dataset.przelacz));
    odswiez();
  }
});

przyciskWyczysc.addEventListener("click", () => {
  if (confirm("Na pewno usunac wszystkie zadania?")) {
    stan.wyczysc();
    ustawStatus("Wyczyszczono pamiec", "");
    odswiez();
  }
});

start();
