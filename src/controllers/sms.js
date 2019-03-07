import Contact from '../models/contact';
import Sms from '../models/sms';
import Status from '../models/status';

/**
 * @class smsController
 *
 * @export
 *
 */
export default class smsController {
  /**
   * @description - Manage a new sms
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof contactController
   *
   * @returns {object} Class instance
   */
  async newSms(req, res) {
    try {
      // Get the contact id from the params
      const { contactId } = req.params;
      const newSMS = new Sms(req.body);
      // Find the id of the sender
      const sender = await Contact.findById(contactId);
      // check if sender contact exist
      if (!sender) {
        return res.status(404).json({ message: 'Sender not found' });
      }
      newSMS.sender = sender;
      // Find the phone number of the reciever
      const receiver = await Contact.findOne({ phoneNumber: req.body.receiver });
      // Check if receiver contact exist
      if (!receiver) {
        return res.status(404).json({ message: 'Cannot find user with this mobile number' });
      }
      // Check if sender phone number and reciever is the same
      if (sender.phoneNumber === receiver.phoneNumber) {
        return res.status(400).json({ message: 'You cannot send a message to yourself' });
      }
      // Assign receiver data to new sms
      newSMS.receiver = receiver;
      // Save new sms
      await newSMS.save();
      // Create new recieved status
      const receivedStatus = new Status({
        contact: receiver,
        sms: newSMS,
        status: 'Received'
      });
      // Create new sent status
      const sentStatus = new Status({
        contact: sender,
        sms: newSMS,
        status: 'Sent'
      });

        // Save new status
      await receivedStatus.save();
      await sentStatus.save();

      return res.status(201).json(newSMS);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  /**
   * @description - Get sent sms
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof contactController
   *
   * @returns {object} Class instance
   */
  async getSentSms(req, res) {
    try {
      // Get contact id from the params
      const { contactId } = req.params;
      // Get all user sent sms
      const sentSMS = await Status.find({
        contact: contactId,
        status: 'Sent'
      }).populate('sms');
      return res.status(200).json(sentSMS);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
