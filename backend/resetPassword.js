const bcrypt = require("bcrypt");
const { User } = require("./models");

async function resetPassword() {
  try {
    const user = await User.findOne({ where: { email: "admin4@gmail.com" } });

    if (!user) {
      console.log("User not found");
      return;
    }

    const hashed = await bcrypt.hash("admin123", 10);

    user.password = hashed;
    await user.save();

    console.log("Password reset successfully to admin123");
  } catch (err) {
    console.error(err);
  }
}

resetPassword();
