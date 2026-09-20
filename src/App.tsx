import { useState } from "react";
import Nav from "./components/Nav";
import AboutMe from "./pages/AboutMe";
import BoardPage from "./pages/BoardPage";

type Page = "home" | "about";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
      <Nav current={page} onNavigate={setPage} />
      {page === "about" ? (
        <AboutMe onNavigate={setPage} />
      ) : (
        <BoardPage />
      )}
    </>
  );
}
