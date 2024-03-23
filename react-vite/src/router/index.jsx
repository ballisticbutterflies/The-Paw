import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SearchFormPage from '../components/SearchFormPage';
import SingleBusinessPage from '../components/SingleBusinessPage';
import CreateBusinessPage from '../components/CreateBusinessPage';
import CreateReviewPage from '../components/CreateReviewPage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
        path: "reviews/new",
        element: <CreateReviewPage/>,
      },
    ],
  },
]);
