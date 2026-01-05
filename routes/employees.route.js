const { Router } = require("express");

const employeesRouter = new Router();

// Liste over ansatte
employeesRouter.get("/", (req, res) => {
    res.json([]);
});

// Opprette en ansatt
employeesRouter.post("/", (req, res) => {
    const body = req.body;

    console.log("Request body:", body);
    res.json({ success: true, body });
});


// Finne en spesifikk ansatt

// Bruk av path parameters
employeesRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const foo = req.query.foo;

    if (foo === "bar") {
        res.status(400).json({ id, foo, error: "\"bar\" is an invalid value for \"foo\"", success: false });  
        return;  
    }

    res.json({ id, foo, success: true });
});


// Query parameters
// Kommer alltid *etter* "?"
// Hvis det er flere, så separeres disse med "&"

// Query parameter er bygd opp slik:
// [nøkkel]=[verdi]
//

module.exports.employeesRouter = employeesRouter;

