export const errors = {
  invalidAuth: { code: 6000, message: "Invalid auth type." },
  invalidLogin: {
    code: 6001,
    message: "Invalid username or password.",
  },
  invalidRegister: {
    code: 6002,
    message: "Username is already taken or you pass invalid params.",
  },
  generic: {
    code: 5000,
    message: "Something went wrong.",
  },
};
