// Lekcja 4, cwiczenie. Uzupelnij miejsca oznaczone jako ZADANIE.
//
// ZASADA, ktorej pilnujemy przez cala lekcje:
// przypisanie do innerHTML moze byc TYLKO w funkcji rysuj().
// Reszta kodu zmienia stan i wola rysuj().

// --- STAN ---

let zadania = [
  { id: 1, tresc: "Powtorzyc fetch i async/await", zrobione: false },
  { id: 2, tresc: "Oddac prace domowa", zrobione: true }
];

const formularz = document.getElementById("formularz");
const poleTresc = document.getElementById("tresc");
const bladPola = document.getElementById("blad");
const lista = document.getElementById("lista");
const licznik = document.getElementById("licznik");

// --- WIDOK ---

function rysuj() {
  // ZADANIE 1
  // Zbuduj cala liste na podstawie tablicy zadania.
  // Kazdy element ma zawierac tresc zadania i przycisk usuwania.
  // Zadanie zrobione ma dostac klase "zrobione" na elemencie li.
  // Podpowiedz: map, operator warunkowy ? :, na koncu join("")
  lista.innerHTML = zadania.map(zadanie => {
    const klasaZrobione = zadanie.zrobione ? 'class="zrobione"' : '';

    return `<li ${klasaZrobione} data-id="${zadanie.id}">
        <span class="tekst-zadania">${zadanie.tresc}</span>
        <button data-usun="true">Usuń</button>
    </li>`;
  }).join("");

  // ZADANIE 2
  // Ustaw tekst licznika w formacie: Zrobione: 1 z 2
  // Podpowiedz: filter i wlasciwosc length
  const zrobioneZadania = zadania.filter(zadanie => zadanie.zrobione === true);
  licznik.textContent = `Zrobione: ${zrobioneZadania.length} z ${zadania.length}`;
}
// --- ZMIANY STANU ---

function dodaj(tresc) {
  // ZADANIE 3
  // Dopisz nowe zadanie do tablicy i przerysuj widok.
  // Jako id uzyj Date.now(), zrobione ustaw na false.
  const noweZadanie = {
    id: Date.now(),
    tresc: tresc,
    zrobione: false
  };

  zadania.push(noweZadanie);
  rysuj();
}

function usun(id) {
  // ZADANIE 4
  // Usun z tablicy zadanie o podanym id i przerysuj widok.
  // Podpowiedz: filter zwraca NOWA tablice, wiec zmienna musi byc let
  zadania = zadania.filter(zadanie => zadanie.id !== id);
  rysuj();
}

// --- ZDARZENIA ---

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const tresc = poleTresc.value.trim();
  if (tresc === "") {
    bladPola.textContent = "Wpisz tresc zadania";
    return;
  }

  bladPola.textContent = "";
  dodaj(tresc);
  formularz.reset();
});

// ZADANIE 5
// Podepnij JEDEN nasluch kliniecia na elemencie lista (delegacja zdarzen).
// Sprawdz, czy kliknieto w przycisk z atrybutem data-usun, i wywolaj usun().
// Uwaga: dataset zwraca tekst, wiec potrzebna jest konwersja przez Number().
lista.addEventListener("click", (e) => {
  const liElement = e.target.closest("li");
  if(!liElement) return;

  const idZadania = Number(liElement.dataset.id);

  if(e.target.hasAttribute("data-usun")) {
    usun(idZadania);
    return;
  }
// Dla chetnych: klikniecie w tresc zadania ma przelaczac je na zrobione
// i z powrotem.
if (e.target.classList.contains("tekst-zadania") || e.target.tagName === "LI") {
  const zadanie = zadania.find(z => z.id === idZadania);
  if (zadanie) {
    zadanie.zrobione = !zadanie.zrobione;
    rysuj();
  }
}
});


rysuj();
