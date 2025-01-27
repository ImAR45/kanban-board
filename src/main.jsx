import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CardDetails from "./components/CardDetails.jsx";
import Board from "./components/Board.jsx";
import CardDetailsBoard from "./components/CardDetailsBoard.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Board />,
      },
      {
        path: "/card/:id",
        element: <CardDetailsBoard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
