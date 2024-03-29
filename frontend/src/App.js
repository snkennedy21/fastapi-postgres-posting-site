import LoginPage from "./components/authentication/LoginPage";
import Signup from "./components/authentication/Signup";
import Homepage from "./components/home/Homepage";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import MobileNavigation from "./components/navigation/MobileNavigation";
import PostsListPage from "./components/posts/post_list_page/PostsListPage";
import CreatePost from "./components/posts/CreatePost";
import PostDetailPage from "./components/posts/post_detail_page/PostDetailPage";
import ProfilePage from "./components/profile/ProfilePage";
import Loading from "./components/ui/Loading";
import AuthHome from "./components/home/AuthHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { invalidateToken, validateToken } from "./store/rtk-slices/tokenSlice";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token).token;
  const dispatch = useDispatch();
  useEffect(() => {
    const authorizationCookie = document.cookie;
    if (authorizationCookie === "session=true") {
      dispatch(validateToken());
    } else {
      dispatch(invalidateToken());
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <DesktopNavigation />
        <MobileNavigation />
        <Routes>
          <Route path="/" element={token ? <AuthHome /> : <Homepage />} />
          <Route path="posts" element={<PostsListPage />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          <Route path="account">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="loading" element={<Loading />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
