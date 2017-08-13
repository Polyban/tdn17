/* speech building helper function */

export function wrapIn(tag) {
  return utterance => `<${tag}>${utterance}</${tag}>`
}

export function pitchDown(pitch = '-10%') {
  return utterance => `<prosody pitch="${pitch}">${utterance}</prosody>`
}
