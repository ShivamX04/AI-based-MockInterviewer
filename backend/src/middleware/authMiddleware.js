import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) => {
    try{
        const token = req.cookies.token;

        console.log("COOKIE:", req.cookies);
        console.log("TOKEN:", req.cookies?.token);

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Login required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );
        req.user = { _id: decoded.user };

        next();

    } catch(error){
        res.status(401).json({
            success: false,
            message: "Invalid token",
        })
    }
}
