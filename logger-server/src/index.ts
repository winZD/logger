import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { env } from "process";
import { authMiddleware } from "./auth/auth.middleware";
import { generateAuthToken } from "./auth/jwt";
import { comparePassword } from "./auth/passwordHash";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.post(
  "/login",

  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    console.log(req.headers);

    const { email, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!userExists) {
      res.send("404-Not found");
    }
    // validate the password
    const validPassword = comparePassword(
      password,
      userExists?.password as string
    );
    if (!validPassword) {
      next(console.log("password wrong"));
      res.send({ error: 401 });
    }

    // generate the token
    const token = generateAuthToken(userExists);
    await prisma.user.update({
      where: {
        email: email,
      },
      data: { accessToken: token.token, refreshToken: token.refreshToken },
    });

    res.send({ accessToken: token.token, refreshToken: token.refreshToken });
  }
);

app.get("/logged-in", authMiddleware, async (req, res) => {
  res.status(200).send("You are logged in");
});

/* app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});
app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });
  res.json(result);
});

app.put(`/users/user/:id`, async (req, res) => {
  const { id } = req.params;

  const post = await prisma.user.update({
    where: { id: Number(id) },
    data: { name: "ivan", email: "ivan@gmail.com" },
  });
  res.json(post);
});

app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.json(post);
});
 */

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);
