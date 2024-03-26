import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    repositoriesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGithubPopularRepos()
  }

  getGithubPopularRepos = async () => {
    const {activeLanguage} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        repositoriesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSelectLanguage = id => {
    const selectedLanguage = languageFiltersData.find(item => id === item.id)
    this.setState(
      {activeLanguage: selectedLanguage.id},
      this.getGithubPopularRepos,
    )
  }

  renderSuccessView = () => {
    const {repositoriesList} = this.state

    return (
      <ul className="repositories-list">
        {repositoriesList.map(eachItem => (
          <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesLoadFailureViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLanguageFilterItem = () => {
    const {activeLanguage} = this.state

    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageDetails={eachLanguage}
            activeLanguage={activeLanguage}
            key={eachLanguage.id}
            onSelectLanguage={this.onSelectLanguage}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterItem()}
          {this.renderRepositoriesLoadFailureViews()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
