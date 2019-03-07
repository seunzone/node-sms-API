
import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const statusSchema = new Schema({
  status: {
    type: String,
    trim: true
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  sms: {
    type: Schema.Types.ObjectId,
    ref: 'sms'
  }
});

export default mongoose.model('status', statusSchema);
