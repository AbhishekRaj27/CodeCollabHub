const express = require("express");
const router = express.Router();
const {
  getSpaces,
  createSpaces,
  updateSpaces,
  deleteSpaces,
  getSpaceData,
  updateActive,
} = require("../controllers/spaceController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getSpaces);
router.post("/", auth, createSpaces);
router.get("/:id", getSpaceData);
router.put("/:id", updateSpaces);
router.delete("/:id", auth, deleteSpaces);
router.put("/updateActive/:id", updateActive);

module.exports = router;
