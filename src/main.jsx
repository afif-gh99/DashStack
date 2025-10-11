import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import SignUp from './pages/SignUp'
import Root from './pages/Root'
import Products from './pages/Products'
import { UserProvider } from './UserContext'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import LogIn from './pages/LogIn'
import { ToastContainer } from 'react-toastify'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import { SearchProvider } from './SearchContext'
//Sign up inputs json
const Signinputs = [
  {
    title: "First Name:",
    placeholder: "First Name",
    type: "text",
    name: "first_name"
  },
  {
    title: "Last Name:",
    placeholder: "Last Name",
    type: "text",
    name: "last_name"
  },
  {
    title: "User Name:",
    placeholder: "Userame",
    type: "text",
    name: "user_name"
  },
  {
    title: "Email address:",
    placeholder: "example@gmail.com",
    type: "email",
    name: "email"
  },
  {
    title: "Password:",
    placeholder: "********",
    type: "password",
    name: "password"
  },
  {
    title: "Confirmation Password:",
    placeholder: "********",
    type: "password",
    name: "password_confirmation"
  },
]
//Log in inputs json
const LoginInputs = [
  {
    title: "Email address:",
    placeholder: "example@gmail.com",
    type: "email",
    name: "email"
  },
  {
    title: "Password:",
    placeholder: "********",
    type: "password",
    name: "password"
  },
]
const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignUp
      title="Create an Account"
      sub="Create an account to continue"
      btn="Sign Up"
      Signinputs={Signinputs}
    />
  },
  {
    path: '/login',
    element: <LogIn
      title="Login to your account"
      sub="Please enter your email and password to continue"
      btn="Log In"
      LoginInputs={LoginInputs}
    />
  },
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },

      {
        path: "/add-product",
        element: <AddProduct />
      },
      {
        path: "/favorites",
        element: <Favorites />
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "edit/:id",
        element: <EditProduct />
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <SearchProvider>
        <RouterProvider router={routes} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </SearchProvider>
    </UserProvider>
  </StrictMode>,
)
