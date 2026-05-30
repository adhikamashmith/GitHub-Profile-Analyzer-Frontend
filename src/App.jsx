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
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch profile");
      }

      setProfile(data.data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Global CSS Injector for responsive behavior and modern resets */}
      <style>{`
        :root {
          --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          --card-bg: rgba(255, 255, 255, 0.03);
          --card-border: rgba(255, 255, 255, 0.08);
          --accent-glow: rgba(99, 102, 241, 0.15);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --accent: #6366f1;
          --accent-hover: #4f46e5;
        }

        body {
          margin: 0;
          background: var(--bg-gradient);
          min-height: 100vh;
          color: var(--text-main);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          width: 90%;
          max-width: 580px;
          margin: 40px auto;
          padding: 24px;
          box-sizing: border-box;
        }

        .disclaimer-banner {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .analyzer-card {
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--card-border);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255,255,255,0.05);
          padding: 32px;
          border-radius: 20px;
        }

        .title {
          margin: 0 0 24px 0;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          background: linear-gradient(to right, #fff, var(--text-muted));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .search-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .input-field {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--card-border);
          padding: 14px 16px;
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }

        .submit-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          width: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--accent-hover);
        }
        
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-msg {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 12px;
          border-radius: 10px;
          margin-top: 20px;
          font-size: 0.95rem;
        }

        .profile-card {
          margin-top: 28px;
          border-top: 1px solid var(--card-border);
          padding-top: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .avatar {
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          margin-bottom: 16px;
        }

        .profile-name {
          margin: 0 0 8px 0;
          font-size: 1.5rem;
        }

        .profile-bio {
          color: var(--text-muted);
          margin: 0 0 20px 0;
          font-size: 0.95rem;
          line-height: 1.5;
          max-width: 400px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
          margin-bottom: 24px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          padding: 12px;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .stat-item strong {
          color: var(--text-muted);
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
        }

        .profile-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .profile-link:hover {
          color: #818cf8;
          text-decoration: underline;
        }

        /* Responsive Layout adjustments for tablets and desktops */
        @media (min-width: 480px) {
          .search-group {
            flex-direction: row;
          }
          .submit-btn {
            width: auto;
            white-space: nowrap;
          }
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .profile-card {
            align-items: flex-start;
            text-align: left;
          }
          .stats-grid {
            text-align: left;
          }
        }
      `}</style>

      <div className="container">
        {/* Production Disclaimer Banner */}
        <div className="disclaimer-banner">
          <strong>⚠️ Note on Availability:</strong> This application performs 
          perfectly in local environments. However, because the live deployment 
          utilizes free-tier database and hosting infrastructure, the backend 
          services may occasionally spin down or hit rate limits, leading to 
          temporary API errors.
        </div>

        <div className="analyzer-card">
          <h1 className="title">GitHub Analyzer</h1>

          <div className="search-group">
            <input
              type="text"
              className="input-field"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />

            <button
              className="submit-btn"
              onClick={analyzeProfile}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}

          {profile && (
            <div className="profile-card">
              <img
                src={profile.avatar}
                alt={`${profile.name || username}'s avatar`}
                width="90"
                height="90"
                className="avatar"
              />

              <h2 className="profile-name">{profile.name || username}</h2>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}

              <div className="stats-grid">
                <div className="stat-item">
                  <strong>Followers</strong>
                  <div className="stat-value">{profile.followers ?? 0}</div>
                </div>
                <div className="stat-item">
                  <strong>Public Repos</strong>
                  <div className="stat-value">{profile.publicRepos ?? 0}</div>
                </div>
                <div className="stat-item">
                  <strong>Total Stars</strong>
                  <div className="stat-value">{profile.totalStars ?? 0}</div>
                </div>
                <div className="stat-item">
                  <strong>Score</strong>
                  <div className="stat-value">{profile.contributionScore ?? 0}</div>
                </div>
              </div>

              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                View GitHub Profile ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;