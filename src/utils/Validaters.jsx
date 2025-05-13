// src/utils/formValidation.js

export const validateName = (name) => {
  if (!name.trim()) {
    return "Please enter your name.";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!phone || phone.length < 10) {
    return "Please enter a valid phone number.";
  }
  if (!/^\d+$/.test(phone)) {
    return "Phone number should contain only digits.";
  }
  return "";
};

export const validateClassType = (classType) => {
  if (classType === "Select Class") {
    return "Please select a class.";
  }
  return "";
};

export const validateSubjects = (subjects) => {
  if (subjects.length === 0) {
    return "Please select at least one subject.";
  }
  return "";
};

export const validateBoard = (board) => {
  if (!board) {
    return "Please select a board.";
  }
  return "";
};

export const validateLevel = (level) => {
  if (!level) {
    return "Please select a level.";
  }
  return "";
};

export const validateForm = (formData, selectedClassType, selectedLevel) => {
  return {
    name: validateName(formData.name),
    phone: validatePhone(formData.phone),
    classType: validateClassType(selectedClassType),
    subjects: validateSubjects(formData.subjects),
    board: validateBoard(formData.board),
    level: validateLevel(selectedLevel),
  };
};
