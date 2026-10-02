// komponenty.js
//
// Twoje zadanie: przeniesc tutaj wyglad z pliku widok.js, kawalek po kawalku.
//
// KOMPONENT to funkcja, ktora dostaje dane i zwraca kawalek HTML jako napis.
// Trzy zasady, ktorych pilnujemy:
//   1. wszystkie dane komponent dostaje w argumencie
//   2. komponent zwraca napis, niczego sam nie wstawia do dokumentu
//   3. dla tych samych danych zwraca zawsze to samo
//
// Nazwy komponentow piszemy z wielkiej litery.
// Pracuj po jednym komponencie: napisz, podmien w widok.js, odswiez strone, sprawdz.

// Funkcja pomocnicza do bezpiecznego wyswietlania tekstu.
export function tekst(wartosc) {
  return String(wartosc)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// ZADANIE 1
// Komponent PrzyciskUsun(id) ma zwracac przycisk usuwania.
// Skopiuj jego wyglad z pliku widok.js i podmien numer w atrybucie data-usun.
export function PrzyciskUsun(id) {
  return `<button class="maly" data-usun="${id}">usun</button>`;
}

// ZADANIE 2
// Komponent Etykieta(priorytet) ma zwracac kolorowa etykietke z priorytetem.
// Uwaga: wartosc priorytetu trafia zarowno do klasy CSS, jak i do tekstu.
export function Etykieta(priorytet) {
  const dozwolone = new Set(["wysoki", "sredni", "niski"]);
  const bezpiecznyPriorytet = dozwolone.has(priorytet) ? priorytet : "niski";

  return `<span class="etykieta ${bezpiecznyPriorytet}">${tekst(bezpiecznyPriorytet)}</span>`;
}

// ZADANIE 3
// Komponent Zadanie(zadanie) ma zwracac caly element listy.
// W srodku uzyj komponentow Etykieta i PrzyciskUsun.
// Podpowiedz: wynik innego komponentu wstawiasz przez ${NazwaKomponentu(...)}
export function Zadanie(zadanie) {
  const klasa = zadanie.zrobione ? "zrobione" : "";

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

// ZADANIE 4
// Komponent ListaZadan(zadania) ma zwracac wszystkie elementy listy.
// Jesli tablica jest pusta, zwroc komunikat o braku zadan.
// Podpowiedz: zadania.map(Zadanie).join("")
export function ListaZadan(zadania) {
  if (zadania.length === 0) {
    return `<li class="pusto">Brak zadan do pokazania.</li>`;
  }

  return zadania.map(Zadanie).join("");
}

function policzProcent(zadania) {
  if (zadania.length === 0) {
    return 0;
  }

  const zrobione = zadania.filter((z) => z.zrobione).length;
  return Math.round((zrobione / zadania.length) * 100);
}

// ZADANIE 5
// Komponenty Licznik(zadania) i PasekPostepu(zadania).
// Oba potrzebuja procentu ukonczenia, wiec napisz jedna funkcje pomocnicza
// i uzyj jej w obu. Uwaga na dzielenie przez zero przy pustej liscie.
export function Licznik(zadania) {
  const zrobione = zadania.filter((z) => z.zrobione).length;
  const procent = policzProcent(zadania);

  return `<p class="licznik">Zrobione: ${zrobione} z ${zadania.length} (${procent}%)</p>`;
}

export function PasekPostepu(zadania) {
  const procent = policzProcent(zadania);

  return `
    <div class="tor">
      <div class="wypelnienie" style="width: ${procent}%"></div>
    </div>
  `;
}

// ZADANIE 6, dla chetnych
// Komponent Filtry(aktywny) zwracajacy trzy przyciski filtrowania.
// Przycisk odpowiadajacy aktualnemu filtrowi ma dostac klase "aktywny".
// Rozbij to na dwa komponenty: PrzyciskFiltra i Filtry.
export function PrzyciskFiltra(wartosc, etykieta, czyAktywny) {
  const klasa = czyAktywny ? "aktywny" : "";
  return `<button data-filtr="${wartosc}" class="${klasa}">${tekst(etykieta)}</button>`;
}

export function Filtry(aktywny) {
  return `
    <div class="filtry">
      ${PrzyciskFiltra("wszystkie", "Wszystkie", aktywny === "wszystkie")}
      ${PrzyciskFiltra("aktywne", "Aktywne", aktywny === "aktywne")}
      ${PrzyciskFiltra("zrobione", "Zrobione", aktywny === "zrobione")}
    </div>
  `;
}

// ZADANIE 7, dla chetnych
// Funkcja tekst(wartosc) zamieniajaca znaki < > & na bezpieczne odpowiedniki.
// Przepusc przez nia tresc zadania i sprawdz, co sie stanie,
// gdy dodasz zadanie o tresci <b>test</b>. Najpierw bez tej funkcji, potem z nia.
