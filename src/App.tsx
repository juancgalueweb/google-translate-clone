import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import './App.css'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { AUTO_LANGUAGE, LANGUAGES_FOR_VOICES } from './constants'
import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
import { translate } from './services/translate'
import { SectionType } from './types.d'

function App() {
  const {
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading,
    interchangeText
  } = useStore()

  const debouncedFromText = useDebounce(fromText)

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = LANGUAGES_FOR_VOICES[toLanguage]
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container className='w-75 pt-5'>
      <h1 className='text-center'>Google Translate Clone</h1>
      <Row className='mt-5'>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            variant='link'
            onClick={() => {
              interchangeLanguages()
              interchangeText()
            }}
            disabled={fromLanguage === AUTO_LANGUAGE}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div className='clipboard-container'>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div className='icons'>
                <Button variant='link' onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant='link' onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
