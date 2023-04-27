import { type FC } from 'react'
import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import {
  SectionType,
  type Language,
  type LanguageSelectorProps
} from '../types.d'

export const LanguageSelector: FC<LanguageSelectorProps> = ({
  onChange,
  value,
  type
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label='Selecciona el idioma'
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option value={key} key={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
