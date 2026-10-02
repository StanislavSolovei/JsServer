// komponenty.js
//
// KOMPONENT to funkcja, ktora dostaje dane i zwraca kawalek HTML jako napis.
//
// Trzy zasady, ktore obowiazuja w calym tym pliku:
//   1. wszystkie dane komponent dostaje w argumencie, nie siega po nic z zewnatrz
//   2. komponent zwraca napis, niczego sam nie wstawia do dokumentu
//   3. dla tych samych danych zwraca zawsze to samo
//
// Nazwy komponentow piszemy z wielkiej litery, zeby odrozniac je od zwyklych funkcji.
// Ta sama konwencja obowiazuje w Reakcie i w Vue.

// --- Funkcja pomocnicza -----------------------------------------------------

// Zamienia znaki specjalne na bezpieczne odpowiedniki.
// Bez tego tresc wpisana przez uzytkownika moglaby zostac potraktowana jako kod HTML.
// Ten rodzaj bledu nazywa sie XSS i jest jednym z najczestszych w aplikacjach webowych.
export function tekst(wartosc) {
  return String(wartosc)          // na wszelki wypadek zamieniamy na napis
    .replaceAll("&", "&amp;")     // ampersand musi byc zamieniony jako pierwszy
    .replaceAll("<", "&lt;")      // bez tego <b>test</b> zostalby pogrubiony
    .replaceAll(">", "&gt;");
}

// --- Komponenty male --------------------------------------------------------

// Etykieta priorytetu. Jedyne miejsce w projekcie, ktore opisuje jej wyglad.
export function Etykieta(priorytet) {
  // klasa CSS bierze sie wprost z wartosci, wiec style sa w arkuszu, a nie tutaj
  return `<span class="etykieta ${priorytet}">${tekst(priorytet)}</span>`;
}

// Przycisk usuwania. Wydzielony, bo powtarza sie w kilku miejscach aplikacji.
// Zmiana w tej jednej linii zmienia kazdy taki przycisk w calym projekcie.
export function PrzyciskUsun(id) {
  return `<button class="maly" data-usun="${id}">usun</button>`;
}

// Jeden przycisk filtrowania.
// Drugi argument mowi, czy ten przycisk ma byc podswietlony jako aktywny.
export function PrzyciskFiltra(wartosc, etykieta, czyAktywny) {
  const klasa = czyAktywny ? "aktywny" : "";
  return `<button data-filtr="${wartosc}" class="${klasa}">${etykieta}</button>`;
}

// --- Komponenty zlozone z mniejszych ----------------------------------------

// Pasek filtrow. Sklada sie z trzech komponentow PrzyciskFiltra.
export function Filtry(aktywny) {
  return `
    <div class="filtry">
      ${PrzyciskFiltra("wszystkie", "Wszystkie", aktywny === "wszystkie")}
      ${PrzyciskFiltra("aktywne", "Aktywne", aktywny === "aktywne")}
      ${PrzyciskFiltra("zrobione", "Zrobione", aktywny === "zrobione")}
    </div>
  `;
}

// Jedno zadanie na liscie. Sklada sie z tekstu, Etykiety i PrzyciskuUsun.
export function Zadanie(zadanie) {
  // klase wyliczamy z danych, ktore dostalismy w argumencie
  const klasa = zadanie.zrobione ? "zrobione" : "";

  // zwracamy napis, nie wstawiamy go nigdzie
  return `
    <li class="${klasa}">
      <div class="pozycja">
        <span class="tresc" data-przelacz="${zadanie.id}">${tekst(zadanie.tresc)}</span>
        ${Etykieta(zadanie.priorytet)}
        ${PrzyciskUsun(zadanie.id)}
      </div>
    </li>
  `;
}

// Cala lista zadan. Sama obsluguje przypadek, w ktorym nie ma czego pokazac,
// dzieki czemu funkcja rysujaca nie musi o tym wiedziec.
export function ListaZadan(zadania) {
  if (zadania.length === 0) {
    return `<li class="pusto">Brak zadan do pokazania.</li>`;
  }

  // map wola komponent Zadanie dla kazdego elementu i zwraca tablice napisow,
  // a join skleja te napisy w jeden. Bez join pojawilyby sie przecinki.
  return zadania.map(Zadanie).join("");
}

// Licznik. Liczy sam, ale wylacznie z danych podanych w argumencie.
export function Licznik(zadania) {
  const zrobione = zadania.filter((z) => z.zrobione).length;
  const procent = policzProcent(zadania);

  return `<p class="licznik">Zrobione: ${zrobione} z ${zadania.length} (${procent}%)</p>`;
}

// Pasek postepu.
export function PasekPostepu(zadania) {
  const procent = policzProcent(zadania);

  return `
    <div class="tor">
      <div class="wypelnienie" style="width: ${procent}%"></div>
    </div>
  `;
}

// Funkcja pomocnicza uzywana przez dwa komponenty powyzej.
// Nie jest komponentem, bo nie zwraca HTML, dlatego nazwa jest z malej litery.
function policzProcent(zadania) {
  if (zadania.length === 0) {
    return 0;
  }

  const zrobione = zadania.filter((z) => z.zrobione).length;
  return Math.round((zrobione / zadania.length) * 100);
}
