import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import { HomePage } from './pages/HomePage'
import { AboutPage } from "./pages/AboutPage";
import { ArticlesPage } from "./pages/ArticlesListPage";
import { ArticlePage, articlePageLoader } from "./pages/ArticlePage";
import { Layout } from "./Layout";
import { NotFound } from "./NotFound";
import { LoginPage } from "./pages/LoginPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/create-account",
        element: <CreateAccountPage />
      },
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/articles",
        element: <ArticlesPage />
      },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
        loader: articlePageLoader
      }
    ]
  }
]

const router = createBrowserRouter(routes);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
