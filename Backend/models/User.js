import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({ // creating a schema for the user collection(blueprint rules)
    name: { type: String, required: true }, // name is a field every user will have, th value must be a string and you must provide a name when creating a user
    email: { type: String, required: true, unique: true, index: true }, // email is another field for a user, must be type string, you cant create a user without an email
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});

//hash password before saving
userSchema.pre("save", async function (next) { // Before saving a User document, run this function
    if (!this.isModified("password")) return next();   // If the password field hasn't changed (e.g., just updating name/email), skip hashing
    this.password = await bcrypt.hash(this.password, 10);   // If it *is* a new password or a changed one, hash it using bcrypt with 10 salt rounds
    next();   // Call next() to move on to saving the document after hashing is done
})

// Add comparePassword method
userSchema.methods.comparePassword = function (candidatePasword) { // Add a method to the User model that lets us compare a plain text password with the hashed one in the database

    return bcrypt.compare(candidatePasword, this.password);
      // Use bcrypt's compare function to check if the input password matches the stored hashed password
  // candidatePassword = what the user typed in (plain text)
  // this.password = the hashed password stored in the database

}

const User = mongoose.model("User", userSchema) // creating a model called User, user is the name of the collection in the database and userSchema tells mongoose what structure to enforce when working with User data

export default User;