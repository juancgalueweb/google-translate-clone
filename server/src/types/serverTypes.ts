import {
  type AUTO_LANGUAGE,
  type SUPPORTED_LANGUAGES
} from '../constants/constant'

export type AutoLanguage = typeof AUTO_LANGUAGE
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type FromLanguage = Language | AutoLanguage

export interface TranslationProps {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}
