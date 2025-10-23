import Agent from "../models/Agent.js";
import bcrypt from "bcryptjs";

export const createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const agent = await Agent.create({ name, email, mobile, password: hashed });
  res.json(agent);
};

export const listAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};
