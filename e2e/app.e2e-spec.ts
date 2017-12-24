import { AppPage } from './app.po';

<<<<<<< HEAD
describe('ibmrooms-prj App', () => {
=======
describe('ibmrooms App', () => {
>>>>>>> 13974a61bf6f16528d849166bca29e678f74ca98
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
