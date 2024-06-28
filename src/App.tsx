/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import './App.css'
import LeftHand from './components/LeftHand'
import RightHand from './components/RightHand'
import { KeyLink } from './data/Constants'
import { Phrases } from './data/Phrases'
import { FingerColors } from './types/FingerColors'

function App () {
  const [fingerColors, setFingerColors] = useState<FingerColors>({
    llittle: 'bg-slate-400',
    lring: 'bg-slate-400',
    lmiddle: 'bg-slate-400',
    lindex: 'bg-slate-400',

    thumb: 'bg-slate-400',

    rlittle: 'bg-slate-400',
    rring: 'bg-slate-400',
    rmiddle: 'bg-slate-400',
    rindex: 'bg-slate-400',
  })

  const [phrase, setPhrase] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [textAreaValue, setTextAreaValue] = useState('')
  const [record, setRecord] = useState(0)
  const [time, setTime] = useState(0)

  const sortPhrase = () => {
    const randomIndex = Math.floor(Math.random() * (Phrases.length))
    setPhrase(Phrases[randomIndex])
    setTextAreaValue('')
    setPhraseIndex(0)
    const now = new Date().getTime()
    setTime(now)
  }

  const fingerSelect = (color: string) => {
    const letter: string = phrase[phraseIndex]
    const resetColors: FingerColors = { ...fingerColors }
    Object.keys(resetColors).forEach((key) => {
      resetColors[key] = 'from-slate-500'
    })
    resetColors[KeyLink[letter]] = color
    setFingerColors(resetColors)
  }

  useEffect(() => {
    sortPhrase()
  }, [])

  useEffect(() => {
    if (phrase == textAreaValue && textAreaValue.length > 1) {
      const now = new Date().getTime()
      const duration = Math.round((now - time) / 1000)
      if (record == 0) {
        setRecord(duration)
      }
      if (record > duration) {
        setRecord(duration)
      }
      sortPhrase()
    }
  }, [phrase, textAreaValue])

  useEffect(() => {
    fingerSelect('from-green-500')
  }, [phraseIndex, phrase])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key
    if (key == 'Dead' || key == 'Alt' || key == 'Backspace') {
      return
    }
    if (key == phrase[phraseIndex]) {
      if (phrase.substring(0, phraseIndex) == textAreaValue) {
        setPhraseIndex(prevState => prevState + 1)
      }

    } else {
      fingerSelect('from-red-500')
    }
  }

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
  }

  const handleResetButton = () => {
    sortPhrase()
  }


  return (
    <div className='flex flex-col gap-6 justify-center items-center w-full m-auto'>
      <div className='w-full p-2 border-b border-b-slate-400'>Record: {record} segundos</div>
      <div className='flex w-full justify-center text-center items-end text-2xl'>
        {phrase.split('').map((char, index) => {
          let classes = ''
          if (phraseIndex == index) {
            classes = 'text-sky-800 font-bold underline'
          }
          if (char == ' ') {
            return <span className={classes} key={index}>&nbsp;</span>
          }
          return <span className={classes} key={index}>{char}</span>
        })}
      </div>
      <div className='flex flex-row gap-24 justify-center'>

        <LeftHand fingerColors={fingerColors} />
        <RightHand fingerColors={fingerColors} />

      </div>


      <div className={twMerge('flex flex-col justify-center items-center gap-6 w-full max-w-xl')}>
        <textarea autoFocus={true} value={textAreaValue} onChange={textAreaChange} onKeyDown={handleKeyDown}
          className='border border-slate-300 rounded w-full text-center p-2 font-sans text-xl text-slate-700 outline-none'></textarea>
        <button onClick={handleResetButton} className={twMerge('bg-red-400 text-white font-bold px-3 py-3 rounded')}>Reiniciar</button>
      </div>
    </div>
  )
}

export default App
