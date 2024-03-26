// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    name,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} className="repository-image" alt={name} />
      <h1>{name}</h1>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stats-icon"
        />
        <p className="stats-text">{starsCount}</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stats-icon"
        />
        <p className="stats-text">{forksCount}</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stats-icon"
        />
        <p className="stats-text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
