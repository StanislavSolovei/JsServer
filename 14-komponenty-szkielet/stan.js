// stan.js
// Ten plik jest IDENTYCZNY w katalogach 12, 13 i 14.
// Na lekcji 9 nie zmieniamy stanu ani logiki. Zmieniamy tylko sposob rysowania.

const KLUCZ = "zaw-web-zadania-komponenty";

// dane startowe, uzywane przy pierwszym uruchomieniu
let zadania = [
  { id: 1, tresc: "Powtorzyc moduly ES", priorytet: "wysoki", zrobione: false },
  { id: 2, tresc: "Oddac prace domowa", priorytet: "sredni", zrobione: true },
  { id: 3, tresc: "Poczytac o komponentach", priorytet: "niski", zrobione: false }
];

// aktualny filtr: wszystkie, aktywne albo zrobione
let filtr = "wszystkie";

export function pobierzStan() {
  return zadania;
}

export function pobierzFiltr() {
  return filtr;
}

export function ustawFiltr(nowy) {
  filtr = nowy;
}

// zwraca tylko te zadania, ktore pasuja do aktualnego filtra
export function widoczne() {
  if (filtr === "aktywne") {
    return zadania.filter((z) => !z.zrobione);
  }
  if (filtr === "zrobione") {
    return zadania.filter((z) => z.zrobione);
  }
  return zadania;
}

export function dodaj(tresc, priorytet) {
  zadania.push({ id: Date.now(), tresc, priorytet, zrobione: false });
  zapisz();
}

export function usun(id) {
  zadania = zadania.filter((z) => z.id !== id);
  zapisz();
}

export function przelacz(id) {
  const zadanie = zadania.find((z) => z.id === id);
  if (zadanie) {
    zadanie.zrobione = !zadanie.zrobione;
    zapisz();
  }
}

export function wczytaj() {
  const zapisane = localStorage.getItem(KLUCZ);
  if (zapisane === null) {
    return;
  }

  try {
    const dane = JSON.parse(zapisane);

    if (!Array.isArray(dane)) {
      throw new Error("Dane w pamieci nie sa tablica.");
    }

    zadania = dane;
  } catch (blad) {
    console.error("Uszkodzone dane w pamieci, zostaja dane startowe.", blad);
    localStorage.removeItem(KLUCZ);
  }
}

function zapisz() {
  localStorage.setItem(KLUCZ, JSON.stringify(zadania));
}
