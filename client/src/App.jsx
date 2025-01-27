import { RouterProvider, BrowserRouter,createBrowserRouter } from "react-router-dom";
import Home from "./pages/home"
import ResultsPage from "./pages/result";
import Navbar from "./components/ui/navbar";
import Landing from "./pages/Landing";
import ErrorPage from "./pages/notFound";



const router = createBrowserRouter([
  {
    path : "/",
    element:<Home/>,
    errorElement: <ErrorPage />,
    children : [
      {
        index : true,
        element : < Landing/>
      },
      {
      path : "result",
      element : <ResultsPage/>
      }
    ]
  }
]);


const App = ()=>{
  return (
  <RouterProvider router = {router}/>
  )

}

export default App
