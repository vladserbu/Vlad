/*jshint node: true */
'use strict';

var config = require('../../../config/config'),
	elements,
	commands;

elements = {
	body: 'body.category-page',
	heading: '[data-qa-id="offer-heading-main"]',
	moreCodes: '.cross-links h3',
	relatedMerchantCodes: '.cross-links ul',
	firstRelatedMerchant: '.cross-links li:nth-child(1)',
	moreCodesLogo: '.cross-links .left-col b:nth-child(1)',
	moreCodesAnim: 'aside.block-link div.left-col b:nth-child(2)',
	browseByStore: '[data-qa-id="browse-by-store-title"]',
	letters: '[data-qa-id="browse-by-store-letters-list"]',
	firstLetter: '[data-qa-id="browse-by-store-letter-a"]',
	popularStoresHeader: '.popular-stores h2',
	popularStoresParagraph: '.popular-stores p',
	popularStores: '.popular-stores ul',
	firstPopularStore: '.popular-stores ul li:nth-child(1)',
	firstOffer: '.code .button-wrapper-inner a:first-of-type',
	firstOfferViewAll: 'a.view-all',
	moreGreatOnlineCodes: '.cross-links',
	randomStore: '.popular-stores li a',
	moreGreatOnlineCodesImage: '.cross-links b:first-of-type',
	termsAndConditions: '.toggle-terms',
	expandedTermsAndConditions: '.terms.tp-small',
	viewAllMerchantVoucherCodes: '.offer-module .view-all',
	collapsedTermsAndConditions: '.offer-data'
};

commands = {
	clickRandomCode: function (browser) {
		browser.elements('xpath', '//article', function (offers) {
			var randomOffer = Math.floor((Math.random() * offers.value.length + 1));
			return this.click('article:nth-child(' + randomOffer + ') > div.offer-border > div.offer-details > div.header-wrapper > h3 > a');
		});

		return this;
	},

	saveRandomCode: function (browser) {
		browser.elements('css selector', 'article', function (offers) {
			var randomOffer = Math.floor((Math.random() * offers.value.length + 1));
			this.click('article:nth-child(' + randomOffer + ') a.js-save');
			browser.expect.element('article:nth-child(' + randomOffer + ') a.js-save').to.have.attribute('class').to.contain('selected').before(config.timeout);
		});

		return this;
	},


	verifySwitchTabs: function (browser) {
		browser
			.waitForElementVisible('body', config.timeout)
			.windowHandles(function (result) {
				browser.verify.equal(result.value.length, 2);
				this.switchWindow(result.value[1]);
			});

		return this;
	},

	assertDisplayed: function (browser) {
		this
			.verify.visible('@heading')
			.verify.visible('@moreCodes')
			.verify.visible('@moreCodesLogo')
			.verify.visible('@relatedMerchantCodes')
			.verify.visible('@firstRelatedMerchant')
			.verify.visible('@browseByStore')
			.verify.visible('@letters')
			.verify.visible('@popularStoresHeader')
			.verify.visible('@popularStoresParagraph')
			.verify.visible('@popularStores')
			.verify.visible('@firstPopularStore');

		browser.elements('css selector', 'article', function (offers) {
			offers.value.forEach(function (offer, i) {
				var j = i + 1;

				this
					.verify.visible('article:nth-of-type(' + j + ') a.save')
					.verify.visible('article:nth-of-type(' + j + ') .merchant-logo')
					.verify.visible('article:nth-of-type(' + j + ') h3.tp-offertitle')
					.verify.visible('article:nth-of-type(' + j + ') .button-wrapper-inner a:first-of-type')
					.verify.visible('article:nth-of-type(' + j + ') ul.icon-row li:nth-child(1)')
					.verify.visible('article:nth-of-type(' + j + ') .offer-comments-trigger svg')
					.verify.visible('article:nth-of-type(' + j + ') .offer-comments-trigger span');
			}, this);
		});

		return this;
	}
};

module.exports = {
	url: config.baseUrl + 'featured-voucher-codes.html',
	commands: [commands],
	elements: elements,
	sections: {}
};

