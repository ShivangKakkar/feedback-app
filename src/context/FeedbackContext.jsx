import { createContext, useState, useEffect } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // async function fetchWithTimeout(resource, options = {}) {
  //   // const { timeout = 3000 } = options

  //   const controller = new AbortController()
  //   const id = setTimeout(() => controller.abort(), 3000)
  //   const response = await fetch(resource, {
  //     ...options,
  //     signal: controller.signal,
  //   })
  //   clearTimeout(id)
  //   return response
  // }

  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc')
    let data = await response.json()
    if (!data) {
      data = FeedbackData
    }
    // let data = FeedbackData

    setFeedback(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchFeedback() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    let data = await response.json()

    if (!data) {
      data = newFeedback
    }
    // let data = newFeedback

    setFeedback([data, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
    let data = await response.json()

    if (!data) {
      data = updatedItem
    }
    // let data = updatedItem

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
