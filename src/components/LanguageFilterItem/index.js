// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeLanguage, onSelectLanguage} = props
  const {language, id} = languageDetails

  const onclickLanguage = () => {
    onSelectLanguage(id)
  }

  const activeLanguageClass =
    activeLanguage === id ? 'language-btn active-language-btn' : 'language-btn'

  return (
    <li>
      <button
        className={activeLanguageClass}
        type="button"
        onClick={onclickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
