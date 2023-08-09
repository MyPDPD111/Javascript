
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import User from "../models/User";

export const requiredSignin = expressJwt({
    secret: "123456",
    algorithms: ["HS256"],
    userProperty: "task"
});


export const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).json({success: false, message: 'Access token not found'})
    }
    try {
        const decoded = jwt.verify(token.slice(1, token.length - 1), "123456")
        console.log("decoded", decoded);
        const user = await User.findOne({ _id: decoded._id});
        console.log(user);
        if(user.role !== 'admin') {
            return res.status(401).json({ message: false, message: 'Invalid Admin'})
        }
        req._id = decoded._id
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({success: false, message: "Invalid token"})
    }
}

export const isAuth = (req, res, next) => {

    
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log("saddsadasdasdas", user);
    if (!user) {
        res.status(403).json({
            messenger: "Truy cập bị từ chối"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    console.log(req.profile.role);
    if (req.profile.role !== 'admin') {
        return res.status(403).json({
            messenger: "Bạn không có quyền truy cập"
        })
    }
    next();
}
export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec(); // tìm user dựa trên ID
        req.profile = user;
        next();
    } catch (error) {
        res.status(400).json({
            msg: 'User không tồn tại'
        })
    }

}
export const read = (req, res) => {
    const user = req.profile;
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
}