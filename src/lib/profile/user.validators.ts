export const userNameValidator = (name: string): string | null => {
  const trimmed = name.trim();

  if (!trimmed) return "Name is required";
  
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return "Name can only contain letters and spaces";
  }
  if (trimmed.length < 3) return "Name must be at least 3 characters";

  return null;
};

export const userEmailValidator = (email: string): string | null => {
  const trimmed = email.trim();

  if (trimmed === "") return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return "Invalid email address";
  }

  return null;
};
