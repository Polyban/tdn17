const PROGRAM_INTRO_UTTERANCE = 'Der Tag der Niedersachsen findet statt von Freitag den 1. bis Sonntag den 3. September.'

module.exports = {
  'LaunchRequest': function () {
    this.emitWithState('Start')
  },
  'Start': function () {
    this.emit(':tell', `
      <p>Willkommen zum <say-as interpret-as="ordinal">35.</say-as> Tag der Niedersachsen 2017.</p>
      <p>Ich habe allgemeine Informationen oder eine Programmübersicht.</p>
      <p>Sagen Sie <emphasis>Informationen</emphasis> oder <emphasis>Programm</emphasis></p>
    `)
  },
  'GetInformation': function () {
    this.emit(':tell', `
      <p>Der Tag der Niedersachsen 2017 findet zum 35. Mal statt. Nach 1983 und 2005 ist Wolfsburg nun zum dritten Mal Ausrichterstadt.</p>
      <p>${PROGRAM_INTRO_UTTERANCE}</p>
      <p>Wünschen sie mehr Informationen zum Programm, sagen sie <emphasis>Programm</emphasis>.</p>
    `)
  },
  'GetProgram': function () {
    const { slots } = this.event.request.intent
    if (slots.hasOwnProperty('Tag')) {
      this.emit(':tell', `Am ${slots.Tag.value} gibt es Würstchen.`)
    } else {
      this.emit(':tell', `
        <p>${PROGRAM_INTRO_UTTERANCE}</p>
        <p>Für welchen Tag interessieren Sie sich?</p>
        <p>Sagen Sie <emphasis>Freitag</emphasis>, <emphasis>Samstag</emphasis> oder <emphasis>Sonntag</emphasis>.</p>
      `)
    }
  }
}