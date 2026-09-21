# Crooked Guess — game design (web v1)

Single-file web build: `index.html` (in the gameM folder). Game logic (`randomCode`, `scoreGuess`, `checkSlot`) is pure and separate from the UI, so it can be ported to the app later.

## Core rules
- Secret code of N slots; colours may repeat.
- Player fills all slots and submits a guess.
- **Crooked feedback**: only a count of pegs in the correct colour AND position. Never says which pegs, and never reports right-colour-wrong-place.
- **Hint**: tap Hint, then tap a placed peg -> shows ✓ (right colour for that slot) or ✗ (wrong). Limited per game, does not cost a guess. Re-checking a known slot/colour combo is free. Results stay marked on the pegs, including in past rows.

## Levels
| Level  | Slots | Colours | Guesses | Hints | Time Attack |
|--------|-------|---------|---------|-------|-------------|
| Easy   | 4     | 4       | 12      | 3     | 3:00        |
| Medium | 4     | 6       | 10      | 2     | 4:00        |
| Hard   | 5     | 6       | 10      | 2     | 5:00        |

Easy uses red, blue, green, yellow. Hard and Medium add purple and orange. Tuning of Medium/Hard and the time limits is a first guess and needs playtesting (all in the `LEVELS` table, `time` is in seconds).

## Screens
- **Home**: Start game button, Mode picker (Easy / Medium / Hard), Time Attack switch, sound on/off icon, How to play, stats line for the chosen mode. Choices are remembered.
- **Game**: home (menu) button, help, sound toggle, level chip, guess count, New Game. Leaving a game in progress asks for confirmation. Browser Back returns to the menu (asks first if a game is in progress).

## Time Attack
- Optional switch on the home page; works with any mode.
- Countdown pill + progress bar above the secret. Turns red under 30 s, ticking sound in the last 10 s.
- Clock hitting 0 = loss ("Time's up!"). Clock pauses while the help or leave dialog is open.
- Separate stats per mode for Time Attack, including fastest solve.

## Sound
- All sounds synthesised with Web Audio (no audio files). Sound on/off saved in localStorage.
- Each colour has its own note (C major pentatonic) when placed; guess thud + one rising blip per correct peg; hint yes/no tones; win fanfare; lose "sad trombone"; time-up buzzer.

## Win animation
- Klondike-solitaire style: balls launch from the revealed secret pegs one after another (52 total, like a deck), fall under gravity, bounce off the bottom of the screen and leave trails that fill the screen. Soft note on each bounce. Tap / any key skips to the result dialog; the picture stays behind the dialog. Skipped for prefers-reduced-motion.
- Loss: board shake + lose sound, then the reveal dialog.

## Extras
- Each colour also has a symbol (▲ ● ■ ◆ ★ ✚) for colour-blind players.
- Keyboard: 1-6 place, Backspace erase, Enter guess, H hint, arrows move. Enter on the home page starts.
- Per-level stats (wins, best guesses, fastest time for Time Attack) saved in localStorage.

## Ideas for the app version
- Daily seeded puzzle, haptics on guess, share result, more hint types.