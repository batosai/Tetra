const Env = require('@tetrajs/core/lib/env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | App Key
  |--------------------------------------------------------------------------
  |
  | App key is a randomly generated 16 or 32 characters long string required
  | to encrypted cookies, sessions and other sensitive data.
  |
  */
  appKey: Env.get('APP_KEY'),

  http: {
    /*
    |--------------------------------------------------------------------------
    | Etag
    |--------------------------------------------------------------------------
    |
    */
    etag: true
  },

  locales: {
    /*
    |--------------------------------------------------------------------------
    | Default Locale
    |--------------------------------------------------------------------------
    |
    */
    default: 'en',

    queryParameter: 'lang',
    cookieName: 'language',
  },

  logger: {
    // https://github.com/winstonjs/winston
    /*
    |--------------------------------------------------------------------------
    | Transport
    |--------------------------------------------------------------------------
    |
    | Transport to be used for logging messages. You can have multiple
    | transports using same driver.
    |
    | Available drivers are: `file` and `console`.
    |
    */
    transport: 'console',
  },

  path: {
    base: ['app'],
    controllers: ['app', 'Controllers'],
    models: ['app', 'Models'],
    middlewares: ['app', 'Middlewares'],
    commands: ['app', 'Commands'],
    uploaders: ['app', 'Uploaders'],
    cache: ['var', 'cache'],
    log: ['var', 'log']
  }
}
