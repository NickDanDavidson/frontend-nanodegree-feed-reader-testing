/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // This first test suite tests the functionality of the RSS feed reader.
    describe('RSS Feeds', function() {
        /* This test makes sure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* This second test suite tests the visibility of the hidden menu during various
     * situations.
     */
    describe('The menu', function() {
        // This test ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            var body = document.body;

            expect(body.classList).toContain('menu-hidden');
        });

         /* This test ensures the menu changes visibility when the menu icon
          * is clicked. This test has two expectations: does the menu display
          * when clicked and does it hide when clicked again.
          */
        describe('when clicked', function() {
            var icon = document.getElementsByClassName('menu-icon-link')[0],
                body = document.body,
                simulateClick = function() {
                    var event = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    icon.dispatchEvent(event);
                };

            it('displays if hidden', function() {
                simulateClick(); // This opens the menu.
                expect(body.classList).not.toContain('menu-hidden');
            });

            it('hides if displayed', function() {
                simulateClick(); // This closes the menu.
                expect(body.classList).toContain('menu-hidden');
            });
        });
    });

    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within the
         * .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded', function(done) {
            var entry = document.getElementsByClassName('entry')[0],
                feedContainer = document.getElementsByClassName('feed')[0];
            expect(entry).toBeDefined();
            expect(entry.parentNode.parentNode).toBe(feedContainer);
            done();
        });
    });

    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        var feedContainer = $('.feed'),
            firstContainerContent;

        /* First load the first feed asynchronously, then check the content
         * of the feed container and load the second feed.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstContainerContent = feedContainer.children();
                loadFeed(1, done);
            });
        });

        it('changes content', function(done) {
            // Finally, check the content of the feed container again and compare.
            var nextContainerContent = feedContainer.children();
            expect(nextContainerContent.html()).not.toEqual(firstContainerContent.html());
            done();
        });
    });
}());
