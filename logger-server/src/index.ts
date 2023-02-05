import { Prisma, PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { env } from "process";
import { authMiddleware } from "./auth/auth.middleware";
import { generateAuthToken } from "./auth/jwt";
import { comparePassword } from "./auth/passwordHash";
import jwt from "jsonwebtoken";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  cors({
    allowedHeaders: [
      "sessionId",
      "Content-Type",
      "Authorization",
      "authorization",
    ],
    //exposedHeaders: ["sessionId"],

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
    preflightContinue: false,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});
app.get("/api/v1/allCustomers", async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json({ data: customers });
});
app.post("/api/v1/customers", async (req, res) => {
  const createCustomer = await prisma.customer.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      invoice: req.body.invoice,
      oib: req.body.oib,
      payed: req.body.payed,
      createdAt: new Date(),
      note: req.body.note || null,
    } as Prisma.CustomerCreateInput,
  });
  res.json({ data: createCustomer });
});
app.get("/api/v1/customerById/:id", async (req, res) => {
  const { id } = req.params;

  const customerById = await prisma.customer.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json({ data: customerById });
});

app.put("/api/v1/customer/:id", async (req, res) => {
  const { id } = req.params;

  const updateCustomer = await prisma.customer.update({
    where: { id: Number(id) },
    data: {
      createdAt: new Date(),
      invoice: req.body.invoice,
      name: req.body.name,
      payed: req.body.payed,
    },
  });
  res.json({ data: updateCustomer });
});

app.delete("/api/v1/delete-customer/:id", async (req, res) => {
  const { id } = req.params;

  const deleteCustomer = await prisma.customer.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ data: deleteCustomer });
});

app.post("/api/v1/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!userExists) {
    res.status(401).send("User not exist");
    return;
  }
  // validate the password
  const validPassword = comparePassword(
    password,
    userExists?.password as string
  );

  if (!validPassword) {
    res.status(401).send("Invalid password");
    return;
  }

  // generate the token
  const token = generateAuthToken(userExists);
  await prisma.user.update({
    where: {
      email: email,
    },
    data: { accessToken: token.token, refreshToken: token.refreshToken },
  });

  res.send({
    accessToken: token.token,
    refreshToken: token.refreshToken,
  });
});

app.get("/logged-in", authMiddleware, async (req, res) => {
  res.status(200).send("You are logged in");
});

app.post("/api/auth/refreshToken", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  if (refreshToken === null) return res.status(403).send("There is no JWT!");
  jwt.verify(refreshToken, "refreshToken", async (err: any) => {
    if (err) return res.status(401).send("JWT expired!");

    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    const accessToken = generateAuthToken({ user });

    res.send({ accessToken: accessToken.token });
  });
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
