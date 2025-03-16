import './App.css'
import {Navbar} from './components/Navbar'
import {Herosection ,Footer} from './components/Herosection'

function App() {
  return (
    <>
      <section className='bg-black'>
        <Navbar />
        <Herosection />
        <Footer />
      </section>
    </>
  )
}

export default App
