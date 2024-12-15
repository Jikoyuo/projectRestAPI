import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css';
import DashboardPages from './pages/DashboardPage';
import CommentsPage from './pages/CommentsPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './services/UserTenant/PrivateRoute';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import SearchPage from './pages/SearcPage';
import RegisterPage from './pages/RegisterPages';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import AddPostPage from './pages/AddPostPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPages />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-detail/:postId" element={<PostDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news-detail" element={<NewsDetail />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addPost" element={<AddPostPage />} />
      </Routes>
    </Router>
  </StrictMode>,
);
