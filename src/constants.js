
export const UNHANDLED_UTTERANCE = 'Entschuldigung, das habe ich nicht verstanden.'
export const SESSION_ENDED_UTTERANCE = 'Auf Wiedersehen.'

export const INTRO_UTTERANCE = 'Willkommen zum 35. "Tag der Niedersachsen" im Jahr 2017. <break /> Ich habe allgemeine Informationen oder eine Programmübersicht.'
export const INTRO_PROMPT_UTTERANCE = 'Sage <emphasis>Informationen</emphasis> oder <emphasis>Programm</emphasis>.'
export const INTRO_CARD_TITLE = 'Willkommen zum 35. Tag der Niedersachsen im Jahr 2017'
export const INTRO_CARD_TEXT = 'Sage "Informationen" für Allgemeine Informationen oder "Programm" für eine Programmübersicht.'

export const HELP_UTTERANCE = 'Rufe Informationen oder das Programm ab, indem Du sagst: <break/> <emphasis>Informationen</emphasis> oder <emphasis>Programm</emphasis>.'
export const HELP_CARD_TITLE = 'Hilfe'
export const HELP_CARD_CONTENT = `
  Sage "Informationen" für allgemeine Informationen oder "Programm" für das Programm.\n
  Du kannst zum Beispiel das Programm für einen bestimmten Tag aufrufen, indem Du sagst:\n\n
  "Alexa, frage Tag der Niedersachsen nach dem Programm für Freitag"
`

export const INFORMATION_MAIN_UTTERANCE = 'Der Tag der Niedersachsen 2017 findet zum 35. Mal statt. Nach 1983 und 2005 ist Wolfsburg nun zum dritten Mal Ausrichterstadt.'

export const PROGRAM_INTRO_UTTERANCE = 'Der Tag der Niedersachsen findet statt von Freitag den 1. bis Sonntag den 3. September.'
export const PROGRAM_DAY_PROMPT_UTTERANCE = 'Welcher Tag interessiert Dich?'
export const PROGRAM_DAY_PROMPT_BACK_UTTERANCE = 'Oder sage <emphasis>Zurück zum Menü</emphasis>'
export const PROGRAM_DAY_REPROMPT_UTTERANCE = 'Sage <emphasis>Freitag</emphasis>, <emphasis>Samstag</emphasis> oder <emphasis>Sonntag</emphasis>.'

export const states = {
  START: '_START',
  INFO: '_INFO',
  PROGRAM: '_PROGRAM'
}
