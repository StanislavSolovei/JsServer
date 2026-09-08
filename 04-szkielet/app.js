// Lekcja 2, cwiczenie. Uzupelnij miejsca oznaczone jako ZADANIE.
// Po kazdym kroku odswiez strone i sprawdz konsole (F12).

const ADRES_API = "https://jsonplaceholder.typicode.com/users";

const lista = document.getElementById("lista");
const status = document.getElementById("status");

async function pobierzUzytkownikow() {
  try {
    // ZADANIE 1
    // Wyslij zadanie pod ADRES_API i zapisz odpowiedz w stalej "odpowiedz".
    // Podpowiedz: fetch zwraca obietnice, wiec potrzebne jest slowo await.
    const odpowiedz = null;

    // ZADANIE 2
    // Sprawdz, czy odpowiedz.ok jest prawdziwe.
    // Jesli nie, rzuc bledem z komunikatem zawierajacym odpowiedz.status.

    // ZADANIE 3
    // Zamien tresc odpowiedzi na tablice obiektow JavaScriptu.
    // Podpowiedz: metoda .json(), rowniez asynchroniczna.
    const uzytkownicy = [];

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
  lista.innerHTML = "";
}

// ZADANIE 5, dla chetnych
// Dodaj do pliku index.html pole <input type="search" id="szukaj">
// i napisz funkcje filtrujaca liste bez ponownego pytania serwera.

pobierzUzytkownikow();
