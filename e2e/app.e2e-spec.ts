import { SystemeInfPage } from './app.po';

describe('systeme-inf App', () => {
  let page: SystemeInfPage;

  beforeEach(() => {
    page = new SystemeInfPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
