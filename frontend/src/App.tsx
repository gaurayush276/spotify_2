
import Home from './pages/home/Home.js';
import {createBrowserRouter, RouterProvider}  from 'react-router-dom' ;
import AuthCallback from './pages/authCallbackPages/AtuhCallback.js';
import { THEMES } from './utils/Themes.js';
import AuthProvider from './Provider/AuthProvider.js';
function App() {
 
const appRouter = createBrowserRouter([
  {
    path : '/' , 
    element : <Home/>
  },
  {
    path : '/auth-callback' , 
    element : <AuthCallback/>
  },
])
  

  return (
    <div data-theme = {THEMES[27] } >
      <AuthProvider>
       <RouterProvider router={appRouter}>

       </RouterProvider>
      </AuthProvider>
    </div>
  )
}

export default App
