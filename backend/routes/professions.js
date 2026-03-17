const express = require("express");
const router = express.Router();
const professions = require("../data/professions");

router.get("/all", (req, res) => {
    res.json(professions);
});

router.get("/", (req, res) => {
    const search = (req.query.search || "").toLowerCase();

    const results = professions
        .filter(p => p.toLowerCase().includes(search))
        .slice(0, 8);

    res.json(results);
});

module.exports = router;