const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

const types = {
  'audio/aac': {
    extension: '.aac',
    group: 'audio',
    name: 'AAC audio',
  },
  'application/x-abiword': {
    extension: '.abw',
    group: 'document',
    name: 'AbiWord document',
  },
  'application/x-freearc': {
    extension: '.arc',
    group: 'document',
    name: 'Archive document (multiple files embedded)',
  },
  'video/x-msvideo': {
    extension: '.avi',
    group: 'video',
    name: 'AVI: Audio Video Interleave ',
  },
  'application/vnd.amazon.ebook': {
    extension: '.azw',
    group: 'ebook',
    name: 'Amazon Kindle eBook format ',
  },
  'application/octet-stream': {
    extension: '.bin',
    group: 'data',
    name: 'Any kind of binary data',
  },
  'image/bmp': {
    extension: '.bmp',
    group: 'image',
    name: 'Windows OS/2 Bitmap Graphics ',
  },
  'application/x-bzip': {
    extension: '.bz',
    group: 'archive',
    name: 'BZip archive',
  },
  'application/x-bzip2': {
    extension: '.bz2',
    group: 'archive',
    name: 'BZip2 archive ',
  },
  'application/x-csh': {
    extension: '.csh',
    group: 'script',
    name: 'C-Shell script',
  },
  'text/css': {
    extension: '.css',
    group: 'script',
    name: 'Cascading Style Sheets (CSS)',
  },
  'text/csv': {
    extension: '.csv',
    group: 'document',
    name: 'Comma-separated values (CSV)',
  },
  'application/msword': {
    extension: '.doc',
    group: 'document',
    name: 'Microsoft Word',
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extension: '.docx',
    group: 'document',
    name: 'Microsoft Word (OpenXML)',
  },
  'application/vnd.ms-fontobject': {
    extension: '.eot',
    group: 'document',
    name: 'MS Embedded OpenType fonts',
  },
  'application/epub+zip': {
    extension: '.epub',
    group: 'ebook',
    name: 'Electronic publication (EPUB)',
  },
  'application/gzip': {
    extension: '.gz',
    group: 'archive',
    name: 'GZip Compressed Archive',
  },
  'image/gif': {
    extension: '.gif',
    group: 'image',
    name: 'Graphics Interchange Format (GIF)',
  },
  'text/html': {
    extension: '.html',
    group: 'script',
    name: 'HyperText Markup Language (HTML)',
  },
  'image/vnd.microsoft.icon': {
    extension: '.ico',
    group: 'image',
    name: 'Icon format',
  },
  'text/calendar': {
    extension: '.ics',
    group: 'calendar',
    name: 'iCalendar format',
  },
  'application/java-archive': {
    extension: '.jar',
    group: 'archive',
    name: 'Java Archive (JAR)',
  },
  'image/jpeg': {
    extension: '.jpg',
    group: 'image',
    name: 'JPEG images',
  },
  'text/javascript': {
    extension: '.js',
    group: 'script',
    name: 'JavaScript',
  },
  'application/json': {
    extension: '.json',
    group: 'script',
    name: 'JSON format',
  },
  'application/ld+json': {
    extension: '.jsonld',
    group: '',
    name: 'JSON-LD format',
  },
  'audio/midi': {
    extension: '.midi',
    group: 'audio',
    name: 'Musical Instrument Digital Interface (MIDI)',
  },
  'audio/x-midi': {
    extension: '.midi',
    group: 'audio',
    name: 'Musical Instrument Digital Interface (MIDI)',
  },
  'text/javascript': {
    extension: '.mjs',
    group: 'script',
    name: 'JavaScript module',
  },
  'audio/mpeg': {
    extension: '.mp3',
    group: 'audio',
    name: 'MP3 audio',
  },
  'video/mpeg': {
    extension: '.mpeg',
    group: 'video',
    name: 'MPEG Video',
  },
  'application/vnd.apple.installer+xml': {
    extension: '.mpkg',
    group: 'data',
    name: 'Apple Installer Package',
  },
  'application/vnd.oasis.opendocument.presentation': {
    extension: '.odp',
    group: 'document',
    name: 'OpenDocument presentation document',
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    extension: '.ods',
    group: 'document',
    name: 'OpenDocument spreadsheet document',
  },
  'application/vnd.oasis.opendocument.text': {
    extension: '.odt',
    group: 'document',
    name: 'OpenDocument text document',
  },
  'audio/ogg': {
    extension: '.oga',
    group: 'audio',
    name: 'OGG audio',
  },
  'video/ogg': {
    extension: '.ogv',
    group: 'video',
    name: 'OGG video',
  },
  'application/ogg': {
    extension: '.ogx',
    group: 'audio',
    name: 'OGG',
  },
  'audio/opus': {
    extension: '.opus',
    group: 'audio',
    name: 'Opus audio',
  },
  'font/otf': {
    extension: '.otf',
    group: 'font',
    name: 'OpenType font',
  },
  'image/png': {
    extension: '.png',
    group: 'image',
    name: 'Portable Network Graphics',
  },
  'application/pdf': {
    extension: '.pdf',
    group: 'document',
    name: 'Adobe Portable Document Format (PDF)',
  },
  'application/php': {
    extension: '.php',
    group: 'script',
    name: 'Hypertext Preprocessor (Personal Home Page)',
  },
  'application/vnd.ms-powerpoint': {
    extension: '.ppt',
    group: 'document',
    name: 'Microsoft PowerPoint',
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    extension: '.pptx',
    group: 'document',
    name: 'Microsoft PowerPoint (OpenXML)',
  },
  'application/vnd.rar': {
    extension: '.rar',
    group: 'archive',
    name: 'RAR archive',
  },
  'application/rtf': {
    extension: '.rtf',
    group: 'archive',
    name: 'Rich Text Format (RTF)',
  },
  'application/x-sh': {
    extension: '.sh',
    group: 'script',
    name: 'Bourne shell script',
  },
  'image/svg+xml': {
    extension: '.svg',
    group: 'image',
    name: 'Scalable Vector Graphics (SVG)',
  },
  'application/x-shockwave-flash': {
    extension: '.swf',
    group: 'document',
    name: 'Small web format (SWF) or Adobe Flash document',
  },
  'application/x-tar': {
    extension: '.tar',
    group: 'archive',
    name: 'Tape Archive (TAR)',
  },
  'image/tiff': {
    extension: '.tiff',
    group: 'image',
    name: 'Tagged Image File Format (TIFF)',
  },
  'video/mp2t': {
    extension: '.ts',
    group: 'video',
    name: 'MPEG transport stream',
  },
  'font/ttf': {
    extension: '.ttf',
    group: 'font',
    name: 'TrueType Font',
  },
  'text/plain': {
    extension: '.txt',
    group: 'document',
    name: 'Text, (generally ASCII or ISO 8859-n)',
  },
  'application/vnd.visio': {
    extension: '.vsd',
    group: 'video',
    name: 'Microsoft Visio ',
  },
  'audio/wav': {
    extension: '.wav',
    group: 'audio',
    name: 'Waveform Audio Format',
  },
  'audio/webm': {
    extension: '.weba',
    group: 'audio',
    name: 'WEBM audio',
  },
  'video/webm': {
    extension: '.webm',
    group: 'video',
    name: 'WEBM video',
  },
  'image/webp': {
    extension: '.webp',
    group: 'image',
    name: 'WEBP image',
  },
  'font/woff': {
    extension: '.woff',
    group: 'font',
    name: 'Web Open Font Format (WOFF)',
  },
  'font/woff2': {
    extension: '.woff2',
    group: 'font',
    name: 'Web Open Font Format (WOFF)',
  },
  'application/xhtml+xml': {
    extension: '.xhtml',
    group: 'script',
    name: 'XHTML',
  },
  'application/vnd.ms-excel': {
    extension: '.xls',
    group: 'document',
    name: 'Microsoft Excel',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    extension: '.xlsx',
    group: 'document',
    name: 'Microsoft Excel (OpenXML)',
  },
  'application/xml': {
    extension: '.xml',
    group: 'document',
    name: 'XML',
  },
  'text/xml': {
    extension: '.xml',
    group: 'document',
    name: 'XML',
  },
  'application/vnd.mozilla.xul+xml': {
    extension: '.xul',
    group: 'document',
    name: 'XUL',
  },
  'application/zip': {
    extension: '.zip',
    group: 'archive',
    name: 'ZIP archive',
  },
  'video/3gpp': {
    extension: '.3gp',
    group: 'video',
    name: '3GPP audio/video container',
  },
  'audio/3gpp': {
    extension: '.3gp',
    group: 'audio',
    name: '3GPP audio/video container',
  },
  'video/3gpp2': {
    extension: '.3g2',
    group: 'video',
    name: '3GPP2 audio/video container',
  },
  'audio/3gpp2': {
    extension: '.3g2',
    group: 'audio',
    name: '3GPP2 audio/video container',
  },
  'application/x-7z-compressed': {
    extension: '.7z',
    group: 'archive',
    name: '7-zip archive',
  },
}

class MimeTypeMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.mimeTypes = function(mime) {
      if (types[mime] !== undefined) {
        return types[mime].group
      }
      return 'document'
    }

    await next()
  }
}

module.exports = MimeTypeMiddleware
