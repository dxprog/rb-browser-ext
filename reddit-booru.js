// Cross-browser reference to the extensions API
var browser = browser || chrome;

/**
 * Opens a RedditBooru image search
 *
 * @method imageSearch
 * @param {Object} info Object containing information about the image
 */
function imageSearch(info) {
  browser.tabs.create({
    active: true,
    url: 'http://redditbooru.com/search/?imageUri=' + encodeURIComponent(info.srcUrl)
  });
}

/**
 * Opens up the image rehost dialog on RedditBooru
 *
 * @method imageRehost
 * @param {Object} info Object containing information about the image
 */
function imageRehost(info) {
  browser.tabs.create({
    active: true,
    url: 'http://redditbooru.com/?dialog=upload&rehost=' + encodeURIComponent(info.srcUrl)
  });
}

// Create the context menus
browser.contextMenus.create({
  title: 'Find similar images',
  contexts: [ 'image' ],
  onclick: imageSearch
});

browser.contextMenus.create({
  title: 'Rehost image',
  contexts: [ 'image' ],
  onclick: imageRehost
});