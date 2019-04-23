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

 const firstName = process.argv[2];
 const lastName = process.argv[3];
 const date = new Date(process.argv[4]);
 
 if(firstName && lastName && date) {
   knex('famous_people')
   .returning('first_name', 'last_name', 'dateofbirth')
   .insert({ first_name: firstName, last_name: lastName, birthdate: date })
   .asCallback((err, result) => {
     if(err) {
       console.error(err);
     }
     console.log(`${result}, inserted!`);
     knex.destroy();
   });
 } else {
   console.log("Please make sure you have entered three fields of data!");
 }

