import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies); // Log cookies
        const token = req.cookies.token; // Extract the token

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated (No token)",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        console.log("Decoded token:", decoded); // Log decoded token

        req.id = decoded.userId; // Attach the user ID to the request
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("Authentication error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired",
                success: false,
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        return res.status(500).json({
            message: "Authentication failed",
            success: false,
        });
    }
};
export default isAuthenticated;
