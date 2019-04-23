 /* eslint-disable no-console */
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


const name = process.argv[2];
const dateFormat = (date) => {
  let formattedDate = '';
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if(day >= 10) {
    formattedDate = `${year}-0${month}-${day}`;
  } else {
    formattedDate = `${year}-0${month}-0${day}`;
  }
  return formattedDate;
}
const printResults = (result, name) => {
  console.log(`Found ${result.length} person(s) by the name ${name}:`);
  result.forEach((person, i) => {
    console.log(`-${i + 1}: ${person.first_name} ${person.last_name}, born ${dateFormat(person.birthdate)}`);
  });
  knex.destroy();
}
const searchName = (name) => {
    console.log("Searching...");
    knex('famous_people').where('first_name', name).orWhere('last_name', name).asCallback((err, result) => {
      if(err) {
        console.error(err);
      }
      printResults(result, name);
    });
}

if(name) {
  searchName(name);
} else {
  console.log("Please specifiy a name to search for!");
  console.log("Program will now end!");
}
