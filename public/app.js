const searchClient = algoliasearch('Y0AM91WVVL', 'f1216651a0a4cdaf9d9fb92e4687b80d');

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

search.start();

// // Create a render function
// const renderSearchBox = (renderOptions, isFirstRender) => {
//   const { query, refine, clear, isSearchStalled, widgetParams } = renderOptions;
//
//   if (isFirstRender) {
//     const input = document.createElement('input');
//
//     const loadingIndicator = document.createElement('span');
//     loadingIndicator.textContent = 'Loading...';
//
//     const button = document.createElement('button');
//     button.textContent = 'X';
//
//     input.addEventListener('input', event => {
//       refine(event.target.value);
//     });
//
//     button.addEventListener('click', () => {
//       clear();
//     });
//
//     widgetParams.container.appendChild(input);
//     widgetParams.container.appendChild(loadingIndicator);
//     widgetParams.container.appendChild(button);
//   }
//
//   widgetParams.container.querySelector('input').value = query;
//   widgetParams.container.querySelector('span').hidden = !isSearchStalled;
// };
//
// // create custom widget
// const customSearchBox = instantsearch.connectors.connectSearchBox(
//   renderSearchBox
// );
//
// // instantiate custom widget
// search.addWidget(
//   customSearchBox({
//     container: document.querySelector('#searchbox'),
//     placeholder: 'Search',
//   })
// );
//
//
// // Create the render function
// const renderHits = (renderOptions, isFirstRender) => {
//   const { hits, widgetParams } = renderOptions;
//
//   widgetParams.container.innerHTML = `
//     <ul>
//       ${hits
//         .map(
//           item =>
//             `<li>
//               ${instantsearch.highlight({ attribute: 'name', hit: item })}
//             </li>`
//         )
//         .join('')}
//     </ul>
//   `;
// };
//
// // Create the custom widget
// const customHits = instantsearch.connectors.connectHits(renderHits);
//
// // Instantiate the custom widget
// search.addWidget(
//   customHits({
//     container: document.querySelector('#hits'),
//   })
// );



// search.addWidget(
//   instantsearch.widgets.hits({
//     container: '#hits',
//     hitsPerPage:3,
//     templates:{
//       item: document.getElementById('hit-template').innerHTML,
//       empty: "we didn't find any results <em>\"{{query}}\" </em>"
//     }
//   })
// );

// search.start();
