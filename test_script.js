 /* eslint-disable no-console */

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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
    console.log(`Found ${result.rows.length} person(s) by the name ${name}:`);
    result.rows.forEach((person, i) => {
      console.log(`-${i + 1}: ${person.first_name} ${person.last_name}, born ${dateFormat(person.birthdate)}`);
    });
}
const searchName = (name) => {
    console.log("Searching...");
    client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [name] , (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      printResults(result, name);
      client.end();
    });
}

if(name) {
    client.connect((err) => {
        if (err) {
          return console.error("Connection Error", err);
        }
        searchName(name);
    });
} else {
    console.log("Please specifiy a name to search for!");
    console.log("Program will now end!");
}
