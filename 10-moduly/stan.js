// stan.js
// Odpowiedzialnosc: dane aplikacji, operacje na nich i ich trwalosc.
// Test poprawnosci: w tym pliku nie moze byc ani jednego getElementById.

const KLUCZ = "zaw-web-zadania";

let zadania = [];

export function pobierzStan() {
  return zadania;
}

export function ustawStan(nowe) {
  zadania = nowe;
  zapisz();
}

export function dodaj(tresc) {
  // Date.now() daje numer, ktory na pewno sie nie powtorzy
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

export function wyczysc() {
  zadania = [];
  localStorage.removeItem(KLUCZ);
}

export function wczytajZPamieci() {
  // localStorage przechowuje wylacznie tekst, wiec trzeba go rozpakowac
  const zapisane = localStorage.getItem(KLUCZ);

  if (zapisane === null) {
    return false; // nic nie bylo zapisane, trzeba wziac dane startowe
  }

  try {
    zadania = JSON.parse(zapisane);
    return true;
  } catch (blad) {
    // zdarza sie, gdy ktos recznie popsuje zawartosc w zakladce Application
    console.error("Uszkodzone dane w pamieci, zaczynam od nowa.", blad);
    localStorage.removeItem(KLUCZ);
    return false;
  }
}

function zapisz() {
  // JSON.stringify zamienia tablice na tekst, bo tylko tekst da sie zapisac
  localStorage.setItem(KLUCZ, JSON.stringify(zadania));
}
