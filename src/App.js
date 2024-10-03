import { Route, Routes } from 'react-router-dom';
import './App.css';
import { FooterComponent } from './components/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent';
import { HomeComponent } from './components/HomeComponent';
import { VideoComponent } from './components/VideoComponent';
import { PageNotFound } from './components/PageNotFound';

function App() {
  return (
    <section>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />}/>
        <Route path="/videos" element={<VideoComponent/>}/>
        <Route path="/videos" element={<VideoComponent/>}/>
        <Route path="*" element={<PageNotFound/>}/>

        
      </Routes>
      <FooterComponent />
    </section>
  );
}

export default App;
