const express = require("express");
const app = express();

const port = 8000;

app.listen(port, function (){
    try {
        // await sequelize.authenticate();
        // console.log('Connection has been established successfully.');
        return console.log(`Server berjalan di port ${port}`);
      } catch (error) {
        console.log('Unable to connect to the database:');
      }
});