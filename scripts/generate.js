const fs = require("fs");
const path = require("path");
const assert = require("assert");

const medicines = [];

const DIR_PATH = `${process.cwd()}/data` 
fs.readdirSync(DIR_PATH).forEach(file => {
  const filePath = path.join(DIR_PATH, file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  if(json.label !== 'medicine') return;
  medicines.push({
    name: json.name,
    brand: json.brand,
    generic: json.generic,
    labels: json.labels,
    description: json.description,
    link: json.link
  });
});

// validate medicine data
medicines.forEach((med)=> {
  assert(
    typeof med.name === "string", 
    `At ${JSON.stringify(med)} Got Unexpected ${typeof med.name} type expected type is 'string'`
  );
  assert(
    typeof med.brand === "string", 
    `At ${JSON.stringify(med)} Got Unexpected ${typeof med.brand} type expected type is 'string'`
  );
  assert(
    typeof med.link === "string", 
    `At ${JSON.stringify(med)} Got Unexpected ${typeof med.link} type expected type is 'string'`
  );
  assert(
      typeof med.labels === "object",
      `At ${JSON.stringify(med)} Got Unexpected ${typeof med.labels} type expected type is 'string'`
  );
  // assert(
  //   typeof med.description === "string", 
  //   `At ${JSON.stringify(med)} Got Unexpected ${typeof med.description} type expected type is 'string'`
  // );
  // assert(typeof med.generic === "string", `At ${JSON.stringify(med)} Got Unexpected ${typeof med.generic} type expected type is 'string'`);
});

console.log(medicines.length);
console.log(medicines.filter(ele => ele.description === undefined || ele.generic === undefined).length);

// copy all alphabet files
const PROCESSED_DIR = `${process.cwd()}/processed`;
if(!fs.existsSync(PROCESSED_DIR))
  fs.mkdirSync(PROCESSED_DIR);

Array.from('abcdefghijklmnopqrstuvwxyz').forEach(alphabet => {
  fs.copyFileSync(`${DIR_PATH}/${alphabet}.json`, `${PROCESSED_DIR}/${alphabet}.json`);
});

const medLen = fs.readdirSync(PROCESSED_DIR).map(file => {
  const filePath = path.join(PROCESSED_DIR,file);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}).reduce((acc, curr)=> acc + curr.length, 0);

console.log(medLen);


