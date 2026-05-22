# HabitTracker
Here's the full build plan. Each step produces something testable before moving to the next.
 
---
 
**STEP 1 — Project Setup**
> "Set up a new React project with BoardGame.io installed. Create a basic app that renders a hexagonal grid of 19 tiles using a hex grid library (recommend Honeycomb.js or react-hexgrid). Each tile should display its coordinates. No game logic yet, just a working visual hex board I can open in the browser."
 
---
 
**STEP 2 — Terrain Tiles**
> "I have a React hex grid app. Add 6 terrain types to the tiles: forest, flower field, river, open land, flooded, and rocky. Each terrain should have a distinct background color. Randomly assign terrain types to the 19 tiles on load. Each tile should also have a biomass production value: forest=3, flower field=2, river=2, open land=1, flooded=1, rocky=0. Display the production number on each tile."
 
---
 
**STEP 3 — BoardGame.io Game State**
> "Add BoardGame.io to my React hex grid app. Define a game with 2 players. Each player has: biomass (start at 10), health (start at 20), attack (start at 5). Define 5 named phases in order: EventPhase, ProductionPhase, ActionPhase, DangerPhase, MaintenancePhase. For now each phase just logs its name and advances to the next automatically. Show the current phase name and both players' stats on screen."
 
---
 
**STEP 4 — Presence Markers + Movement**
> "In my BoardGame.io React game, add presence markers. Each player starts with one marker placed on opposite sides of the hex grid. In the ActionPhase, the active player can click their marker then click an adjacent tile to move it, costing 1 biomass per tile. Enforce adjacency — only highlight valid tiles when a marker is selected. Multiple players can occupy the same tile. Show each player's markers as colored circles on the board."
 
---
 
**STEP 5 — Production Phase**
> "In my BoardGame.io game, implement the ProductionPhase. When this phase runs: each occupied tile produces its biomass value. If one player occupies it, they get the full amount. If two players share a tile, split it proportionally by their attack value (round down). Add the produced biomass to each player's counter. After production runs, automatically advance to ActionPhase. Log what each player earned this round."
 
---
 
**STEP 6 — Combat**
> "In my BoardGame.io game, add combat to the ActionPhase. When two players share a tile, the active player can declare combat. Combat resolves like this: compare total attack values, the lower one takes damage equal to the difference and their marker moves to an adjacent tile of their choice. If equal, it's a draw and both stay. If a player's health reaches 0 they are eliminated and their markers removed. Add a simple combat log showing what happened."
 
---
 
**STEP 7 — Seasons**
> "In my BoardGame.io game, add a season system. The game cycles through Spring, Summer, Autumn, Winter. Each season lasts one full round of all 5 phases. Apply these modifiers: Spring adds +4 to all tile production and players draw 7 cards (just a counter for now). Summer +6 production, 9 cards. Autumn +2 production, 5 cards. Winter no production bonus, movement costs doubled, 3 cards. Show the current season on screen and apply the correct modifier during ProductionPhase."
 
---
 
**STEP 8 — The Apex Predator**
> "In my BoardGame.io game, add the Apex Predator. It is a special marker (different color) that starts on a random tile. In the DangerPhase it moves one tile toward the nearest player marker (use hex distance to calculate). If it lands on a tile with a player marker, that player loses 5 health or must move their marker to an adjacent tile — show a prompt letting them choose. In Autumn it moves twice. Display the Apex Predator on the board at all times."
 
---
 
**STEP 9 — Basic Cards**
> "In my BoardGame.io game, add a basic card system. Create a deck of 15 action cards with these effects: 3x Deal 3 damage to enemy hero, 3x Gain 5 biomass, 3x Move a marker 2 tiles for free, 3x Add +3 attack this combat, 3x Heal 4 health. Each player draws 3 cards on game start. Display cards as clickable rectangles in the player's hand area. During ActionPhase, clicking a card plays it and applies its effect. Discard after use."
 
---
 
**STEP 10 — Hero Board UI**
> "In my BoardGame.io React game, create a proper Hero Board panel for each player. It should display: player name, current health (with a visual bar), current attack value, current biomass, cards in hand (count), and current season. Style it cleanly so both players' boards are visible at the same time — one on each side of the screen. Connect all values to live game state so they update in real time."
 
---
 
**STEP 11 — Traps**
> "In my BoardGame.io game, add Trap cards. A trap is played face-down onto a tile the player currently occupies. Other players can see that a trap exists on the tile but not what it does. When any player enters the tile or combat begins there, the trap triggers first before combat. Create 3 trap types: Poison (target takes 1 damage for 3 turns), Bleed (lose 1 biomass for 3 turns), Snare (marker cannot move for 2 turns). Add these to the deck and handle the trigger logic."
 
---
 
**STEP 12 — Lingering Conditions**
> "In my BoardGame.io game, implement lingering conditions. Each player can have: Poison (1 damage per turn, 3 turns), Bleed (lose 1 biomass per turn, 3 turns), Venom (lose 2 attack, 2 turns), Constrict (cannot move markers, 1 damage per turn while active). At the start of each player's turn in ActionPhase, tick down all active conditions and apply their effects. Show active conditions as small icons on each player's Hero Board with the remaining turn count."
 
---
 
**A few tips before you start:**
 
- Save your code somewhere (GitHub is ideal) after each step
- Test each step before moving to the next
- If a step produces an error, paste the error + the relevant code back into a new session
- Keep this prompt list handy — it's your roadmap
