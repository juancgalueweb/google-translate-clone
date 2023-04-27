import React, { type FC } from 'react'
import { Form } from 'react-bootstrap'
import {
  SectionType,
  type PlaceholderTypes,
  type TextAreaProps
} from '../types.d'

const commonStyles = {
  border: 0,
  height: '200px',
  resize: 'none' as const
}

const getPlaceholder = ({ type, loading }: PlaceholderTypes) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea: FC<TextAreaProps> = ({
  loading,
  type,
  value,
  onChange
}) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      as='textarea'
      autoFocus={type === SectionType.From}
      style={styles}
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      onChange={handleChange}
      disabled={type === SectionType.To}
      className='shadow-sm'
    />
  )
}
