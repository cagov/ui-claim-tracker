import Container from 'react-bootstrap/Container'
import { useTranslation } from 'next-i18next'
import getUrl from '../utils/browser/getUrl'

export const Footer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <footer id="footer" className="global-footer">
      <Container>
        <div className="row">
          <div className="full-width">
            <ul className="footer-links">
              <li>
                <a href="#top">{t('footer.toTop')}</a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href={getUrl('edd-about-contact')}>
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href={getUrl('edd-about-conditions-of-use')}>
                  {t('footer.conditionsOfUse')}
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href={getUrl('edd-about-privacy-policy')}>
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href={getUrl('edd-about-accessibility')}>
                  {t('footer.accessibility')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="copyright">
        <Container>{t('footer.copyright')}</Container>
      </div>
    </footer>
  )
}
