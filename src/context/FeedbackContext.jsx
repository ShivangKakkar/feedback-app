import { createContext, useState, useEffect } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 3000 } = options

    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  }

  const fetchFeedback = async () => {
    const response = await fetchWithTimeout('feedback?_sort=id&_order=desc')
    const data = await response.json()
    if (!data) {
      data = FeedbackData
    }

    setFeedback(data)
    setIsLoading(false)
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetchWithTimeout(`feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetchWithTimeout('feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()

    if (!data) {
      data = newFeedback
    }

    setFeedback([data, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = async (id, updatedItem) => {
    const response = await fetchWithTimeout(`feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
    const data = await response.json()

    if (!data) {
      data = updatedItem
    }

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
