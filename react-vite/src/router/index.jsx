import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SearchFormPage from '../components/SearchFormPage';
import SingleBusinessPage from '../components/SingleBusinessPage';
import CreateBusinessPage from '../components/CreateBusinessPage';
import AllPhotosModal from '../components/AllPhotosModal/AllPhotosModal';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "search",
        element: <SearchFormPage />,
      },
      {
        path: "/businesses/:businessId",
        element: <SingleBusinessPage />,
      },
      {
        path: "/businesses",
        element: <CreateBusinessPage />,
      },
      {
        path: "/businesses/:businessId/images",
        element: <AllPhotosModal />,
      },
    ],
  },
]);
