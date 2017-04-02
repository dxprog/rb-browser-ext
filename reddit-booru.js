// Cross-browser reference to the extensions API
var browser = browser || chrome;

var ACTIVE_TAB_QUERY = {
  active: true,
  currentWindow: true
};

/**
 * Opens a new active tab after the current tab to the URL provided
 * @param {String} url The URL to open
 */
function openUrlInNewTab(url) {
  var tabCallback = function tabCallback(tabs) {
    var tab = tabs.shift();
    var index = !!tab ? tab.index + 1 : null;
    browser.tabs.create({
      active: true,
      url: url,
      index: index
    });
  };

  // Chrome and FF have different function signatures for their tabs stuff... bastards.
  if (!!chrome) {
    browser.tabs.query(ACTIVE_TAB_QUERY, tabCallback);
  } else {
    browser.tabs.query(ACTIVE_TAB_QUERY).then(tabCallback);
  }
}

/**
 * Opens a RedditBooru image search
 *
 * @method imageSearch
 * @param {Object} info Object containing information about the image
 */
function imageSearch(info) {
  openUrlInNewTab('http://redditbooru.com/search/?imageUri=' + encodeURIComponent(info.srcUrl));
}

/**
 * Opens up the image rehost dialog on RedditBooru
 *
 * @method imageRehost
 * @param {Object} info Object containing information about the image
 */
function imageRehost(info) {
  openUrlInNewTab('http://redditbooru.com/?dialog=upload&rehost=' + encodeURIComponent(info.srcUrl));
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