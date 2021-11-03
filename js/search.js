function displayResults (results, store) {
  const searchResultsSummary = document.getElementById('search-results-summary')
  const searchResultsList = document.getElementById('search-results-list')
  if (results.length) {
    searchResultsSummary.innerHTML = results.length + ' results found for <b>' + q + '</b>:'
    let resultList = ''
    // Iterate and build result list elements
    for (const n in results) {
      const item = store[results[n].ref]

      // linked title
      resultList += '<li><b><a href="' + item.url + '">' + item.title + '</a></b>'

      // breadcrumbs
      resultList += '<br><small>(' + item.breadcrumbs + ')</small>'

      // garden description snippet
      resultList += '<br>' + item.content.replace(/^(.|\n)*Garden Description /, '').substring(0, 150) + '...</li>'
    }
    searchResultsList.innerHTML = resultList
  } else {
    searchResultsSummary.innerHTML = 'No results found for <b>' + q + '</b>'
    searchResultsList.innerHTML = ''
  }
}

// Get the query parameter(s)
const params = new URLSearchParams(window.location.search)
let q = params.get('q')

// Perform a search if there is a query
if (q) {

  // Retain the search input in the form when displaying results
  window.setTimeout((function(){document.getElementById('search-input').setAttribute('value', q)}), 500)

  const idx = lunr(function () {
    this.ref('id')
    this.field('title', {
      boost: 10
    })
    this.field('content')

    for (const key in window.store) {
      this.add({
        id: key,
        title: window.store[key].title,
        //tags: window.store[key].category,
        content: window.store[key].content
      })
    }
  })

  // Only return results that contain ALL query terms
  qall = '+' + q.split(' ').join(' +')

  try {
    // Perform the search
    const results = idx.search(qall)
    // Update the list with results
    displayResults(results, window.store)
  }
  catch {
    const searchResultsSummary = document.getElementById('search-results-summary')
    searchResultsSummary.innerHTML = 'Error parsing the query <b>' + q + '</b>'
    searchResultsList = document.getElementById('search-results-list').innerHTML = ''
  }
}
