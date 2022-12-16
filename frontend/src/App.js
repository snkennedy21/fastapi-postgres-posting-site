import LoginPage from "./components/authentication/LoginPage";
import Signup from "./components/authentication/Signup";
import Homepage from "./components/home/Homepage";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import PostsListPage from "./components/posts/post_list_page/PostsListPage";
import CreatePost from "./components/posts/CreatePost";
import PostDetailPage from "./components/posts/post_detail_page/PostDetailPage";
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
          <Route path="posts" element={<PostsListPage />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
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
