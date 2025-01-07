class UserValidator {
  static userSchema = {
    email: {
      isEmail: {
        errorMessage: "Invalid email address",
      },
      normalizeEmail: true, // Нормалізує email
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: "Password must be at least 3 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "Name must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    lastname: {
      notEmpty: {
        errorMessage: "Lastname is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "Lastname must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
  };
}

export default UserValidator;
