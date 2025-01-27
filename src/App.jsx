import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { BoardProvider } from "./data/BoardProvider";

function App() {
  return (
    <>
      <BoardProvider>
        <Header />
        <Outlet />
      </BoardProvider>
    </>
  );
}

export default App;
