import bulmaCalendar from 'bulma-calendar'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'

export default class Datepicker {
  constructor() {
    this.format = {
      fr: 'DD/MM/YYYY',
      en: 'YYYY-MM-DD',
    }

    this.init()
  }

  init() {
    const lang = document.querySelector('html').getAttribute('lang')
    bulmaCalendar.attach('[type="date"]', {
      lang,
      startDate: new Date(),
      dateFormat: this.format[lang],
      showFooter: false,
      displayMode: 'dialog',
    })
  }
}
