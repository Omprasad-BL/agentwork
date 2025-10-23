import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  entries: [
    {
      firstName: String,
      phone: String,
      notes: String,
    },
  ],
});

export default mongoose.model("DistributedList", listSchema);
