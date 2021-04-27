import Container from 'react-bootstrap/Container'

import { useTranslation } from 'next-i18next'

export const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <Container className="breadcrumbs">
      <a href="https://uio.edd.ca.gov">
        <span className="text">{t('crumb-uio')}</span>
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <a href="https://uio.edd.ca.gov">
        {/*  TODO what is the URL here? */}
        <span className="text">{t('crumb-your-claims')}</span>
      </a>
    </Container>
  )
}
