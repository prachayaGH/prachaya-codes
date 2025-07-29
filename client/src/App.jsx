import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {Herosection} from './components/Herosection'
import {ArticleSection} from './components/ArticleSection'
import Footer from './components/Footer'
import {AboutMeSection} from './components/AboutMeSection'
import {ProjectSection} from './components/ProjectSection'
import ViewPostPage from './pages/ViewPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from "@/components/ui/sonner"
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SignupSuccessPage from './pages/SignupSuccessPage';


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

          {/* Authentication Section */}
          <Route path="/Signup" element={<SignupPage />}/>
          <Route path="/Signup/success" element={<SignupSuccessPage/>} />
          <Route path="/Login" element={<LoginPage />}/>

          {/* User Section */}
            {/* Profile */} 
            {/* resetPassword */} 

          {/* Admin Section */}
             {/* Admin article-management */}
             {/* Admin article-management-create */}
             {/* Admin article-management-edit */}
             {/* Admin category-management */}
             {/* Admin category-management-create */}
             {/* Admin category-management-edit */}
             {/* Admin profile*/}
             {/* Admin notification*/}
             {/* Admin reset password*/}
        </Routes>
        <Footer />
      </section>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
