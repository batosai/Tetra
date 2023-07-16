module.exports = {
  guide: {
    Modules: ['guide/introduction', 'guide/installation', 'guide/inspect'],
    Create: ['guide/tree', 'guide/create', 'guide/override'],
    'Standard Library': [],
    'Third Party Modules': [],
    Docusaurus: ['doc1', 'mdx'],
  },
  api: {
    Basic: ['api/introduction', 'api/routing', 'api/controllers', 'api/sessions', 'api/logger'],
    Security: ['api/security_introduction', 'api/authentication', 'api/CORS', 'api/CSRF', 'api/crypt', 'api/CSP'],
    Database: ['api/db_introduction', 'api/db_commands', 'api/seeds', 'api/migrations'],
    Other: ['api/commands', 'api/sockets', 'api/services', 'api/helpers', 'api/uploaders', 'api/mailers', 'api/webpack', 'api/templates', 'api/cache', 'api/tests']
  }
};
