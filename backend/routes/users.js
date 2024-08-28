const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      domain,
      gender,
      available,
    } = req.query;

    const searchQuery = search
      ? {
          $or: [
            { first_name: { $regex: search, $options: "i" } },
            { last_name: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const filters = {
      ...(domain && { domain }),
      ...(gender && { gender }),
      ...(available && { available: available === "true" }),
    };

    const users = await User.find({
      ...searchQuery,
      ...filters,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments({
      ...searchQuery,
      ...filters,
    });

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
