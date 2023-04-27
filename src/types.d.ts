import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface StateTypes {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type ActionsTypes =
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }

export enum SectionType {
  From = 'from',
  To = 'to'
}

export interface TextAreaProps {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

export type PlaceholderTypes = Pick<TextAreaProps, 'type' | 'loading'>

export type LanguageSelectorProps =
  | {
      type: SectionType.From
      value: FromLanguage
      onChange: (language: FromLanguage) => void
    }
  | {
      type: SectionType.To
      value: Language
      onChange: (language: Language) => void
    }

export interface TranslationProps {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}
