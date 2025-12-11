const { User } = require("./models");

async function showUsers() {
  const users = await User.findAll();
  console.log(users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    password: u.password
  })));
}

showUsers();
