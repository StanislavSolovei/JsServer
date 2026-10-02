// Lekcja 1. Demonstracja komunikacji klient-serwer.
// Kazde wywolanie fetch to osobny wiersz w zakladce Network.

const API = "https://jsonplaceholder.typicode.com";

// Trzeci adres nie istnieje. To celowe, chodzi o pokazanie kodu 404.
const adresy = [
  `${API}/users`,
  `${API}/posts/1`,
  `${API}/tego-nie-ma`
];

const wyniki = document.getElementById("wyniki");
const przycisk = document.getElementById("przycisk");
const czysc = document.getElementById("czysc");

async function wyslijZadania() {
  wyniki.innerHTML = "";

  for (const adres of adresy) {
    // await w petli jest tu celowy: zadania leca po kolei,
    // dzieki czemu w zakladce Network latwiej je omowic
    await pokazWynik(adres);
  }
}

async function pokazWynik(adres) {
  const karta = document.createElement("div");
  karta.className = "karta";
  wyniki.appendChild(karta);

  try {
    const odpowiedz = await fetch(adres);

    // odpowiedz.ok jest prawdziwe dla kodow 200-299
    const klasa = odpowiedz.ok ? "ok" : "blad";
    const tresc = odpowiedz.ok ? await odpowiedz.json() : null;

    karta.innerHTML = `
      <h3>GET ${adres.replace(API, "")}</h3>
      <p>
        <span class="status ${klasa}">status ${odpowiedz.status} ${odpowiedz.statusText}</span>
      </p>
      <p>${opiszTresc(tresc)}</p>
    `;
  } catch (blad) {
    // tutaj trafiamy, gdy serwer w ogole nie odpowiedzial, np. brak internetu
    karta.innerHTML = `
      <h3>GET ${adres.replace(API, "")}</h3>
      <p><span class="status blad">brak polaczenia z serwerem</span></p>
    `;
    console.error(blad);
  }
}

function opiszTresc(tresc) {
  if (tresc === null) {
    return "Serwer nie zwrocil danych.";
  }
  if (Array.isArray(tresc)) {
    return `Otrzymano tablice, liczba elementow: ${tresc.length}.`;
  }
  return `Otrzymano obiekt, klucze: ${Object.keys(tresc).join(", ")}.`;
}

przycisk.addEventListener("click", wyslijZadania);
czysc.addEventListener("click", () => (wyniki.innerHTML = ""));
