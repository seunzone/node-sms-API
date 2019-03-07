import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const contactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    unique: true,
    required: true,
  },
}, {
  timestamps: true
});


export default mongoose.model('contact', contactSchema);
