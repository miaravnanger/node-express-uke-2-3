//imports
//third party imports
const path = require("path");
const express = require("express");
const populateRoutes = require("./routes").populateRoutes;

const { configureCors } = require("./cors.config");

const app = express();

//Port definition
const PORT = process.env.PORT || 3500;

// Configure CORS
configureCors(app);

// Set up routes
populateRoutes(app);

// ...catch-all => 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));