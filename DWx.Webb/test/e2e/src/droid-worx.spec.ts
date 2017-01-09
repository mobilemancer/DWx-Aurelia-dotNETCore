describe('DroidWorx', () => {
    beforeEach(() => {
        browser.loadAndWaitForAureliaPage('http://localhost:5000');
    });

    it('should show the home page', () => {
        const title = browser.getTitle();
        expect(title).toEqual('Home | Droid Worx');
    });

    it('should navigate to droids list', () => {
        const nav = element(by.id('#/droids')).click();
        browser.waitForRouterComplete();

        const title = browser.getTitle();
        expect(title).toEqual('Droids | Droid Worx');
    });
});