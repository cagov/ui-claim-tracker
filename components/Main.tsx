import Container from 'react-bootstrap/Container'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Title } from './Title'
import { Breadcrumbs } from './Breadcrumbs'
import { ClaimCard } from './ClaimCard'

export const Main: React.FC = () => {
  return (
    <main className="main">
      <Container className="main-content">
        <Breadcrumbs />
        <Title />
        <ClaimCard />
      </Container>
    </main>
  )
}
