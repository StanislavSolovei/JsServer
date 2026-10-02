// widok.js, WERSJA PO ROZBICIU NA KOMPONENTY.
//
// Porownaj ten plik z tym samym plikiem w katalogu 12-przed.
// Kod nie zniknal, przeniosl sie do komponentow.
// Ta funkcja mowi teraz, CO ma byc na ekranie, a nie JAK kazda rzecz wyglada.

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
