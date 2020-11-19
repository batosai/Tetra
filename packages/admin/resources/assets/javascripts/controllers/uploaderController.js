import { Controller } from 'stimulus'
import Dropzone from 'dropzone'

export default class extends Controller {
  connect() {
    this.load()
  }

  load() {
    const opts = {
      dictDefaultMessage: this.data.get('dictdefaultmessage'),
      dictFallbackMessage: this.data.get('dictfallbackmessage'),
      dictFallbackText: this.data.get('dictfallbacktext'),
      dictFallbackText: this.data.get('dictfallbacktext'),
      dictFileTooBig: this.data.get('dictfiletoobig'),
      dictInvalidFileType: this.data.get('dictinvalidfiletype'),
      dictResponseError: this.data.get('dictresponseerror'),
      dictCancelUpload: this.data.get('dictcancelupload'),
      dictUploadCanceled: this.data.get('dictuploadcanceled'),
      dictCancelUploadConfirmation: this.data.get(
        'dictcanceluploadconfirmation',
      ),
      dictRemoveFile: this.data.get('dictremovefile'),
      dictMaxFilesExceeded: this.data.get('dictmaxfilesexceeded'),
    }

    const dz = new Dropzone(`.${this.data.get('container')}`, {
      url: this.data.get('url'),
      ...opts,
    })

    dz.on('addedfile', function(file) {
      console.log('add file')
    })
  }
}
