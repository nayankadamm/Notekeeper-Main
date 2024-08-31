const express = require("express");
const app = express();
require("./db/user");
const User = require("./db/config");
app.use(express.json());
var cors = require('cors') 
app.use(cors())


app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"))
app.listen(5000, () => {
  console.log("server started on 5000 port");
});
