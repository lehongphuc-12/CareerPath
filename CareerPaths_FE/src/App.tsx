import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './components/page/LandingPage';
import PreTestPage from './components/page/PreTestPage';
import FullTestPage from './components/page/FullTestPage';
import ResultPage from './components/page/ResultPage';
import CareerLibraryPage from './components/page/CareerLibraryPage';
import CareerDetailPage from './components/page/CareerDetailPage';
import MentorPage from './components/page/MentorPage';
import BlogPage from './components/page/BlogPage';
import DashboardPage from './components/page/DashboardPage';
import AboutPage from './components/page/AboutPage';
import ContactPage from './components/page/ContactPage';
import ChatPage from './components/page/ChatPage';
import ChatListPage from './components/page/ChatListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="pre-test" element={<PreTestPage />} />
          <Route path="full-test" element={<FullTestPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="careers" element={<CareerLibraryPage />} />
          <Route path="careers/:id" element={<CareerDetailPage />} />
          <Route path="mentors" element={<MentorPage />} />
          <Route path="chat" element={<ChatListPage />} />
          <Route path="chat/:mentorId" element={<ChatPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
