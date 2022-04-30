import { prisma } from "../src/database.js";
import * as signUpControllerTest from "./controllers/signUpControllerTest.js";
import * as signInControllerTest from "./controllers/signInControllerTest.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /sign-up", () => {
  it(
    "should return 409 given a duplicate email",
    signUpControllerTest.duplicateEmail
  );

  it(
    "should return 422 given a invalid email",
    signUpControllerTest.invalidBodyEmail
  );

  it(
    "should return 422 given a invalid password",
    signUpControllerTest.invalidBodyPassword
  );
});

describe("POST /sign-in", () => {
  it(
    "should return 409 given a incorrect email",
    signInControllerTest.incorrectEmail
  );

  it(
    "should return 409 given a incorrect password",
    signInControllerTest.incorrectPassword
  );

  it(
    "should return 422 given a invalid email",
    signInControllerTest.invalidBodyEmail
  );

  it(
    "should return 422 given a invalid password",
    signInControllerTest.invalidBodyPassword
  );
});
