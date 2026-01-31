export const userNameValidator = (name: string): string | null => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 3) return "Name must be at least 3 characters";
  return null;
};

export const userEmailValidator = (email: string): string | null => {
  if (email.trim() === "") return null;
  if (!email.includes("@")) return "Invalid email address";
  return null;
};
