import Contact from '../models/contact';
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
}
