import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Defines a POST route at /register for user signup
router.post("/register", async (req, res) => {

    try {
        const { name, password, role } = req.body; // Destructure user info from the request body (sent from frontend)
        const email = req.body.email.toLowerCase();
        // Create a new User instance using the provided data
        // The password will get hashed automatically by the pre-save hook
        const newUser = new User({ name, email, password, role });

        await newUser.save() // Save the new user to the database (this triggers the pre-save hook to hash the password)

        res.status(201).json({ message: "User registered" }) // Respond with a 201 Created status and a success message

    } catch (err) {
        // If something goes wrong (e.g. duplicate email, missing fields), send a 400 Bad Request
        res.status(400).json({ error: err.message })
    }
});

// Defines a POST route at /login for user authentication
router.post("/login", async (req, res) => {
    const email = req.body.email.toLowerCase();
    const { password } = req.body; // Step 1: Extract email and password from the request body (submitted by the user)

    const user = await User.findOne({ email }); // Step 2: Look up the user in the database by email


    if (!user || !(await user.comparePassword(password))) { // Step 3: If the user is not found, or the password doesn't match the hashed one — return 401 Unauthorized

        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Step 4: If email and password match, generate a JWT token
    const token = jwt.sign(
        { id: user._id, role: user.role }, // payload: info we want to embed in the token
        process.env.JWT_SECRET, // secret key to sign the token (from .env file)
        { expiresIn: "2h" }); // token will expire in 2 hours

    // Step 5: Respond with the token and some basic user info
    res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

export default router;