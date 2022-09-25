import { Link } from "@reach/router";

export function Layout({ children }) {
  return (
    <>
      <div
        className="ui inverted menu"
        style={{ borderRadius: 0, padding: 10, marginBottom: 30 }}
      >
        <Link to={"/"} className="browse item">
          Accueil
        </Link>
      </div>
      <div className="ui container">{children}</div>
    </>
  );
}
