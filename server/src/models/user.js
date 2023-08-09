import mongoose from 'mongoose';
import {v4 as uuid4} from "uuid";
import { createHmac } from "crypto";

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: 'member'
    },
    history: {
        type: Array,
        default: []
    },
    address: String,
    hashed_password: {
        type: String,
    },
    salt: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png'
    }
}, { timestamps: true, collection: 'Users' });

userSchema.virtual('password')
    .set(function (password) {
        this.salt = uuid4();
        this.hashed_password = this.encryPassword(password);
    });
userSchema.methods =  {
    authenticate(password) {
        return this.encryPassword(password) == this.hashed_password;
    },
    encryPassword(password) {
        if (!password) return;
        try {
            return createHmac('sha256', this.salt)
                    .update(password)
                    .digest("hex");
        } catch (error) {
            console.log(error);
        }
    }
}


export default mongoose.model('Users', userSchema);