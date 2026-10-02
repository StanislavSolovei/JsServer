// widok.js, WERSJA PRZED ROZBICIEM NA KOMPONENTY.
//
// Ten plik dziala poprawnie. To nie jest przyklad bledu.
// Problem polega na czyms innym: wszystko jest w jednym kawalku.
//
// Pytanie na lekcje: w ktorej linii opisany jest przycisk usuwania?
// Ile czasu zajelo ci jego znalezienie?

const aplikacja = document.getElementById("aplikacja");

export function rysuj(wszystkie, doPokazania, filtr) {
  // policzenie statystyk
  const zrobione = wszystkie.filter((z) => z.zrobione).length;
  const procent = wszystkie.length === 0 ? 0 : Math.round((zrobione / wszystkie.length) * 100);

  // przyciski filtrowania
  let html = `
    <div class="filtry">
      <button data-filtr="wszystkie" class="${filtr === "wszystkie" ? "aktywny" : ""}">Wszystkie</button>
      <button data-filtr="aktywne" class="${filtr === "aktywne" ? "aktywny" : ""}">Aktywne</button>
      <button data-filtr="zrobione" class="${filtr === "zrobione" ? "aktywny" : ""}">Zrobione</button>
    </div>
  `;

  // licznik
  html += `<p class="licznik">Zrobione: ${zrobione} z ${wszystkie.length} (${procent}%)</p>`;

  // pasek postepu
  html += `
    <div class="tor">
      <div class="wypelnienie" style="width: ${procent}%"></div>
    </div>
  `;

  // lista zadan
  html += `<ul class="lista">`;

  if (doPokazania.length === 0) {
    html += `<li class="pusto">Brak zadan do pokazania.</li>`;
  } else {
    for (const zadanie of doPokazania) {
      html += `
        <li class="${zadanie.zrobione ? "zrobione" : ""}">
          <div class="pozycja">
            <span class="tresc" data-przelacz="${zadanie.id}">${zadanie.tresc}</span>
            <span class="etykieta ${zadanie.priorytet}">${zadanie.priorytet}</span>
            <button class="maly" data-usun="${zadanie.id}">usun</button>
          </div>
        </li>
      `;
    }
  }

  html += `</ul>`;

  aplikacja.innerHTML = html;
}

export function pokazBlad(tekst) {
  document.getElementById("blad").textContent = tekst;
}
