
export const UNHANDLED_UTTERANCE = 'Entschuldigung, das habe ich nicht verstanden.'
export const SESSION_ENDED_UTTERANCE = 'Auf Wiedersehen.'

export const HELP_UTTERANCE = 'Rufen Sie Informationen oder das Programm ab, indem Sie sagen: <break/> <emphasis>Informationen</emphasis> oder <emphasis>Programm</emphasis>.'
export const HELP_CARD_TITLE = 'Hilfe'
export const HELP_CARD_CONTENT = `
  Sagen Sie "Informationen" für allgemeine Informationen oder "Programm" für das Programm.\n
  Sie können zum Beispiel das Programm für einen bestimmten Tag aufrufen, indem Sie sagen:\n\n
  "Alexa, frage Tag der Niedersachsen nach dem Programm für Freitag"
`

export const INFORMATION_MAIN_UTTERANCE = 'Der Tag der Niedersachsen 2017 findet zum 35. Mal statt. Nach 1983 und 2005 ist Wolfsburg nun zum dritten Mal Ausrichterstadt.'

export const PROGRAM_INTRO_UTTERANCE = 'Der Tag der Niedersachsen findet statt von Freitag den 1. bis Sonntag den 3. September.'
export const PROGRAM_DAY_PROMPT_UTTERANCE = 'Welcher Tag interessiert Sie?'
export const PROGRAM_DAY_PROMPT_BACK_UTTERANCE = 'Oder sagen Sie <emphasis>Zurück zum Menü</emphasis>'
export const PROGRAM_DAY_REPROMPT_UTTERANCE = 'Sagen Sie <emphasis>Freitag</emphasis>, <emphasis>Samstag</emphasis> oder <emphasis>Sonntag</emphasis>.'

export const states = {
  START: '_START',
  INFO: '_INFO',
  PROGRAM: '_PROGRAM'
}
