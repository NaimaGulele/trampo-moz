// Form validation utilities

export const validateEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

export const validatePassword = (password, minLength = 6) => {
  return password.length >= minLength;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9\-\(\)\+\s]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateSalary = (salary) => {
  const numSalary = parseFloat(salary);
  return !isNaN(numSalary) && numSalary > 0;
};

export const validateFormField = (fieldName, value) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateSignUpForm = (name, email, password, confirmPassword) => {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Full name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (!validatePasswordMatch(password, confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateJobPostForm = (title, location, salary, description) => {
  const errors = {};

  if (!title || title.trim() === "") {
    errors.title = "Job title is required";
  }

  if (!location || location.trim() === "") {
    errors.location = "Location is required";
  }

  if (!salary) {
    errors.salary = "Salary is required";
  } else if (!validateSalary(salary)) {
    errors.salary = "Please enter a valid salary";
  }

  if (!description || description.trim() === "") {
    errors.description = "Job description is required";
  }

  return errors;
};
