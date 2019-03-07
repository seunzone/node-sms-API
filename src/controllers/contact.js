import Contact from '../models/contact';
import Sms from '../models/sms';
import Status from '../models/status';
/**
 * @class ContactController
 *
 * @export
 *
 */
export default class contactController {
  /**
   * @description - Adds a new contact
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof contactController
   *
   * @returns {object} Class instance
   */
  async newContact(req, res) {
    try {
      const newContact = new Contact(req.body);

      // Save new contact
      const contact = await newContact.save();

      return res.status(201).json(contact);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  /**
   * @description - Delete a contact
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof contactController
   *
   * @returns {object} Class instance
   */
  async deleteContact(req, res) {
    try {
      // Get contact id from params
      const { contactId } = req.params;
      // Find and delete contact
      await Contact.findByIdAndRemove(contactId);
      // delete the sms of the user
      await Sms.deleteMany({ sender: contactId });
      await Sms.deleteMany({ receiver: contactId });
      await Status.deleteMany({ contact: contactId });
      return res.status(200).send({ message: 'Contact deleted' });
    } catch (err) {
      return res.status(400).json({ error: 'Cannot find or delete this Contact' });
    }
  }
}
