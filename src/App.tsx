import { Header } from "./components/Header";
import "./global.css";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import { Post, PostType } from "./components/Post";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/14796276?v=4",
      name: "Almeida Miranda Deijaí",
      role: "CTO @ Div Klass and Mobile Developer",
    },
    publishedAt: new Date("2023-07-13 10:20:00"),
    content: [
      { type: "paragraph", content: "#SoundsLike (United States) ✋" },
      {
        type: "paragraph",
        content: `For Pandora (@pandoramusic), there is bound to be a piece of music for
      each emoji. At least this is what the American music streaming giant
      wanted to prove with its campaign #SoundsLike.`,
      },
      { type: "link", content: `{" "}👉 design.com.br/design` },
      { type: "link", content: `#novoprojeto` },
      { type: "link", content: `#reactjs` },
      { type: "link", content: `#web` },
    ],
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/14796276?v=4",
      name: "Almeida Miranda Deijaí",
      role: "CTO @Div_Klass and Mobile Developer",
    },
    publishedAt: new Date("2023-07-12 09:10:00"),
    content: [
      { type: "paragraph", content: "#SoundsLike (United States) ✋" },
      {
        type: "paragraph",
        content: `For Pandora (@pandoramusic), there is bound to be a piece of music for
      each emoji. At least this is what the American music streaming giant
      wanted to prove with its campaign #SoundsLike.`,
      },
      { type: "link", content: `{" "}👉 design.com.br/design` },
      { type: "link", content: `#novoprojeto` },
      { type: "link", content: `#reactjs` },
      { type: "link", content: `#web` },
    ],
  },
];

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
             post={post}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
