import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router";
import MainLayout from "./component/layout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <MainRouter />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
