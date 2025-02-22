import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    try {
        const token = req.header['authorization']?.split(' ')[1];

        if(!token){
            return res.status(401).json({message: "User is not auth."});
        }

        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) =>{
                if(err){
                    return res.status(403).json({ message: "Invalid or Expired token." });
                }

                req.user = decoded;
                next();
            }
        );

    } catch (error) {
        console.log("Error authenticating user", error);
    }
};

export default authenticateToken;