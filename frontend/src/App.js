import LoginPage from "./components/authentication/LoginPage";
import Homepage from "./components/home/Homepage";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import Posts from "./components/posts/Posts";
import CreatePost from "./components/posts/CreatePost";
import PostDetail from "./components/posts/PostDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateToken, validateToken } from "./store/rtk-slices/tokenSlice";

function App() {
  const token = useSelector((state) => state.token).token;

  const dispatch = useDispatch();
  useEffect(() => {
    const authorizationCookie = document.cookie;
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
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
