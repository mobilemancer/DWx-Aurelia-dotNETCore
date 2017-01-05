describe('DroidWorx', function () {
    beforeEach(function () {
        browser.loadAndWaitForAureliaPage('http://localhost:5000');
    });
    it('should show the home page', function () {
        var title = browser.getTitle();
        expect(title).toEqual('Home | Droid Worx');
    });
    it('should navigate to droids list', function () {
        var nav = element(by.id('#/droids')).click();
        browser.waitForRouterComplete();
        var title = browser.getTitle();
        expect(title).toEqual('Droids | Droid Worx');
    });
});
