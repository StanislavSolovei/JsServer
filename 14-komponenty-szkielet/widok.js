// widok.js, PUNKT WYJSCIA DO CWICZENIA.
//
// Ten plik dziala. Twoim zadaniem jest go ODCHUDZIC.
// Przenies wyglad do pliku komponenty.js i zastap go wywolaniami komponentow.
//
// CEL: funkcja rysuj ma miec najwyzej piec linii,
// a w calym projekcie ma zostac jedno przypisanie do innerHTML.
//
// Pracuj krokami. Po kazdym przeniesionym komponencie odswiez strone.
// Gotowe komponenty importujesz na gorze pliku, na przyklad:
// import { Zadanie, ListaZadan } from "./komponenty.js";

import { Filtry, Licznik, PasekPostepu, ListaZadan } from "./komponenty.js";

const aplikacja = document.getElementById("aplikacja");

export function rysuj(wszystkie, doPokazania, filtr) {
  // jedyne przypisanie do innerHTML w calym projekcie
  aplikacja.innerHTML = `
    ${Filtry(filtr)}
    ${Licznik(wszystkie)}
    ${PasekPostepu(wszystkie)}
    <ul class="lista">${ListaZadan(doPokazania)}</ul>
  `;
}

export function pokazBlad(tekst) {
  document.getElementById("blad").textContent = tekst;
}
