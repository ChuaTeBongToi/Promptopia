import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    }
});

const User = mongoose.model('User', UserSchema) || mongoose.models.User;

export default User;