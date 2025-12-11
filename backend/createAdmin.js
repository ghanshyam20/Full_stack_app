const bcrypt = require("bcrypt");
const { User } = require("./models");

async function createAdmin() {
  const hashed = await bcrypt.hash("admin123", 10); // PASSWORD

  const user = await User.create({
    name: "Admin",
    email: "admin4@gmail.com",
    password: hashed,
    role: "admin"
  });

  console.log("Admin created:", user.email);
}
createAdmin();
