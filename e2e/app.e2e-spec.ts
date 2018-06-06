import { CalCalcPage } from './app.po';

describe('calcalc App', () => {
  let page: CalCalcPage;

  beforeEach(() => {
    page = new CalCalcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
