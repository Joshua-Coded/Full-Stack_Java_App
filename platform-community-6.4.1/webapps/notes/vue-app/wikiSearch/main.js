import './initComponents.js';

export function formatSearchResult(results,term) {
  if (results && results.jsonList && results.jsonList.length) {
    results = results.jsonList.map(note => {
      note.title = note.title.replace(new RegExp(`(${term})`, 'ig'), '<span class="searchMatchExcerpt">$1</span>');
      note.excerpt = $('<div />').html(note.excerpt).text().replace(new RegExp(`(${term})`, 'ig'), '<span class="searchMatchExcerpt">$1</span>');
      return note;
    });
  }
  return results;
}
