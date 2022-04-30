import supertest from "supertest";
import app from "../../src/app.js";
import * as userFactory from "../factories/userFactory.js";

export async function incorrectEmail() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: "incorrect" + user.email, password: user.password });

  expect(result.status).toEqual(401);
}

export async function incorrectPassword() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: user.email, password: "incorrect" + user.password });

  expect(result.status).toEqual(401);
}

export async function invalidBodyEmail() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: "", password: user.password });

  expect(result.status).toEqual(422);
}

export async function invalidBodyPassword() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: user.email, password: "" });

  expect(result.status).toEqual(422);
}

async function insertUser() {
  const user = userFactory.formatBodyCreateUser();
  await userFactory.createUser(user);
  return user;
}
