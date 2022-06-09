// function areYouPlayingBanjo(name) {
//   // Implement me
//   const dict = ["R", "r"];
//   let arr = name.split("");\
//   let play = "plays banjo";
//   let notPlay = "does not play banjo";
//   let result;

//   for (let i = 0; i < dict.length; i++) {
//     if (arr[0] === dict[i]) {
//       result = `${name} ${play}`;
//       break;
//     } else {
//       result = `${name} ${notPlay}`;
//     }
//   }

//   //   console.log(result);
//   return result;
// }

// function squareOrSquareRoot(array) {
//   let result = [];
//   array.forEach((el, i) => {
//     if (Number.isInteger(Math.sqrt(el))) {
//       result.push(Math.sqrt(el));
//     } else {
//       result.push(el * el);
//     }
//   });
//   return result;
// }

// console.log(squareOrSquareRoot([4, 3, 9, 7, 2, 1]));

// function findNeedle(haystack) {
//   // your code here
//   let result;

//   haystack.map((el, i) => {
//     // console.log(el);
//     if (el === "needle") {
//       result = `found the needle at position ${i}`;
//     }
//   });
//   return result;
// }

// console.log(findNeedle(["3", "123124234", undefined, "needle", "world", "hay", 2, "3", true, false]));

// function sameCase(a, b) {
//   const lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
//   const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   let first = undefined;
//   let second = undefined;

//   for (let i = 0; i < lowerCase.length; i++) {
//     if (a === lowerCase[i]) {
//       first = "l";
//     }
//     if (b === lowerCase[i]) {
//       second = "l";
//     }
//   }
//   for (let i = 0; i < upperCase.length; i++) {
//     if (a === upperCase[i]) {
//       first = "u";
//     }
//     if (b === upperCase[i]) {
//       second = "u";
//     }
//   }

//   if (!first || !second) {
//     return -1;
//   }

//   if (first === second) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

// console.log(sameCase("C", "B"));

// function sumDigits(number) {
//   const arr = number.toString().split("");
//   console.log(arr);
//   return Math.abs(+arr[0]) + Math.abs(+arr[1]);
// }

// console.log(sumDigits(-10));

// function isValidIP(str) {
//   if (str.split("").length < 1) return false;

//   let result = true;

//   if (str.split(".").length === 4) {
//     const arr = str.split(".");
//     console.log(arr);
//     arr.forEach((el) => {
//       if (isNaN(el)) {
//         result = false;
//       }
//       if (el.split("")[0] == 0) {
//         if (el.split("").length > 1) {
//           //   console.log("masuk");
//           result = false;
//         }
//       }
//       if (el < 0 || el > 255) {
//         console.log(el);
//         result = false;
//       }
//       if (el === "" || el === " ") {
//         result = false;
//       }
//       //   console.log(el);
//       //   console.log(el.split(""));
//       el.split("").forEach((ul) => {
//         // console.log("masuk");
//         // console.log(ul);
//         if (ul === "\n") {
//           result = false;
//         }
//         if (ul === " ") {
//           result = false;
//         }
//         if (isNaN(ul)) {
//           //   console.log("masuk");
//           result = false;
//         }
//       });
//     });
//     return result;
//   } else result = false;
//   return result;
// }

// // console.log(isNaN("\n"));

// console.log(isValidIP("36.135.4."));

// const removeDuplicateIds = (obj) => {
//   //
//   const key = Object.keys(obj);
//   const arrFiltered = [];
//   console.log(key);

//   for (let i = 0; i < key.length - 1; i++) {
//     let arr = obj[key[i]];
//     // console.log(arr);
//     for (let j = i + 1; j < key.length; j++) {
//       let arr2 = obj[key[j]];
//       let notDuplicate = [];
//       for (let k = 0; k < arr.length; k++) {
//         let validation = true;
//         for (let l = 0; l < arr2.length; l++) {
//           if (arr[k] === arr2[l]) {
//             validation = false;
//           }
//         }
//         if (validation) {
//           notDuplicate.push(arr[k]);
//         }
//       }
//       arr = notDuplicate;
//     }
//     arrFiltered.push(arr);
//   }
//   arrFiltered.push(obj[key[key.length - 1]]);

//   const newArr = arrFiltered.map((el, i) => {
//     let result = [];
//     el.forEach((ul) => {
//       let validation = true;
//       result.forEach((il) => {
//         if (ul === il) {
//           validation = false;
//         }
//       });
//       if (validation) {
//         result.push(ul);
//       }
//     });
//     return result;
//   });

//   let newObj = {
//     ...obj,
//   };
//   newArr.forEach((el, i) => {
//     newObj[key[i]] = el;
//   });

//   return newObj;
// };

// const obj = {
//   432: ["A", "A", "B", "D"],
//   53: ["L", "G", "B", "C"],
//   236: ["L", "A", "X", "G", "H", "X"],
//   11: ["P", "R", "S", "D"],
// };

// console.log(removeDuplicateIds(obj));
// removeDuplicateIds(obj);

// function duplicateCount(text) {
//   //...
//   let repeatedChar = [];
//   let arr = text.toLowerCase().split("");

//   for (let i = 0; i < arr.length; i++) {
//     let counter = 0;
//     for (let j = 0; j < arr.length; j++) {
//       if (arr[i] === arr[j]) {
//         counter++;
//       }
//     }

//     if (counter > 1) {
//       let validation2 = false;
//       for (let j = 0; j < repeatedChar.length; j++) {
//         if (arr[i] === repeatedChar[j]) {
//           validation2 = true;
//         }
//       }
//       if (!validation2) {
//         repeatedChar.push(arr[i]);
//       }
//     }
//   }
//   return repeatedChar.length;
// }

// console.log(duplicateCount("aabbcde"));
// duplicateCount("aabbcde");

// function findOutlier(integers) {
//   //your code here
//   let even = [];
//   let odd = [];

//   integers.forEach((el) => {
//     if (el % 2 === 0) {
//       odd.push(el);
//     } else {
//       even.push(el);
//     }
//   });
//   //   console.log(even, odd);
//   if (even.length === 1) return even[0];
//   else if (odd.length === 1) return odd[1];
// }

// console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]));
//   findOutlier([2, 4, 0, 100, 4, 11, 2602, 36])

// function generateHashtag(str) {
//   if (!str || str === " ") return false;

//   let arr = str.split(" ");

//   let safeArr = [];
//   arr.forEach((el) => {
//     if (el !== "") safeArr.push(el);
//   });
//   console.log(safeArr);

//   let newArr = safeArr.map((el) => {
//     let arr2 = el.split("");
//     arr2[0] = arr2[0].toUpperCase();
//     return arr2.join("");
//   });

//   let result = `#${newArr.join("")}`;
//   if (result.length >= 140) return false;
//   return result;
// }

// console.log(generateHashtag("code" + " ".repeat(140) + "wars"));

//LATIHAN SOAL MASUK GOTO

// function readVowels(string) {
//   const dict = "aiueo".split("");
//   let result = [];
//   string
//     .toLowerCase()
//     .split("")
//     .forEach((el, i) => {
//       dict.forEach((ul) => {
//         if (el === ul) {
//           result.push(i + 1);
//         }
//       });
//     });
//   return result;
// }

// // console.log(readVowels("aaaaaaaaaaaaapakaaaaaaaaaahKauT"));

// function randomNumber(num, max) {
//   let result = [];
//   for (let i = 0; i < num; i++) {
//     result.push(Math.floor(Math.random() * max));
//   }
//   return result;
// }

// // console.log(randomNumber(11, 10));

// function tripleNumber(arr) {
//   let result;
//   arr.forEach((el) => {
//     let counter = 0;
//     let position = [];
//     arr.forEach((ul, i) => {
//       if (el === ul) {
//         counter++;
//         position.push(i + 1);
//       }
//     });
//     if (counter === 3) {
//       result = position;
//     }
//   });
//   return result || "not found";
// }

// // console.log(tripleNumber(randomNumber(11, 5)));

// const dessert = {
//   type: "pie",
// };
// dessert.type = "pudding";

// const seconds = dessert;
// seconds.type = "fruit";

// console.log(dessert);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const arr3 = [...arr1, ...arr2];
console.log(arr3);
