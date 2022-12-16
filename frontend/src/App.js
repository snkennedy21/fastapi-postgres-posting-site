import LoginPage from "./components/authentication/LoginPage";
import Signup from "./components/authentication/Signup";
import Homepage from "./components/home/Homepage";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import PostsList from "./components/posts/post_list/PostsList";
import CreatePost from "./components/posts/CreatePost";
import PostDetail from "./components/posts/post_detail/PostDetail";
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
          <Route path="home" element={<Homepage />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="account">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
