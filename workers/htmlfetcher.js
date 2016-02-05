var archive = require('../helpers/archive-helpers');

// Download all new sites


archive.readListOfUrls(function (newUrls) {
  newUrls.forEach(function (url) {
    archive.isUrlArchived(url, function (is) {
      if (!is) {
        archive.downloadUrls([url]);
      }
    });
  });
});
