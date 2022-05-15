export const errors = {
  badRequest: {
    status: 400,
    message: "Bad request",
  },
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
  noAuthToken: {
    message: "There's no auth token.",
    code: 9090,
  },
  invalidAuthToken: {
    message: "Invalid auth token.",
    code: 9091,
  },
};
