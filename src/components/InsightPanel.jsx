import React from 'react'

export default function InsightsPanel({ insights }) {
  if (!insights) return <div className="card insights-card">Loading insights...</div>

  return (
    <div className="card insights-card">
      <h3>Overview</h3>
      <div className="ins-row">
        <div className="ins-box">
          <div className="ins-num">{insights.total}</div>
          <div className="ins-label">Total</div>
        </div>
        <div className="ins-box">
          <div className="ins-num">{insights.open}</div>
          <div className="ins-label">Open</div>
        </div>
        <div className="ins-box">
          <div className="ins-num">{insights.dueSoon}</div>
          <div className="ins-label">Due 7d</div>
        </div>
      </div>

      <div className="ins-summary">{insights.summary}</div>

      <div className="ins-prio">
        <div>High: {insights.byPriority.High || 0}</div>
        <div>Medium: {insights.byPriority.Medium || 0}</div>
        <div>Low: {insights.byPriority.Low || 0}</div>
      </div>
    </div>
  )
}
