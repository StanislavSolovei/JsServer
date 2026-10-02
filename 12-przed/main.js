// main.js
// Ten plik jest IDENTYCZNY w katalogach 12, 13 i 14.
// Spina stan z widokiem i obsluguje zdarzenia.

import * as stan from "./stan.js";
import { rysuj, pokazBlad } from "./widok.js";

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const polePriorytet = document.getElementById("priorytet");
const aplikacja = document.getElementById("aplikacja");

// jedno miejsce, z ktorego wolamy rysowanie
function odswiez() {
  rysuj(stan.pobierzStan(), stan.widoczne(), stan.pobierzFiltr());
}

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const tresc = poleTresc.value.trim();

  if (tresc === "") {
    pokazBlad("Wpisz tresc zadania");
    return;
  }

  pokazBlad("");
  stan.dodaj(tresc, polePriorytet.value);
  odswiez();

  formularz.reset();
  poleTresc.focus();
});

// delegacja zdarzen: jeden nasluch na calej aplikacji,
// dzieki temu przerysowanie niczego nie psuje
aplikacja.addEventListener("click", (e) => {
  const przyciskFiltra = e.target.closest("[data-filtr]");
  if (przyciskFiltra) {
    stan.ustawFiltr(przyciskFiltra.dataset.filtr);
    odswiez();
    return;
  }

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

stan.wczytaj();
odswiez();
