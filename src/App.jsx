import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const analyzeProfile = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setProfile(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setProfile(data.data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>GitHub Analyzer</h1>

      <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={analyzeProfile}
        style={{
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {profile && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <img
            src={profile.avatar}
            alt=""
            width="100"
            style={{ borderRadius: "50%" }}
          />

          <h2>{profile.name}</h2>

          <p>{profile.bio}</p>

          <p>
            <strong>Followers:</strong> {profile.followers}
          </p>

          <p>
            <strong>Public Repos:</strong> {profile.publicRepos}
          </p>

          <p>
            <strong>Total Stars:</strong> {profile.totalStars}
          </p>

          <p>
            <strong>Contribution Score:</strong>{" "}
            {profile.contributionScore}
          </p>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;