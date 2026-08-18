import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

const normalizeRecords = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setLeaders(normalizeRecords(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        {loading ? (
          <p className="text-muted">Loading leaderboard...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ol className="list-group list-group-numbered">
            {leaders.map((entry, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={entry.id ?? entry._id ?? `${entry.name}-${index}`}>
                <span>{entry.name ?? 'Unknown'}</span>
                <span className="badge bg-primary rounded-pill">{entry.score ?? entry.points ?? 0}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
