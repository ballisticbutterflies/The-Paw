import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SearchFormPage from '../components/SearchFormPage';
import SingleBusinessPage from '../components/SingleBusinessPage';
import AllPhotosModal from '../components/AllPhotosModal';
import CreateBusinessForm from '../components/BusinessFormPage/CreateBusinessForm';
import EditBusinessForm from '../components/BusinessFormPage/EditBusinessForm';
import ManageBusinessPage from '../components/ManageBusinessesPage';
import AddPhotosToBusiness from '../components/AddPhotosToBusiness';
import CreateReviewPage from '../components/CreateReviewPage';
import UserPage from '../components/UserPage/UserPage';

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
        path: "/businesses/new",
        element: <CreateBusinessForm />,
      },
      {
        path: "/businesses/:businessId/edit",
        element: <EditBusinessForm />,
      },
      {
        path: "/businesses/current",
        element: <ManageBusinessPage />,
      },
      {
        path: "/businesses/:businessId/addphotos",
        element: <AddPhotosToBusiness />,
      },
      {
        path: "/businesses/:businessId/images",
        element: <AllPhotosModal />,
      },
      {
        path: "/businesses/:businessId/reviews/new",
        element: <CreateReviewPage />,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
      },
    ],
  },
]);
