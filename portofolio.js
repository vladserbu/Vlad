/*jshint node: true */
'use strict';

var config = require('../../../config/config');

module.exports = {
   beforeEach: function (browser) { // this will be executed before each test case
      browser.page.top20Page()
         .navigate()
         .waitForElementVisible('@logo', config.timeout);
      browser
         .resizeWindow(1024, 768);
   },
   '@tags': ['regression'],

   'test20CodesAreVisible': function (browser) {  // this function will verify if there are 20 voucher codes displayed on the page, its using a callback function
      browser.elements('css selector', 'article', function (result) {
         browser.assert.equal(result.value.length, 20);
      });
   },
   'testOnlineCodeButton': function (browser) {
      browser.page.top20Page()
         .waitForElementVisible('@firstOffer', config.timeout)
         .click('@firstOffer');
      browser
         .windowHandles(function (result) {
         browser.verify.equal(result.value.length, 2);
         this.switchWindow(result.value[1]);
      });

      browser.page.codeFrontPage()
         .waitForElementVisible('@codeFront', config.timeout)
         .assertDisplayed(browser);
      browser.end()
   },

   'testMoreGreatOnlineCodes': function (browser) {
      browser.page.top20Page()
         .waitForElementVisible('@moreGreatOnlineCodes', config.timeout)
         .click('@randomStore');
      browser.page.merchantPage()
         .waitForElementVisible('@followButton', config.timeout);
      browser.end()
   },

   'testViewAllMerchantLink': function (browser) {
      browser.page.top20Page()
         .waitForElementVisible('@viewAllMerchantVoucherCodes', config.timeout)
         .assert.containsText('@viewAllMerchantVoucherCodes', 'View all')
         .assert.containsText('@viewAllMerchantVoucherCodes', 'voucher codes')
         .click('@viewAllMerchantVoucherCodes');
      browser.page.merchantPage()
         .waitForElementVisible('@followButton', config.timeout);
      browser.end()
   },

   'testIsImageDisplayedMoreGreatOnlineCodes': function (browser) {
      browser.page.top20Page()
         .waitForElementVisible('@moreGreatOnlineCodesImage', config.timeout);
      browser.end()
   },

   'testClickPopularStores': function (browser) {
      browser.page.top20Page()
         .waitForElementVisible('@popularStores', config.timeout);
      browser.page.popularStores().clickRandomMerchant(browser);
      browser.page.merchantPage()
         .waitForElementVisible('@followButton', config.timeout);
      browser.end()
   },

   'testBrowseByStore': function (browser) {
      browser.page.top20Page()
         .waitForElementVisible('@browseByStore', config.timeout);
      browser.page.browseByStore().clickRandomLetter(browser, function (result) {
         browser.assert.urlContains('all-voucher-codes-' + result + '.html');
      });

      browser.end()

   },

   'testIsTermsNConditionsDisplayedForOffer': function (browser) {
      browser.page.top20Page()
         .click('@termsAndConditions')
         .waitForElementVisible('@expandedTermsAndConditions', config.timeout)
         .assert.containsText('@termsAndConditions', 'Terms & Conditions')
         .click('@termsAndConditions')
         .waitForElementVisible('@collapsedTermsAndConditions', config.timeout);
      browser.end()

   }
};
