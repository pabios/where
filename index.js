import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import route from "./routes/routes.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:4200"
//   ], credentials: true
// }));
const allowedOrigins = [
  "http://localhost:4200",
  "https://monimba.com",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));


app.use(express.json())

// Middleware pour traiter les données POST au format "x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// Uncomment if App start LOCAL
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${ APP_HOSTNAME }:${ APP_PORT }`);
});


// ==========
// Comment else
// ==========
// const PORT = process.env.PORT || 3030;
// app.listen(PORT, () => {
//   console.log(`server started on port ${PORT}`);
// });
