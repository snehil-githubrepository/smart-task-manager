import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Email and password are required.",
        }),
        { status: 400 }
      );
    }

    const usersFilePath = path.join(process.cwd(), "app", "data", "users.json");
    const usersFileContent = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(usersFileContent);

    const user = users.find((user) => user.email === email);
    if (!user) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Invalid email or password.",
        }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Invalid email or password.",
        }),
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "defaultSecretKey",
      {
        expiresIn: process.env.JWT_EXPIRY || "1h",
      }
    );

    return new Response(JSON.stringify({ status: "success", token }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal server error." }),
      { status: 500 }
    );
  }
}
