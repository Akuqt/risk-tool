declare namespace Express {
  export interface Request {
    userName: string;
    id: string;
    role: string;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_ACCESS: string;
    JWT_REFRESH: string;
    MONGODB_URI: string;
    MONGODB_URI_TEST: string;
    NODE_ENV: "production" | "development" | "test";
  }
}
