// Lekcja 3. Obsluga formularza i wysylanie danych na serwer.

const ADRES_API = "https://jsonplaceholder.typicode.com/posts";

const formularz = document.getElementById("formularz");
const poleTytul = document.getElementById("tytul");
const poleTresc = document.getElementById("tresc");
const bladPola = document.getElementById("blad");
const status = document.getElementById("status");
const odpowiedzPre = document.getElementById("odpowiedz");
const lista = document.getElementById("lista");
const przyciskWyslij = document.getElementById("wyslij");

formularz.addEventListener("submit", async (e) => {
  // bez tej linii przegladarka przeladuje strone i wszystko przepadnie
  e.preventDefault();

  // wartosci odczytujemy TERAZ, w momencie wysylania, a nie przy starcie skryptu
  const tytul = poleTytul.value.trim();
  const tresc = poleTresc.value.trim();

  if (!sprawdzPoprawnosc(tytul, tresc)) {
    return;
  }

  await wyslij(tytul, tresc);
});

function sprawdzPoprawnosc(tytul, tresc) {
  poleTytul.classList.remove("niepoprawne");
  poleTresc.classList.remove("niepoprawne");
  bladPola.textContent = "";

  if (tytul === "") {
    poleTytul.classList.add("niepoprawne");
    bladPola.textContent = "Tytul nie moze byc pusty";
    poleTytul.focus();
    return false;
  }

  if (tytul.length < 3) {
    poleTytul.classList.add("niepoprawne");
    bladPola.textContent = "Tytul musi miec co najmniej 3 znaki";
    poleTytul.focus();
    return false;
  }

  if (tresc === "") {
    poleTresc.classList.add("niepoprawne");
    bladPola.textContent = "Tresc nie moze byc pusta";
    poleTresc.focus();
    return false;
  }

  return true;
}

async function wyslij(tytul, tresc) {
  ustawStatus("Wysylanie...", "");
  przyciskWyslij.disabled = true;

  try {
    const odpowiedz = await fetch(ADRES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // JSON.stringify zamienia obiekt na tekst, bo przez siec leci tylko tekst
      body: JSON.stringify({ title: tytul, body: tresc, userId: 1 })
    });

    if (!odpowiedz.ok) {
      throw new Error(`Serwer odpowiedzial kodem ${odpowiedz.status}`);
    }

    // serwer odsyla to, co przyjal, razem z nadanym przez siebie numerem id
    const utworzony = await odpowiedz.json();

    odpowiedzPre.textContent = JSON.stringify(utworzony, null, 2);
    ustawStatus(`Zapisano, status ${odpowiedz.status}, nadane id: ${utworzony.id}`, "ok");

    dopiszDoListy(utworzony);
    formularz.reset();
    poleTytul.focus();
  } catch (blad) {
    ustawStatus("Nie udalo sie wyslac danych", "blad");
    odpowiedzPre.textContent = String(blad);
    console.error(blad);
  } finally {
    // finally wykona sie zawsze, niezaleznie od tego, czy byl blad
    przyciskWyslij.disabled = false;
  }
}

function dopiszDoListy(wpis) {
  const element = document.createElement("li");
  element.innerHTML = `<strong>${wpis.title}</strong><br><span class="mail">${wpis.body}</span>`;
  lista.prepend(element);
}

function ustawStatus(tekst, klasa) {
  status.textContent = tekst;
  status.className = `status ${klasa}`;
}
