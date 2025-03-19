import './App.css'
import {Navbar} from './components/Navbar'
import {Herosection ,Footer} from './components/Herosection'
import {ArticleSection} from './components/ArticleSection'
import { AboutMeSection } from './components/AboutMeSection'


function App() {
  return (
    <>
      <section className='bg-black'>
        <Navbar />
        <Herosection />
        <AboutMeSection />
        <ArticleSection />
        <Footer />
      </section>
    </>
  )
}

export default App
