const dict1 = require("./dictionary.json");
const dict2 = require("./dictionary2.json");

const dict = {};
for (const w of Object.keys(dict1)) {
  dict[w.toLowerCase()] = dict1[w];
}
for (const w of Object.keys(dict2)) {
  let meaning = "";
  if (dict2[w].length === 1) {
    meaning = dict2[w][0];
  } else {
    for (let i = 0; i < dict2[w].length; ++i) {
      const letter = String.fromCharCode("a".charCodeAt(0) + i);
      meaning += `(${letter}) ${dict2[w][i]}. `;
    }
  }
  if (meaning.length > 3 && !meaning.match("^ISO.*entity$")) {
    dict[w.toLowerCase()] = meaning.trim();
  }
}

let output = "";
let wordout = "";
let rejected = "";

let num = 0;
for (const w of Object.keys(dict).sort()) {
  if (!w.match(new RegExp("^[a-z]([a-z -]*[a-z])?$")) || w.split(' ').length > 2) {
    rejected += w + "\n";
    continue;
  }

  num++;
  wordout += w + "\n";
  output += "\n" + w + "\n" + dict[w] + "\n";
}

output = num + "\n" + output;
wordout = num + "\n" + wordout;

const fs = require("fs");
fs.writeFileSync("input.txt", output);
fs.writeFileSync("words.txt", wordout);
fs.writeFileSync("reject.txt", rejected);
