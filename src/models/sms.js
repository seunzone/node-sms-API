import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const smsSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  }
});

export default mongoose.model('sms', smsSchema);
