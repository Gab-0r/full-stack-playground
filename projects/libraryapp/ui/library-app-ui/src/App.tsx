import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MembersPage from "./pages/MembersPage";
import LoansPage from "./pages/LoansPage";
import BooksPage from "./pages/BooksPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar></NavBar>
        </div>

        <Routes>
          <Route path="/" element={<LoansPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
