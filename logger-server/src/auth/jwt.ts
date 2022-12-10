import jwt from "jsonwebtoken";

const jwtKey = "keyyyyy";

export const generateAuthToken = (
  user: any
): { token: string; refreshToken: string } => {
  const token = jwt.sign({ email: user.email }, jwtKey, {
    expiresIn: "1m",
    header: { alg: "HS256", typ: "accessJWT" },
  });
  const refreshToken = jwt.sign({ email: user.email }, "refreshToken", {
    expiresIn: "10m",
    header: { alg: "HS256", typ: "refreshJWT" },
  });

  return { token: token, refreshToken: refreshToken };
};

export const verifyToken = (token: string): string => {
  try {
    const tokenData = jwt.verify(token, jwtKey);
    console.log(tokenData);
    console.log("___>", tokenData);
    return tokenData as string;
  } catch (error) {
    throw error;
  }
};
