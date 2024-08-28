const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

router.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;

    const newTeam = new Team({
      name,
      members,
    });

    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Failed to create the team" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("members");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ message: "Failed to fetch the team" });
  }
});

module.exports = router;
