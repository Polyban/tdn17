/* speech building helper function */
export function wrapIn (tag) {
  return (utterance) => `<${tag}>${utterance}</${tag}>`
}

export function pitchDown (pitch='-10%') {
  return (utterance) => `<prosody pitch="${pitch}">${utterance}</prosody>`
}

export function getCanonicalSlotResolution (slot) {
  if (!slot.resolutions || !slot.resolutions.resolutionsPerAuthority
    || !slot.resolutions.resolutionsPerAuthority.length) {
    return null
  }
  return slot.resolutions.resolutionsPerAuthority[0].values[0].value
}