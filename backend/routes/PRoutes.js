// routes/priorities.js
const express = require("express");
const router = express.Router();
const { getAIPriority } = require("../controllers/PController");  // Import the AI Priority function

// Route to get AI priority suggestion
router.post("/suggest-priority", getAIPriority);

module.exports = router;
