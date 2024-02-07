import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'

import languages from '../public/languages.json'

export interface LanguageSelectorProps {
  assetPrefix: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ assetPrefix = '' }) => {
  const { i18n } = useTranslation()
  const curLanguage = languages.languagelist.find(function (item) {
    return item['language-code'] === i18n.language
  })

  return (
    <Dropdown id="languageSelector">
      <Dropdown.Toggle>
        <span className="ca-gov-icon-globe">&nbsp;</span>
        {curLanguage?.language}&nbsp;
        <span className="ca-gov-icon-caret-down" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {languages.languagelist &&
          languages.languagelist.length > 0 &&
          languages.languagelist.map((language) => (
            <a
              href={`.` + assetPrefix + `/${language['language-code']}`}
              className={
                language['language-code'] === curLanguage?.['language-code']
                  ? 'selected-language languageSelectorTextColor'
                  : 'languageSelectorTextColor'
              }
              key={language.display}
            >
              {language.display}
            </a>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
