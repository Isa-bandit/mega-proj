import Footer from '../components/Footer'
import GmailChecker from '../components/features1/GmailChecker'
import MovingSquare from '../components/features1/MovingSquare'
import Stopwatch from '../components/features1/Stopwatch'
import '../styles/home_works.css'

export default function Features1() {
  return (
    <div className="wrapper" style={{ paddingTop: '80px' }}>
      <GmailChecker />
      <MovingSquare />
      <Stopwatch />
      <Footer />
    </div>
  )
}
