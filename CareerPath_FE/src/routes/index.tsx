import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LandingPage from '../components/page/main/LandingPage';
import PreTestPage from '../components/page/assessment/PreTestPage';
import FullTestPage from '../components/page/assessment/FullTestPage';
import ResultPage from '../components/page/assessment/ResultPage';
import CareerLibraryPage from '../components/page/career/CareerLibraryPage';
import CareerDetailPage from '../components/page/career/CareerDetailPage';
import MentorPage from '../components/page/mentor/MentorPage';
import BlogPage from '../components/page/main/BlogPage';
import DashboardPage from '../components/page/dashboard/DashboardPage';
import AboutPage from '../components/page/main/AboutPage';
import ContactPage from '../components/page/main/ContactPage';
import ChatPage from '../components/page/chat/ChatPage';
import ChatListPage from '../components/page/chat/ChatListPage';
import LoginPage from '../components/page/auth/LoginPage';
import RegisterPage from '../components/page/auth/RegisterPage';
import { PATHS } from './paths';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.LOGIN} element={<LoginPage />} />
      <Route path={PATHS.REGISTER} element={<RegisterPage />} />
      
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path={PATHS.PRE_TEST.replace('/', '')} element={<PreTestPage />} />
        <Route path={PATHS.FULL_TEST.replace('/', '')} element={<FullTestPage />} />
        <Route path={PATHS.RESULT.replace('/', '')} element={<ResultPage />} />
        <Route path={PATHS.CAREER_LIBRARY.replace('/', '')} element={<CareerLibraryPage />} />
        <Route path="careers/:id" element={<CareerDetailPage />} />
        <Route path={PATHS.MENTORS.replace('/', '')} element={<MentorPage />} />
        <Route path={PATHS.CHAT_LIST.replace('/', '')} element={<ChatListPage />} />
        <Route path="chat/:mentorId" element={<ChatPage />} />
        <Route path={PATHS.BLOG.replace('/', '')} element={<BlogPage />} />
        <Route path={PATHS.DASHBOARD.replace('/', '')} element={<DashboardPage />} />
        <Route path={PATHS.ABOUT.replace('/', '')} element={<AboutPage />} />
        <Route path={PATHS.CONTACT.replace('/', '')} element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
