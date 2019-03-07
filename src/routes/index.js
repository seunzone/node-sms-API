import * as ContactController from '../controllers/contact';
import {
  validateContact,
  returnJsonErrors,
} from '../middleware/validator';

const contact = new ContactController.default();

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to the SMS API');
  });
  app.post('/api/v1/contacts', validateContact, returnJsonErrors, contact.newContact);
  app.delete('/api/v1/contacts/:contactId', contact.deleteContact);
};
export default routes;
