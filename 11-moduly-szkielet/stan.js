// stan.js
// Odpowiedzialnosc: dane aplikacji, operacje na nich i ich trwalosc.
// Test poprawnosci: w tym pliku nie moze byc ani jednego getElementById.

const KLUCZ = "zaw-web-zadania";

let zadania = [
  { id: 1, tresc: "Powtorzyc fetch i async/await", zrobione: false },
  { id: 2, tresc: "Oddac prace domowa", zrobione: true }
];

export function pobierzStan() {
  return zadania;
}

export function ustawStan(nowe) {
  if (!Array.isArray(nowe)) {
    throw new Error("Stan aplikacji musi byc tablica.");
  }

  zadania = nowe;
  zapisz();
}

export function dodaj(tresc) {
  zadania.push({ id: Date.now(), tresc, zrobione: false });
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
  // getItem zwraca null, gdy nic nie ma
  const zapisane = localStorage.getItem(KLUCZ);

  if (zapisane === null) {
    return false;
  }

  try {
    const dane = JSON.parse(zapisane);

    if (!Array.isArray(dane)) {
      throw new Error("Dane w pamieci nie sa tablica.");
    }

    zadania = dane;
    return true;
  } catch (blad) {
    console.error("Uszkodzone dane w pamieci, zostaja dane startowe.", blad);
    localStorage.removeItem(KLUCZ);
    return false;
  }
}

function zapisz() {
  // JSON.stringify zamienia tablice na tekst, bo tylko tekst da sie zapisac
  localStorage.setItem(KLUCZ, JSON.stringify(zadania));
}
