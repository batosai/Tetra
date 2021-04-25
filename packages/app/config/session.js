const Env = require('@tetrajs/core/lib/env')

module.exports = {
  /*
  | Tetra use express-session
  | https://www.npmjs.com/package/express-session
  */

  /*
  |--------------------------------------------------------------------------
  | secret
  |--------------------------------------------------------------------------
  |
  | Required option
  |
  | This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or | an array of multiple secrets. If an array of secrets is provided, only the first element will be used to | | sign the session ID cookie, while all the elements will be considered when verifying the signature in | | | requests.
  |
  */
  secret: Env.get('SESSION_SECRET'),

  /*
  |--------------------------------------------------------------------------
  | name
  |--------------------------------------------------------------------------
  |
  | The name of the session ID cookie to set in the response (and read from in the request).
  |
  | The default value is 'connect.sid'.
  |
  */
  name: 'tetra.sid',

  /*
  |--------------------------------------------------------------------------
  | cookie
  |--------------------------------------------------------------------------
  |
  | Settings object for the session ID cookie.
  |
  | The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }
  |
  */
  // cookie: {
  //   path: '/',
  //   httpOnly: true,
  //   secure: false,
  //   maxAge: null // number in milliseconds
  // }

  /*
  |--------------------------------------------------------------------------
  | proxy
  |--------------------------------------------------------------------------
  |
  | Trust the reverse proxy when setting secure cookies (via the "X-Forwarded-Proto" header).
  |
  | The default value is undefined.
  |
  | true: The "X-Forwarded-Proto" header will be used.
  | false: All headers are ignored and the connection is considered secure only if there is a direct TLS/SSL
  | connection.
  | undefined: Uses the "trust proxy" setting from express
  |
  */
  // proxy: true,

  /*
  |--------------------------------------------------------------------------
  | resave
  |--------------------------------------------------------------------------
  |
  | Forces the session to be saved back to the session store, even if the session was never modified during
  | the request. Depending on your store this may be necessary, but it can also create race conditions where a | client makes two parallel requests to your server and changes made to the session in one request may get
  | overwritten when the other request ends, even if it made no changes (this behavior also depends on what
  | store you're using).
  |
  */
  resave: true,

  /*
  |--------------------------------------------------------------------------
  | saveUninitialized
  |--------------------------------------------------------------------------
  |
  | Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is
  | new but not modified. Choosing false is useful for implementing login sessions, reducing server storage
  | usage, or complying with laws that require permission before setting a cookie. Choosing false will also
  | help with race conditions where a client makes multiple parallel requests without a session.
  |
  */
  saveUninitialized: true,

  /*
  |--------------------------------------------------------------------------
  | rolling
  |--------------------------------------------------------------------------
  |
  | Force the session identifier cookie to be set on every response. The expiration is reset to the original
  | maxAge, resetting the expiration countdown.

  | The default value is false.
  |
  */
  // rolling: false,

  /*
  |--------------------------------------------------------------------------
  | unset
  |--------------------------------------------------------------------------
  |
  | Control the result of unsetting req.session (through delete, setting to null, etc.).
  |
  | The default value is 'keep'.
  |
  | 'destroy' The session will be destroyed (deleted) when the response ends.
  | 'keep' The session in the store will be kept, but modifications made during the request are ignored
  | and not saved.
  |
  */
  // unset: 'keep',

  /*
  |--------------------------------------------------------------------------
  | store
  |--------------------------------------------------------------------------
  |
  | The session store instance, defaults to a new MemoryStore instance.
  |
  */
  // store: new MemoryStore(),

  /*
  |--------------------------------------------------------------------------
  | storeDriver
  |--------------------------------------------------------------------------
  |
  | config store by tetra
  |
  | The default value is 'memory'.
  |
  | 'memory' store instance MemoryStore
  | 'database' store instance in database
  | 'file' store instance in file storage
  |
  */
 storeDriver: 'database',
}
