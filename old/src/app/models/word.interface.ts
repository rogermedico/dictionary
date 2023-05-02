export interface WordResult {
  definition: string,
  examples: string[],
  partOfSpeech: string,
  synonyms: string[],
  typeOf: string[],
  hasTypes: string[],
  partOf: string[],
  hasParts: string[]
}

export interface Word {
  word: string,
  results: WordResult[],
  pronunciation?: {
    all: string,
    noun?: string,
    verb?: string
  } | string,
  syllables?: {
    count: number,
    list: string[]
  },
  frequency?: number
}