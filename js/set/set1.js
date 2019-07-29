const C = new Map(10, 10);
const M1 = new Mountain(1, 1);
const M2 = new Mountain(2, 2);
const M3 = new Mountain(3, 3);
const TS1 = new TreasureSpot(4, 4, 1);
const TS2 = new TreasureSpot(4, 5, 2);
// const A1 = new Adventurer(9, 9, 'N', 'Benjent', 'GAAAAADAAAAAADDAAA');
const A1 = new Adventurer(9, 9, 'N', 'Benjent', 'AGAAAAADAAAAADDAAA');
// Start map
// X X X X X X X X X X
// X M X X X X X X X X
// X X M X X X X X X X
// X X X M X X X X X X
// X X X X 1 X X X X X
// X X X X X X X X X X
// X X X X X X X X X X
// X X X X X X X X X X
// X X X X X X X X X X
// X X X X X X X X X A

// End map
// X X X X X X X X X X
// X M X X X X X X X X
// X X M X X X X X X X
// . . . M X X X X X X
// . X . . . . . X X X
// . X X X X X X X X X
// . X X X X X X X X X
// . X X X X X X X X X
// . X X X X X X X X X
// . . . . . . . . . .
const gameSet = new GameSet(C, [M1, M2, M3], [TS1, TS2], [A1]);
gameSet.p = A1; // focus on one player for now