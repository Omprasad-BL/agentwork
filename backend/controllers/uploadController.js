import csv from "csv-parser";
import fs from "fs";
import Agent from "../models/Agent.js";
import DistributedList from "../models/DistributedList.js";

export const uploadAndDistribute = async (req, res) => {
  try {
    const agents = await Agent.find();
    if (agents.length < 1) return res.status(400).json({ message: "No agents found" });

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Remap CSV columns to your schema
        results.push({
          firstName: data.FirstName,
          phone: data.Phone,
          notes: data.Notes,
        });
      })
      .on("end", async () => {
        // Remove previous assignments (optional for each upload)
        await DistributedList.deleteMany({});

        const chunkSize = Math.ceil(results.length / agents.length);
        for (let i = 0; i < agents.length; i++) {
          const entries = results.slice(i * chunkSize, (i + 1) * chunkSize);
          if (entries.length > 0) {
            await DistributedList.create({ agentId: agents[i]._id, entries });
          }
        }
        res.json({ message: "Lists distributed successfully" });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
