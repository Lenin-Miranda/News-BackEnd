const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes"); // importa index.js automáticamente
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const { requestLogger, errorLogger } = require("./middleware/logger");
const helmet = require("helmet");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://lenin-miranda.github.io",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"], // ojo aquí: era "alloheaders" antes
  credentials: true,
};

// Conexión MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ connect to MongoDB"))
  .catch((err) => console.error("❌ Erro connecting to MongoDB", err));

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use(requestLogger);

// Rutas
app.use("/", routes); // Todas las rutas estarán centralizadas en /routes/index.js

// Mensaje raíz
app.get("/", (req, res) => {
  res.send("¡The backend is working!");
});

app.use(errorLogger);

app.use(errorHandler);

app.use(helmet());

app.use(rateLimiter);

// Manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
