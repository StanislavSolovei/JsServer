// Lekcja 3, cwiczenie. Uzupelnij miejsca oznaczone jako ZADANIE.
// Po kazdym zadaniu odswiez strone i sprawdz konsole oraz zakladke Network.

const ADRES_API = "https://jsonplaceholder.typicode.com/posts";

const formularz = document.getElementById("formularz");
const poleTytul = document.getElementById("tytul");
const poleTresc = document.getElementById("tresc");
const bladPola = document.getElementById("blad");
const status = document.getElementById("status");
const lista = document.getElementById("lista");

// ZADANIE 1
// Podepnij nasluch zdarzenia "submit" na formularzu.
// W srodku jako pierwsza linia zablokuj domyslne przeladowanie strony.
// Podpowiedz: e.preventDefault()
formularz.addEventListener("submit", async (e) => {
  e.preventDefault();

// ZADANIE 2
// Odczytaj wartosci obu pol. Pamietaj o .trim(), zeby obcia spacje.
// Uwaga: wartosci odczytujemy w momencie wysylania, a nie na poczatku pliku.
const tytul = poleTytul.value.trim();
const tresc = poleTresc.value.trim();

// ZADANIE 3
// Sprawdz, czy oba pola sa wypelnione.
// Jesli nie, wpisz komunikat do elementu bladPola i przerwij funkcje (return).
if (!tytul || !tresc){
  bladPola.textContent = "Uzupelnij oba pola.";
  return;
}

  bladPola.textContent = "";
  await wyslij(tytul, tresc);
});

async function wyslij(tytul, tresc) {
  try {
    // ZADANIE 4
    // Wyslij dane metoda POST.
    // Potrzebujesz trzech rzeczy w drugim argumencie fetch:
    //   method: "POST"
    //   headers: { "Content-Type": "application/json" }
    //   body: JSON.stringify({ title: ..., body: ..., userId: 1 })
    const odpowiedz = await fetch(ADRES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: tytul,
        body: tresc,
        userId: 1
      })
    });

    if (!odpowiedz.ok) {
      throw new Error(`Serwer odpowiedzial kodem ${odpowiedz.status}`);
    }

    const utworzony = await odpowiedz.json();
    console.log("Serwer zwrocil:", utworzony);

    status.textContent = `Zapisano, nadane id: ${utworzony.id}`;
    status.className = "status ok";

    // ZADANIE 5, dla chetnych
    // Dopisz nowy wpis na gore listy i wyczysc formularz.
    // Podpowiedz: lista.prepend(element) oraz formularz.reset()
    const element = document.createElement("li");
    element.textContent = `${utworzony.title}: ${utworzony.body}`;
    lista.prepend(element);
    formularz.reset();

  } catch (blad) {
    status.textContent = "Nie udalo sie wyslac danych";
    status.className = "status blad";
    console.error(blad);
  }
}
