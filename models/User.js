import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    email: String,
    username: String,
    image: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;