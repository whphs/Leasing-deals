import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
