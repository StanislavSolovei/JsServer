// main.js
// Odpowiedzialnosc: spiac moduly razem i obsluzyc zdarzenia.
// To jedyny plik podlaczony w HTML, przez <script type="module">.

import { pobierzZadaniaStartowe } from "./api.js";
import * as stan from "./stan.js";
import { rysuj, pokazBlad } from "./widok.js";

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const lista = document.getElementById("lista");

async function start() {
  // najpierw probujemy pamieci przegladarki, dopiero potem pliku startowego
  const bylyDaneWPamieci = stan.wczytaj();

  if (!bylyDaneWPamieci) {
    try {
      const startowe = await pobierzZadaniaStartowe();
      stan.ustawStan(startowe);
    } catch (blad) {
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

start();
