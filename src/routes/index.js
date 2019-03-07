import * as ContactController from '../controllers/contact';
import * as SmsController from '../controllers/sms';
import {
  validateContact,
  returnJsonErrors,
  validateSms,
  validateContactUser,
  validateContactId
} from '../middleware/validator';

const contact = new ContactController.default();
const sms = new SmsController.default();

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to the SMS API');
  });
  // API endpoits to create and delete contacts
  app.post('/api/v1/contacts', validateContact, returnJsonErrors, validateContactUser, contact.newContact); // create contact
  app.delete('/api/v1/contacts/:contactId', contact.deleteContact); // delete contact
  // API endpoints to manage sms
  app.post('/api/v1/sms/:contactId', validateSms, returnJsonErrors, sms.newSms);
  app.get('/api/v1/sms/sent/:contactId', validateContactId, sms.getSentSms);
};
export default routes;
