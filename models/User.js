import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({ // creating a schema for the user collection(blueprint rules)
    name: { type: String, required: true }, // name is a field every user will have, th value must be a string and you must provide a name when creating a user
    email: { type: String, required: true, unique: true } // email is another field for a user, must be type string, you cant create a user without an email
});

const User = mongoose.model("User", userSchema) // creating a model called User, user is the name of the collection in the database and userSchema tells mongoose what structure to enforce when working with User data

export default User;