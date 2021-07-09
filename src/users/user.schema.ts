import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from './interface/user.interface';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre<IUser>('save', function(next){
    let user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
})

UserSchema.methods.comparePassword = function(attempt, callback){

    return callback(null, bcrypt.compareSync(attempt, this.password));
}; 