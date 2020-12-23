module.exports = {
  /*
  | Tetra use cors
  | https://www.npmjs.com/package/cors
  */


  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Set a list of origins to be allowed. The value can be one of the following
  |
  | Boolean: true - Allow current request origin
  | Boolean: false - Disallow all
  | String - Comma seperated list of allowed origins
  | Array - An array of allowed origins
  | String: * - A wildcard to allow current request origin
  | Function - Receives the current origin and should return one of the above values.
  |
  */
  origin: false,

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  |
  | HTTP methods to be allowed. The value can be one of the following
  |
  | String - Comma seperated list of allowed methods
  | Array - An array of allowed methods
  |
  */
  methods: ['GET', 'PUT', 'POST'],

  /*
  |--------------------------------------------------------------------------
  | AllowedHeaders
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Allow-Headers CORS header
  | If not specified, defaults to reflecting the headers specified in the request's
  | Access-Control-Request-Headers header.
  |
  | Expects a comma-delimited string (ex: 'Content-Type,Authorization')
  | or an array (ex: ['Content-Type', 'Authorization']).
  |
  */
  // allowedHeaders: 'Content-Type,Authorization',

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Expose-Headers CORS header.
  | Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range')
  | or an array (ex: ['Content-Range', 'X-Content-Range']).
  | If not specified, no custom headers are exposed.
  |
  */
  // exposeHeaders: '',

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Define Access-Control-Allow-Credentials header. Set to true to pass the header,
  | otherwise it is omitted.
  |
  */
  // credentials: true,

  /*
  |--------------------------------------------------------------------------
  | MaxAge
  |--------------------------------------------------------------------------
  |
  | Define Access-Control-Allow-Max-Age
  | Set to an integer to pass the header, otherwise it is omitted.
  |
  */
  maxAge: 90,

  /*
  |--------------------------------------------------------------------------
  | OptionsSuccessStatus
  |--------------------------------------------------------------------------
  |
  | Provides a status code to use for successful OPTIONS requests,
  | since some legacy browsers (IE11, various SmartTVs) choke on 204
  |
  */
  optionsSuccessStatus: 204,
}
