// Lekcja 2, cwiczenie. Uzupelnij miejsca oznaczone jako ZADANIE.
// Po kazdym kroku odswiez strone i sprawdz konsole (F12).

const ADRES_API = "https://jsonplaceholder.typicode.com/users";

const lista = document.getElementById("lista");
const status = document.getElementById("status");
const input = document.getElementById("szukaj");

// przechowujemy wszystkie pobrane rekordy, zeby filtrowac bez kolejnego zapytania
let wszyscyUzytkownicy = [];

async function pobierzUzytkownikow() {
  try {
    // ZADANIE 1
    // Wyslij zadanie pod ADRES_API i zapisz odpowiedz w stalej "odpowiedz".
    // Podpowiedz: fetch zwraca obietnice, wiec potrzebne jest slowo await.
    const odpowiedz = await fetch(ADRES_API);

    // ZADANIE 2
    // Sprawdz, czy odpowiedz.ok jest prawdziwe.
    // Jesli nie, rzuc bledem z komunikatem zawierajacym odpowiedz.status.
    if (!odpowiedz.ok) {
      throw new Error(`Błąd po stronie servera: ${odpowiedz.status}`);
    }

    // ZADANIE 3
    // Zamien tresc odpowiedzi na tablice obiektow JavaScriptu.
    // Podpowiedz: metoda .json(), rowniez asynchroniczna.
    const uzytkownicy = await odpowiedz.json();

    wszyscyUzytkownicy = uzytkownicy;
    pokazUzytkownikow(uzytkownicy);
    status.textContent = `Pobrano ${uzytkownicy.length} rekordow`;
    status.className = "status ok";
  } catch (blad) {
    status.textContent = "Nie udalo sie pobrac danych";
    status.className = "status blad";
    console.error(blad);
  }
}

function pokazUzytkownikow(uzytkownicy) {
  // ZADANIE 4
  // Zamien tablice uzytkownikow na liste elementow <li>.
  // Kazdy element ma pokazac: name pogrubione, ponizej email i address.city.
  // Podpowiedz: metoda map, szablony napisow z backtickami, na koncu join("").
  lista.innerHTML = uzytkownicy
    .map(({ name, email, address }) => `
      <li>
        <strong>${name}</strong><br>
        <span class="mail">${email}</span><br>
        <span class="mail">${address.city}</span>
      </li>
    `)
    .join("");
}

function szukaj(text) {
  const fraza = text.trim().toLowerCase();

  // ZADANIE 5, dla chetnych
  // Filtrujemy tablice juz pobranych danych bez ponownego pytania serwera.
  const wynik = wszyscyUzytkownicy.filter((user) =>
    user.name.toLowerCase().includes(fraza)
  );

  pokazUzytkownikow(wynik);
}

// ZADANIE 5, dla chetnych
// Dodaj do pliku index.html pole <input type="search" id="szukaj">
// i napisz funkcje filtrujaca liste bez ponownego pytania serwera.

input.addEventListener("input", () => {
  szukaj(input.value);
});

pobierzUzytkownikow();
