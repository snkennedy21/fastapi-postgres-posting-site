import LoginPage from "./components/authentication/LoginPage";
import Homepage from "./components/home/Homepage";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import Posts from "./components/posts/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateToken } from "./store/rtk-slices/tokenSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let cook = document.cookie;
    if (cook) {
      dispatch(validateToken());
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <DesktopNavigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
