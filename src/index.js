const someHost = 'https://cms.rhrn2.com';
const url = someHost + '/wp-content/uploads/multicatalog.json';

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes('application/text')) {
    return response.text();
  } else if (contentType.includes('text/html')) {
    return response.text();
  } else {
    return response.text();
  }
}

async function handleRequest() {
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  const response = await fetch(url, init);
  const results = await gatherResponse(response);
  return new Response(results, init);
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});