import { Dropdown } from 'react-bootstrap'
import { i18n } from 'next-i18next'
import { languagelist } from '../public/languages.json'
import { useRouter } from 'next/router'

export const LanguageSelector: React.FC = () => {
  const router = useRouter()
  const curLanguage = languagelist.find(function (item) {
    return item['language-code'] === i18n?.language
  })

  return (
    <Dropdown id="languageSelector">
      <Dropdown.Toggle>
        <span className="ca-gov-icon-globe">&nbsp;</span>
        {curLanguage?.language}&nbsp;
        <span className="ca-gov-icon-caret-down" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {languagelist &&
          languagelist.length > 0 &&
          languagelist.map((language) => (
            <Dropdown.Item
              key={language.display}
              className="languageSelectorTextColor"
              onClick={async () => {
                await router.push('', '', { locale: language['language-code'] })
              }}
            >
              {language.display}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
