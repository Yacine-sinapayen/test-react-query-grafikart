import "./App.css";
import { Layout } from "./Layout";
import { Posts } from "./pages/Posts";
import { Post } from "./pages/Post";
import { Router } from "@reach/router";

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Posts path="/" />
          <Post path="/posts/:post" />
        </Router>
      </Layout>
    </>
  );
}

export default App;
