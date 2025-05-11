const path = require("path")
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const {router} = require("./api/auth");
const { adminRouter } = require('./api/admin');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
// Connect MongoDB
connectDB()

// Middleware
const origins = ['https://foreshore.ae','https://www.foreshore.ae', 'http://localhost:3000' ]
app.use(cors({
// origin: (origin, callback) => {
//    if (!origin || origins.includes(origin) || /postman/.test(origin)) {
//      return callback(null, true);  // Allow Postman or no origin
//    }
//    callback(new Error('Not allowed by CORS'), false);
//  },
  origin :"*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Example: Serve 'uploads' route if needed (optional extra)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(bodyParser.urlencoded({
    extended: true
  }));



// Custom Headers Middleware


// Auth APIs
app.use("/api/auth", router);
// Admin APIs
app.use("/api/admin", adminRouter);

app.use("/uploads",express.static("uploads"))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Node.js Project!' });
});
// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});