import mongoose from 'mongoose';

export default function () {
    mongoose.set('useCreateIndex', true);
    return mongoose.connect('mongodb://localhost/test',  { useNewUrlParser: true });
}