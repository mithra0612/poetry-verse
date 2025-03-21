// backend/routes/poemRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

// POST a new poem
router.post("/api/poems", async (req, res) => {
  try {
    console.log("Route hit - POST /api/poems");
    const newPoem = req.body;
    console.log("Received data:", newPoem);

    const docRef = await db.collection("poems").add({
      ...newPoem,
      createdAt: new Date(),
    });

    console.log("Poem saved with ID:", docRef.id);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error saving poem:", error);
    res.status(500).json({ error: "Poem could not be saved." });
  }
});
router.get("/api/poems", async (req, res) => {
  try {
    console.log("Route hit - GET /api/poems");
    const snapshot = await db.collection("poems").get();
    const poems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Poems retrieved:", poems);
    res.status(200).json(poems);
  } catch (error) {
    console.error("Error getting poems:", error);
    res.status(500).json({ error: "Poems could not be retrieved." });
  }
});
router.delete("/api/poems/:id", async (req, res) => {
  try {
    console.log("Route hit - DELETE /api/poems/:id");
    const { id } = req.params;
    console.log("Deleting poem with ID:", id);

    await db.collection("poems").doc(id).delete();

    console.log("Poem deleted successfully");
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting poem:", error);
    res.status(500).json({ error: "Poem could not be deleted." });
  }
});

module.exports = router;
