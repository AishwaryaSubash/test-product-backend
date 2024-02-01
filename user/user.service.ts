import * as argon2 from "argon2";
import { client } from "../prisma-client/prisma";
import { SigninUserDto, SignupUserDto } from "./dto/user.dto";
import { Prisma } from "@prisma/client";

const jwt = require("jsonwebtoken");

async function signupUser(userData: SignupUserDto) {
  try {
    const hash = await argon2.hash(userData.password);
    const user = await client.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hash,
      },
      select: {
        id: true,
        username: true,
      },
    });
    // console.log(user);
    return { created: true, user: user };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { created: false, message: "Username already exists" };
      }
    } else {
      return { created: false, message: e };
    }
    console.log(e);
  }
}

async function signinUser(userData: SigninUserDto) {
  try {
    const userId = await client.user.findFirst({
      where: {
        username: userData.username,
      },
      select: {
        id: true,
      },
    });
    console.log(userId?.id);
    const user = await client.user.findUniqueOrThrow({
      where: {
        id: userId?.id,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    let verified: boolean = false;
    if (userData.username === user.username) {
      if (await argon2.verify(user.password, userData.password)) {
        verified = true;
      }
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...userWithoutPassword } = user;
      //   console.log(userWithoutPassword);
      return { verified: verified, token: token, user: userWithoutPassword };
    } else {
      return {
        verified: verified,
        message: "Username not found!! Create an account",
      };
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { verified: false, message: "Username already exists" };
      }
      if (e.code === "P2023") {
        console.log(e);
        return { verified: false, message: "Invalid credentials" };
      }
    } else {
      return { verified: false, message: e };
    }
    console.log(e);
  }
}

export { signupUser, signinUser };
