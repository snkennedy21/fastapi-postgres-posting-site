import LoginPage from "./components/authentication/LoginPage";
import Homepage from "./components/home/Homepage";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import Posts from "./components/posts/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateToken, validateToken } from "./store/rtk-slices/tokenSlice";

function App() {
  const token = useSelector((state) => state.token).token;

  const dispatch = useDispatch();
  useEffect(() => {
    const authorizationCookie = document.cookie;
    console.log(authorizationCookie);
    if (authorizationCookie === "auth=auth") {
      dispatch(validateToken());
    } else {
      dispatch(invalidateToken());
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
