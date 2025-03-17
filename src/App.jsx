import './App.css'
import {Navbar} from './components/Navbar'
import {Herosection ,Footer} from './components/Herosection'
import {ArticleSection} from './components/ArticleSection'

function App() {
  return (
    <>
      <section className='bg-black'>
        <Navbar />
        <Herosection />
        <ArticleSection />
        <Footer />
      </section>
    </>
  )
}

export default App
