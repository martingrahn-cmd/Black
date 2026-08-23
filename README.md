# BLÄCK ✒️

Ett vertikalt endless-spel — en blandning av Breakout och flipper där du **ritar flippern med fingret**.
Bollen studsar en gång på varje streck, sen är det förbrukat. Bläcket i marginalen bestämmer hur långt
du får rita. Klättra, kedja kombos och jaga poäng.

Allt i **en enda HTML-fil**: fysik, procedurell bangenerering, syntetiserat ljud och genererad musik
(Web Audio, inga assets), ritat i canvas med rutat papper och kulspetsestetik.

## Spela

Öppna `index.html` i en mobilwebbläsare (byggt för porträttläge och touch, funkar med mus).

- **Rita streck** — bollen studsar, strecket förbrukas
- **Bläcket** i vänstermarginalen är din resurs; plumpar och krossade block fyller på
- **Rött dödar** — taggar är game over
- **Kombo**: allt bollen träffar utan att du ritar nytt är värt mer
- Tiden går långsammare medan du ritar

## Lägen

- **Klättra fritt** — endless med checkpoints var 100:e meter och något nytt upplåst på varje nivå t.o.m. 10
- **Dagens utmaning** — seedad bana ur dagens datum (samma för alla), 500 m till mål, en dagsregel
  (t.ex. *Torrt bläck*, *Blåsigt*), svit-räknare och delbart resultat i Wordle-stil

Rekord, checkpoints och svit sparas i `localStorage`.

## Utveckling

Reglage-knappen i spelet exponerar fysikvärdena live (gravitation, knuff, studs, bläck, tidsbroms).

Headless-test av hela spelloopen (laddning, start, ritning, daily, paus) mot strikta DOM/Canvas/WebAudio-stubbar:

```bash
./tests/run.sh
```

## Status

Spelbar prototyp under aktiv utveckling för [GameVolt.io](https://gamevolt.io).
