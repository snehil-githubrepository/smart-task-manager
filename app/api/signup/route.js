import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    const usersFilePath = path.join(process.cwd(), "app", "data", "users.json");
    const usersFileContent = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(usersFileContent);

    console.log("we are here");

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists." }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };

    users.push(newUser);
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    return new Response(
      JSON.stringify({ message: "User registered successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
