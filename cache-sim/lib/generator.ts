// for (let i = 0; i < 1_000_000; i++) {
//   const p = Math.random();
//   if (p <= 0.35) {
//     const address = memoryGenerator.getAddress();
//     const hit = L1Cache.access(address);
//     if (hit) {
//       cycles++;
//     } else {
//       cycles += 1 + memoryGenerator.getCyclesToNextLevel();
//     }
//   } else {
//     cycles++;
//   }
// }
