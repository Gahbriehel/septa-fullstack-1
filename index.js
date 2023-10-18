const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const itemRoutes = require("./routes/items.route");
const indexRoute = require("./routes/index.route");
const port = 3000;

/*
// FIREBASE
const  initializeApp  = require("firebase/app");
import { getAnalytics } from "firebase/analytics";

*/

app.use(express.json());
app.use("/", indexRoute);
app.use("/items", itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
