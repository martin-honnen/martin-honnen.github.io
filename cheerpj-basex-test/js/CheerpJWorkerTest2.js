importScripts("https://cjrtnc.leaningtech.com/3_20250318_631/cj3loader.js");

var lib = null;

(async () => {
  await cheerpjInit();

  lib = await cheerpjRunLibrary("");

  console.log('Worker CheerpJ library initialized');

  const System = await lib.java.lang.System;
  await System.out.println("Hello from Java");
})();