export interface WordResult {
  definition: string,
  examples: string[],
  hasTypes: string[],
  partOfSpeech: string,
  synonyms: string[],
  typeOf: string[]
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