import supertest from "supertest";
import app from "../../src/app.js";
import * as userFactory from "../factories/userFactory.js";

export async function duplicateEmail() {
  const body = userFactory.formatBodyCreateUser();

  await supertest(app).post("/sign-up").send(body);
  const result = await supertest(app).post("/sign-up").send(body);

  expect(result.status).toEqual(409);
}

export async function invalidBodyEmail() {
  const { password } = userFactory.formatBodyCreateUser();

  const result = await supertest(app)
    .post("/sign-up")
    .send({ email: "", password });

  expect(result.status).toEqual(422);
}

export async function invalidBodyPassword() {
  const { email } = userFactory.formatBodyCreateUser();

  const result = await supertest(app)
    .post("/sign-up")
    .send({ email, password: "" });

  expect(result.status).toEqual(422);
}
