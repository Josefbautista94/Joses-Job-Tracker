import jwt from "jsonwebtoken"; // Bring in the JWT library so we can verify tokens

// Middleware to protect routes — only accessible with a valid token
export const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;  // Get the Authorization header from the incoming request

    // Check if it exists and starts with 'Bearer '
    if (!authHeader?.startWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" }); // If not, reject with 401 Unauthorized

    }

    try {
        const token = authHeader.split(" ")[1]; // Split the header to get the token: "Bearer tokenHere" → ["Bearer", "tokenHere"]

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key from .env

        req.user = decoded; // Attach the decoded user data to the request object (e.g. id, role)

        next(); // Move on to the next middleware or route handler

    } catch (err) {
        res.status(403).json({ message: "Invalid token" })  // If the token is invalid or expired, return 403 Forbidden

    }
};
// Middleware to restrict access to admin-only routes
export const adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {  // Check if the logged-in user is not an admin

        return res.status(403).json({ message: "Admins only!" })    // If not an admin, reject the request

    }
    next();  // User is an admin — continue to next middleware or route

}