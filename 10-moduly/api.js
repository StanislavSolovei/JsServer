// api.js
// Odpowiedzialnosc: rozmowa z serwerem. Nic wiecej.
// Test poprawnosci: w tym pliku nie moze byc ani jednego getElementById.

const ADRES_DANYCH = "../dane/zadania.json";

export async function pobierzZadaniaStartowe() {
  const odpowiedz = await fetch(ADRES_DANYCH);

  if (!odpowiedz.ok) {
    throw new Error(`Serwer odpowiedzial kodem ${odpowiedz.status}`);
  }

  return odpowiedz.json();
}
