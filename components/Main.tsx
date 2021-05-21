import Container from 'react-bootstrap/Container'

import { Title } from './Title'
import { Breadcrumbs } from './Breadcrumbs'
import { ClaimCard } from './ClaimCard'
import { LanguageSwitcher } from './LanguageSwitcher'
import { TimeoutModal } from './TimeoutModal'
import { Feedback } from './Feedback'

export interface MainProps {
  timedOut?: boolean
}

export const Main: React.FC<MainProps> = ({ timedOut = false }) => {
  return (
    <main className="main">
      <Container className="main-content">
        <Breadcrumbs />
        <Title />
        <LanguageSwitcher />
        <ClaimCard />
        <Feedback />
      </Container>
      <TimeoutModal action="startOrUpdate" timedOut={timedOut} />
    </main>
  )
}
