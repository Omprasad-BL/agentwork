const AssignTaskSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  listEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // admin
  assignedAt: { type: Date, default: Date.now },
  notes: String,
});
