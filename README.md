# Projekt demonstracyjny do lekcji 1–5 i 9

Zaawansowane tworzenie aplikacji webowych, technikum.
Same pliki statyczne, bez Node.js i bez instalowania bibliotek.

## Uruchomienie

Najprościej w VS Code z rozszerzeniem **Live Server**: kliknij prawym na `index.html`
w katalogu głównym i wybierz *Open with Live Server*.

Można też z terminala, jeśli na pracowni jest Python:

```
python -m http.server 8000
```

a potem otworzyć `http://localhost:8000` w przeglądarce.

**Nie otwieraj plików podwójnym kliknięciem.** Adres zaczynający się od `file://`
blokuje pobieranie lokalnego pliku `dane/users.json` i część przykładów przestanie działać.
To zresztą dobry moment, żeby powiedzieć uczniom, skąd bierze się ten błąd.

## Zawartość

```
index.html             spis treści, stąd zaczynasz
styl.css               wspólne style, żeby przykłady nie były brzydkie

lekcja 1
01-statyczna/          strona statyczna, punkt odniesienia
02-devtools/           trzy żądania do serwera, w tym jedno błędne

lekcja 2
03-uzytkownicy/        gotowa aplikacja pobierająca dane z API
04-szkielet/           ten sam projekt z lukami dla uczniów
05-rozwiazania/        kod dla prowadzącego

lekcja 3
06-formularz/          formularz, walidacja, żądanie POST
07-formularz-szkielet/ wersja z lukami

lekcja 4
08-stan/               stan aplikacji, funkcja rysuj, delegacja zdarzeń
09-stan-szkielet/      wersja z lukami

lekcja 5
10-moduly/             podział na api.js, stan.js, widok.js, main.js
11-moduly-szkielet/    działający monolit do rozbicia na pliki

lekcja 9
12-przed/              cały widok w jednej wielkiej funkcji
13-komponenty/         ten sam efekt, widok złożony z komponentów
14-komponenty-szkielet/ punkt wyjścia do ćwiczenia

dane/users.json        kopia danych na wypadek braku internetu
dane/zadania.json      dane startowe dla wersji z modułami
```

Dla lekcji 3, 4 i 5 nie ma osobnego katalogu z rozwiązaniami. Rolę rozwiązań pełnią
wersje gotowe, czyli katalogi 06, 08 i 10.

## Jak tego użyć na lekcji

**Lekcja 1, około 15 minut na końcu.**

1. Otwórz `01-statyczna`. Pokaż `Ctrl+U` i pustą zakładkę Network po filtrze Fetch/XHR.
2. Otwórz `02-devtools`, włącz F12, zakładka Network, kliknij przycisk.
   Omów kolumny Name, Method, Status, Type. Pokaż zakładkę Response przy żądaniu do `/users`.
3. Zwróć uwagę na trzecie żądanie, które kończy się kodem 404. Zapytaj klasę,
   czy strona się zepsuła. Nie zepsuła, bo kod przewiduje taką sytuację.

**Lekcja 2.**

1. Pokaż działającą wersję `03-uzytkownicy`. Najpierw efekt, potem kod.
2. Otwórz `03-uzytkownicy/app.js` i przejdź przez niego linia po linii.
   Kluczowe miejsca: `await fetch`, sprawdzenie `odpowiedz.ok`, `await odpowiedz.json()`,
   `map` przy budowaniu listy.
3. Uczniowie kopiują katalog `04-szkielet` do siebie i uzupełniają pięć zadań.
   Zadania 1 do 4 są obowiązkowe, piąte dla chętnych.
4. Kto skończy wcześniej, bierze zadania rozszerzające z konspektu.

**Lekcja 3.**

1. Pokaż `06-formularz`. Najpierw usuń tymczasowo `e.preventDefault()` i wyślij formularz,
   żeby zobaczyli przeładowanie strony i dane w pasku adresu. Przywróć i pokaż różnicę.
2. Wyślij poprawny wpis, otwórz Network i omów: metoda POST, zakładka Payload, status 201,
   nadane przez serwer `id` w odpowiedzi.
3. Uczniowie pracują na `07-formularz-szkielet`.

**Lekcja 4.**

1. Pokaż `08-stan`. W konsoli wpisz `zadania`, potem `zadania.push(...)`, potem `rysuj()`.
   Widać, że stan i ekran to dwie różne rzeczy i że jedno dogania drugie.
2. Przejdź przez `app.js`, zwracając uwagę na to, że `innerHTML` występuje wyłącznie
   w funkcji `rysuj`.
3. Uczniowie pracują na `09-stan-szkielet`. Kryterium zaliczenia jest jedno:
   nigdzie poza `rysuj` nie ma przypisania do `innerHTML`.

**Lekcja 5.**

1. Pokaż `10-moduly`. Dodaj zadanie, odśwież stronę, pokaż zakładkę Application.
2. Przejdź po czterech plikach i pokaż, że każdy ma jedną odpowiedzialność.
3. Uczniowie pracują na `11-moduly-szkielet`. To działający monolit, który mają
   najpierw uzupełnić o zapis, a potem rozbić na pliki.

**Lekcja 9.**

1. Otwórz `12-przed/widok.js` na rzutniku i poproś, żeby ktoś wskazał przycisk usuwania.
   Szukanie trwa kilkanaście sekund i to jest cały argument za komponentami.
2. Pokaż `13-komponenty`. Aplikacja działa identycznie, ale `widok.js` ma kilkanaście linii.
   W konsoli wpisz `K.Zadanie({ id: 1, tresc: "Test", priorytet: "niski", zrobione: false })`.
3. W `13-komponenty/komponenty.js` zmień napis na przycisku usuwania. Jedna linia,
   a zmiana widoczna wszędzie.
4. Uczniowie pracują na `14-komponenty-szkielet`. Pliki `stan.js` i `main.js` są tam
   identyczne jak w `12-przed`, więc zmieniają wyłącznie `widok.js` i `komponenty.js`.

## Doświadczenia, które warto celowo wywołać

- **Usuń `await` przed `odpowiedz.json()`.** W konsoli pojawi się `Promise`, a lista będzie
  pusta. Świetna ilustracja tego, po co jest `await`.
- **Zepsuj adres API**, na przykład `usersss`. Zadziała obsługa błędu i wyświetli się
  komunikat zamiast pustej strony.
- **Wyłącz sieć** w zakładce Network (tryb Offline). Wersja z katalogu 03 przełączy się
  na dane lokalne i pokaże czerwony status. Przy okazji widać, po co pisze się `try/catch`.
- **Przenieś `<script>` do sekcji head bez `defer`.** `getElementById` zwróci `null`
  i wszystko przestanie działać. Wyjaśnienie: skrypt wykonał się, zanim powstał dokument.

## Uwagi

Dane pochodzą z JSONPlaceholder, darmowego API testowego bez rejestracji i bez limitów
istotnych przy pracy z klasą. Jeśli szkolna sieć blokuje ten adres, przykłady z katalogu 03
i tak zadziałają na kopii lokalnej z katalogu `dane`, a w katalogu 04 wystarczy podmienić
`ADRES_API` na `"../dane/users.json"`.
