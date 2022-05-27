import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <div className='about'>
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a service or a product.</p>
        <p>
          Created by{' '}
          <a
            href='https://github.com/StarkBotsIndustries'
            target='_blank'
            rel='noreferrer'
          >
            Stark Programmer
          </a>
        </p>
        {/* <p>Version: 1.0.0</p> */}
        <p>
          <a href='/'>Back To Home</a>
        </p>
      </div>
    </Card>
  )
}
export default AboutPage
