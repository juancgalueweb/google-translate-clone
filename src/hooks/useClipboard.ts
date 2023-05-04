import { useCallback } from 'react'
import { Slide, toast } from 'react-toastify'

export function useClipboard() {
  const handleClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    toast('Traducción copiada', {
      position: 'bottom-left',
      autoClose: 2000,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: 'dark',
      closeOnClick: true,
      draggable: true,
      type: 'default',
      closeButton: false,
      transition: Slide
    })
  }, [])

  return { handleClipboard }
}
