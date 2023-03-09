addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let response = await fetch(request)

  // clone the response to add headers
  response = new Response(response.body, response)

  // remove the X-Powered-By header
  response.headers.delete('X-Powered-By')

  // define headers and their recommended values
  const headers = {
    'Strict-Transport-Security': 'max-age=2592000; includeSubDomains; preload',
    'Content-Security-Policy': "upgrade-insecure-requests",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'interest-cohort=()'
  }

  // add headers to the response
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value)
  }

  return response
}
