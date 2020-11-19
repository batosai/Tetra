import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

const uploader = document.querySelector('#t-uploader')

if (uploader) {
  const opts = Object.assign({}, uploader.dataset)

  Dropzone.options.tUploader = {
    dictDefaultMessage: opts.dictdefaultmessage,
    dictFallbackMessage: opts.dictfallbackmessage,
    dictFallbackText: opts.dictfallbacktext,
    dictFallbackText: opts.dictfallbacktext,
    dictFileTooBig: opts.dictfiletoobig,
    dictInvalidFileType: opts.dictinvalidfiletype,
    dictResponseError: opts.dictresponseerror,
    dictCancelUpload: opts.dictcancelupload,
    dictUploadCanceled: opts.dictuploadcanceled,
    dictCancelUploadConfirmation: opts.dictcanceluploadconfirmation,
    dictRemoveFile: opts.dictremovefile,
    dictMaxFilesExceeded: opts.dictmaxfilesexceeded,
  }
}
