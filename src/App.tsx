import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './App.css'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { AUTO_LANGUAGE, LANGUAGES_FOR_VOICES } from './constants'
import { useClipboard } from './hooks/useClipboard'
import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
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
  const { handleClipboard } = useClipboard()

  const handleSpeakTo = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = LANGUAGES_FOR_VOICES[toLanguage]
    speechSynthesis.speak(utterance)
  }

  const fetchTranslation = async () => {
    const baseUrl = import.meta.env.VITE_BASE_URL as string
    const url = `${baseUrl}/api/translate`
    const data = {
      fromLanguage,
      toLanguage,
      text: debouncedFromText
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    const json = await response.json()
    setResult(json.translation)
  }

  useEffect(() => {
    if (debouncedFromText === '') return
    fetchTranslation().catch(() => {})
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <>
      <Container className='w-75 pt-5'>
        <h1 className='text-center'>
          Google Translate Clone con Typescript y la API de Open IA
        </h1>
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
              <div className='icons-container'>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <div className='icons'>
                  <Button
                    variant='link'
                    onClick={() => {
                      handleClipboard(result)
                    }}
                  >
                    <ClipboardIcon />
                  </Button>
                  <Button variant='link' onClick={handleSpeakTo}>
                    <SpeakerIcon />
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  )
}

export default App
