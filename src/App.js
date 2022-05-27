import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <div className='container'>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </div>
                <AboutIconLink />
              </>
            }
          />
          <Route
            path='/about'
            element={
              <div className='container'>
                <AboutPage />
              </div>
            }
          />
        </Routes>
      </Router>
    </FeedbackProvider>
  )
}

export default App
