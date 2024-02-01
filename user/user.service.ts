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
    console.log(user);
    return user;
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
    const user = await client.user.findUniqueOrThrow({
      where: {
        id: userData.id,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    let verified: boolean = false;
    if (await argon2.verify(user.password, userData.password)) {
      verified = true;
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY
    );
    const { password, ...userWithoutPassword } = user;
    //   console.log(userWithoutPassword);
    return { token: token, user: userWithoutPassword, verified: verified };
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

export { signupUser, signinUser };
