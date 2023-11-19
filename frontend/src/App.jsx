import Main from "./Main/Main";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router=createBrowserRouter([
  {
    path:"/",
    element: <Main/>
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App
