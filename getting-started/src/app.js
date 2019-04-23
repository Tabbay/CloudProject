/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'Y0AM91WVVL',
  'f1216651a0a4cdaf9d9fb92e4687b80d'
);

const search = instantsearch({
  indexName: 'reviews',
  searchClient,
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();
