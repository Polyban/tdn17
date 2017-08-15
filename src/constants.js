import { pitchDown } from './util'

export const UNHANDLED_UTTERANCE = 'Entschuldigung, das habe ich nicht verstanden.'
export const SESSION_ENDED_UTTERANCE = 'Auf Wiedersehen.'

export const INTRO_UTTERANCE = 'Willkommen zum 35. "Tag der Niedersachsen" im Jahr 2017. <break /> Ich habe allgemeine Informationen oder eine Programmübersicht.'
export const INTRO_PROMPT_UTTERANCE = 'Sage <emphasis>Informationen</emphasis> oder <emphasis>Programm</emphasis>.'
export const INTRO_CARD_TITLE = 'Willkommen zum 35. Tag der Niedersachsen im Jahr 2017'
export const INTRO_CARD_TEXT = 'Sage Informationen für Allgemeine Informationen oder Programm für eine Programmübersicht.'

export const INFORMATION_MAIN_UTTERANCE = 'Der Tag der Niedersachsen 2017 findet zum 35. Mal statt. Nach 1983 und 2005 ist Wolfsburg nun zum dritten Mal Ausrichterstadt.'

export const PROGRAM_INTRO_UTTERANCE = 'Der Tag der Niedersachsen findet statt von Freitag den 1. bis Sonntag den 3. September.'
export const PROGRAM_DAY_PROMPT_UTTERANCE = 'Welcher Tag interessiert Dich?'
export const PROGRAM_DAY_PROMPT_BACK_UTTERANCE = 'Oder sage <emphasis>Zurück zum Menü</emphasis>'
export const PROGRAM_DAY_REPROMPT_UTTERANCE = 'Sage <emphasis>Freitag</emphasis>, <emphasis>Samstag</emphasis> oder <emphasis>Sonntag</emphasis>.'

export const PROGRAM_DAY_INTRO_UTTERANCE_FRIDAY = [
  'Programm für Freitag, 1. September',
  `16 bis 20 ${pitchDown()('Uhr')} <break time="100ms" /> Festmeile`,
  '16 bis 24 Uhr <break time="100ms" /> Bühnenprogramm'
];
export const PROGRAM_DAY_INTRO_UTTERANCE_SATURDAY = [
  'Programm für Samstag, 2. September',
  `10 bis 20 ${pitchDown()('Uhr')} <break time="100ms" /> Festmeile`,
  `10 bis 24 ${pitchDown()('Uhr')} <break time="100ms" /> Bühnenprogramm`,
  `
    11:00 Uhr <break time="100ms" />
    Offizielle Eröffnungsfeier des 35. "Tags der Niedersachsen" mit dem Niedersächsischen Ministerpräsidenten
    Stephan Weil und Oberbürgermeister Klaus Mohrs auf der Bühne vor dem Rathaus.
  `
];
export const PROGRAM_DAY_INTRO_UTTERANCE_SUNDAY = [
  'Sonntag, 3. September',
  `
    10 ${pitchDown()('Uhr')} <break time="100ms" />
    Ökumenischer Gottesdienst unter dem Motto
    <emphasis>Mehr Himmel auf Erden, Die Himmelsleiter</emphasis> <break time="100ms" />
    auf der Bühne vor dem Rathaus.
  `,
  `11 bis 18 ${pitchDown()('Uhr')} <break time="100ms" /> Festmeile`,
  `11 bis 19 ${pitchDown()('Uhr')} <break time="100ms" /> Bühnenprogramm`,
  '15:30 Uhr <break time="100ms" /> Beginn des Trachten- und Festumzugs'
];

export const states = {
  START: '_START',
  INFO: '_INFO',
  PROGRAM: '_PROGRAM'
}
