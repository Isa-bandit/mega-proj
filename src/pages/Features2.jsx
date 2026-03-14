import Footer from '../components/Footer'
import PhoneChecker from '../components/features2/PhoneChecker'
import TabSlider from '../components/features2/TabSlider'
import CardSwitcher from '../components/features2/CardSwitcher'
import RandomQuotes from '../components/features2/RandomQuotes'
import Weather from '../components/features2/Weather'
import '../styles/lessons.css'

export default function Features2() {
  return (
    <div className="wrapper" style={{ paddingTop: '80px' }}>
      <PhoneChecker />
      <TabSlider />
      <CardSwitcher />
      <RandomQuotes />
      <Weather />
      <Footer />
    </div>
  )
}
