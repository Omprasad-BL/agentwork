export const validateAgent = (agent) => {
  const errors = {};
  if (!agent.name) errors.name = "Name required";
  if (!agent.email.includes("@")) errors.email = "Invalid email";
  if (!agent.mobile.match(/^\+\d{1,3}\d{7,}$/))
    errors.mobile = "Invalid mobile number";
  return errors;
};
