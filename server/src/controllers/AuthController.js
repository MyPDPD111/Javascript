import jwt from "jsonwebtoken";

import User from '../models/User';


export const createOrUpdateUser = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOneAndUpdate({ email }, req.body, { returnNewDocument: true });
    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name,
            picture
        }).save();
        res.json(newUser);
    }
}
export const currentUser = async (req, res) => {
    const { _id } = req;
    const user = await User.findOne({_id: _id});
    res.json({
        success: true,
        user
    })
}

export const signup = async (req,res) => {
    try {
        const userData = await User.findOne({email: req.body.email})
        if(userData){
            res.json({
                error: error,
                messenger: "Email đã có người sử dụng, vui lòng thử lại"
            });
        }else{
            const user = await new User(req.body).save();
            res.json(user);
        }
        
    } catch (error) {
        res.json({
            error: error,
            messenger: "Tạo tài khoản thất bại"
        })
    }
    
}
export const signin = async (req,res) => {
    const {email,password} = req.body;
   const user = await User.findOne({email}).exec();
   if (!user) {
        res.json({
            messenger: "Tài khoản không tồn tại"
        });
   }
   if (!user.authenticate(password)) {
       res.json({
           messenger: "Tài khoản hoặc mật khẩu không chính xác"
       });
   }

   const token = jwt.sign({_id: user._id}, "123456");
   res.cookie("token",token,{expire: new Date() + 9999});

    res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            email: user.email
        }
    });
}
export const signout = (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công"
    })
}


export const getUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

export const updateUser = async (req, res) => {
    try {
        const UpdateConditions = { _id: req.params.id}
        const updateUser = await User.findOneAndUpdate(UpdateConditions, req.body, {new: true})
        if(!updateUser){
            return res.status(401).json({success: false, message: 'User not authorised to update user'})
        }
        return res.status(200).json({success: true, message: 'User updated user successfully', user: updateUser})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}