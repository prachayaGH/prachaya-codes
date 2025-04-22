import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {Herosection ,Footer} from './components/Herosection'
import {ArticleSection} from './components/ArticleSection'
import {AboutMeSection} from './components/AboutMeSection'
import {ProjectSection} from './components/ProjectSection'
import ViewPostPage from './pages/ViewPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <Router>
      <section className="bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <div id="home">
                <Herosection />
              </div>
              <div id="about-me">
                <AboutMeSection />
              </div>
              <div id="projects">
                <ProjectSection />
              </div>
              <div id="articles">
                <ArticleSection />
              </div>
            </>
          } />
          
          <Route path="/post/:postId" element={<ViewPostPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
        <Footer />
      </section>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
