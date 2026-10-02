// Rozwiazania do szkieletu z katalogu 04 oraz zadan rozszerzajacych.
// Plik jest tylko do czytania na lekcji, nie jest nigdzie podlaczony.

// --- ZADANIA 1 do 4 -------------------------------------------------------

async function pobierzUzytkownikow() {
  try {
    const odpowiedz = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!odpowiedz.ok) {
      throw new Error(`Serwer odpowiedzial kodem ${odpowiedz.status}`);
    }

    const uzytkownicy = await odpowiedz.json();
    wszyscy = uzytkownicy;

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

// --- ZADANIE 5, filtrowanie ------------------------------------------------

let wszyscy = [];

function filtruj(fraza) {
  const szukana = fraza.trim().toLowerCase();
  const wynik = wszyscy.filter((u) => u.name.toLowerCase().includes(szukana));
  pokazUzytkownikow(wynik);
}

// document.getElementById("szukaj")
//   .addEventListener("input", (e) => filtruj(e.target.value));

// --- Zadania rozszerzajace z konspektu -------------------------------------

// 1. Nazwa firmy uzytkownika
//    W destrukturyzacji dopisujemy company, w szablonie uzywamy company.name.

// 2. Sortowanie alfabetyczne
function posortujUzytkownikow() {
  return [...wszyscy].sort((a, b) => a.name.localeCompare(b.name, "pl"));
}

// 3. Tylko ukonczone zadania z innego zasobu
async function pobierzUkonczone() {
  const odpowiedz = await fetch("https://jsonplaceholder.typicode.com/todos");
  const zadania = await odpowiedz.json();
  return zadania.filter((z) => z.completed);
}

// 4. Praca domowa: pierwsze dziesiec postow
async function pobierzPosty() {
  const odpowiedz = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posty = await odpowiedz.json();
  return posty.slice(0, 10);
}
