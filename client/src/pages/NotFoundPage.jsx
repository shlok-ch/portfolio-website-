import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="glass-card not-found-card">
        <div className="not-found-icon-wrap">
          <AlertTriangle size={48} className="text-amber-400" />
        </div>
        <h1 className="not-found-title gradient-text">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-desc">
          The requested page could not be located. It might have been moved, renamed, or does not exist.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
