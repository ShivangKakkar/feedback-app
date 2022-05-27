import { useState, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(10)
  const [time, setTime] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleText = (element) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length < 10) {
      setMessage('Text must be atleast 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(element.target.value)
    const t = new Date().toLocaleString().replace(',', '')
    setTime(t)
    console.log('time', time)
    // setTime(new Date().toLocaleString().replace(',', ''))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
        time,
      }
      console.log(newFeedback)
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
    }

    setText('')
    setBtnDisabled(true)
    setRating(10)
    setTime('')
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} action='text'>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(e) => setRating(e)} />
        <div className='input-group'>
          <input
            onChange={handleText}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button id='send' type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}
export default FeedbackForm
