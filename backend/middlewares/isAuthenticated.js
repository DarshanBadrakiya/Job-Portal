import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach user ID to the request object
        req.id = decoded.userId;

        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("Authentication error:", error);

        // Handle specific JWT errors
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

        // Generic error response
        return res.status(500).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
