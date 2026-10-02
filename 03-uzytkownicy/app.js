// Lekcja 2. Pobranie danych z API i wyswietlenie ich w dokumencie.

const ADRES_API = "https://jsonplaceholder.typicode.com/users";
const ADRES_ZAPASOWY = "../dane/users.json"; // kopia lokalna na wypadek braku internetu

const lista = document.getElementById("lista");
const status = document.getElementById("status");
const szukaj = document.getElementById("szukaj");

// tutaj trzymamy komplet pobranych danych, zeby filtrowac bez pytania serwera
let wszyscyUzytkownicy = [];

async function pobierzUzytkownikow() {
  try {
    const odpowiedz = await fetch(ADRES_API);

    // fetch nie rzuca bledem przy kodzie 404 czy 500, trzeba sprawdzic samemu
    if (!odpowiedz.ok) {
      throw new Error(`Serwer odpowiedzial kodem ${odpowiedz.status}`);
    }

    // dopiero .json() zamienia tresc odpowiedzi na obiekt JavaScriptu
    wszyscyUzytkownicy = await odpowiedz.json();
    ustawStatus(`Pobrano ${wszyscyUzytkownicy.length} rekordow z API`, "ok");
  } catch (blad) {
    console.warn("Nie udalo sie pobrac z API, probuje z pliku lokalnego.", blad);
    await pobierzZPlikuLokalnego();
  }

  pokazUzytkownikow(wszyscyUzytkownicy);
}

async function pobierzZPlikuLokalnego() {
  try {
    const odpowiedz = await fetch(ADRES_ZAPASOWY);
    wszyscyUzytkownicy = await odpowiedz.json();
    ustawStatus("Brak polaczenia z API, dane z kopii lokalnej", "blad");
  } catch (blad) {
    wszyscyUzytkownicy = [];
    ustawStatus("Nie udalo sie pobrac danych", "blad");
    console.error(blad);
  }
}

function pokazUzytkownikow(uzytkownicy) {
  if (uzytkownicy.length === 0) {
    lista.innerHTML = "<li>Brak wynikow.</li>";
    return;
  }

  // map zamienia kazdy obiekt na fragment HTML, join skleja je w jeden napis
  lista.innerHTML = uzytkownicy
    .map(({ name, email, address, company }) => `
      <li>
        <strong>${name}</strong><br>
        <span class="mail">${email}</span><br>
        <span class="mail">${address.city}, ${company.name}</span>
      </li>
    `)
    .join("");
}

function filtruj(fraza) {
  const szukana = fraza.trim().toLowerCase();

  const wynik = wszyscyUzytkownicy.filter((u) =>
    u.name.toLowerCase().includes(szukana) ||
    u.address.city.toLowerCase().includes(szukana)
  );

  pokazUzytkownikow(wynik);
}

function ustawStatus(tekst, klasa) {
  status.textContent = tekst;
  status.className = `status ${klasa}`;
}

szukaj.addEventListener("input", (zdarzenie) => filtruj(zdarzenie.target.value));

pobierzUzytkownikow();
