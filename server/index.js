require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// 1. Database Connection
connectDB();

// 2. Body Parsers (only need one or the other in most cases)
app.use(express.json());              // for JSON payloads
app.use(express.urlencoded({ extended: true })); // for form-urlencoded

// 3. Serve static files (uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. CORS - Pick **ONE** approach (this is the cleanest & recommended)
const corsOptions = {
  origin: "*",                        // ← Change to your actual frontend URL(s) in production!
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// Optional: handle preflight OPTIONS requests explicitly (usually not needed with cors middleware)
app.options("*", cors(corsOptions));

// 5. Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// 6. Optional: Serve React/Vite frontend in production (uncomment & adjust when ready)
// if (process.env.NODE_ENV === "production") {
//   const root = path.join(__dirname, "../robles-front-end/dist");
//   app.use(express.static(root));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(root, "index.html"));
//   });
// }

// 7. 404 handler (good practice)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 8. Global error handler (should be last)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? "Internal Server Error" : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

if (require.main === module) {  // or process.env.NODE_ENV !== 'production'
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
module.exports = app;   