const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
const mongoURI =
  "mongodb+srv://americain:mVmRdazhZgrRChKZ@cluster0.67wbclx.mongodb.net/election?retryWrites=true&w=majority&appName=Cluster0"; // Remplacez par votre URI MongoDB Atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Election Schema
const legislativeSchema = new mongoose.Schema({
  Inscrits: Number,
  Abstentions: Number,
  Votant: Number,
});

const Legislative = mongoose.model("Legislative", legislativeSchema);

// Routes
app.get("/api/legislatives", async (req, res) => {
  try {
    const legislatives = await Legislative.find();
    res.json(legislatives);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/legislatives", async (req, res) => {
  try {
    const newLegislative = new Legislative(req.body);
    const savedLegislative = await newLegislative.save();
    res.json(savedLegislative);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/legislative/:id", async (req, res) => {
  try {
    const updatedLegislative = await Legislative.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLegislative);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/legislatives/:id", async (req, res) => {
  try {
    const updatedLegislative = await Legislative.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLegislative);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/legislatives/:id", async (req, res) => {
  try {
    await Legislative.findByIdAndDelete(req.params.id);
    res.json({ message: "Election deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Serve static files (for the frontend)
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
