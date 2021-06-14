import Container from 'react-bootstrap/Container'

import { Title } from './Title'
import { Breadcrumbs } from './Breadcrumbs'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ClaimSection } from './ClaimSection'
import { TimeoutModal } from './TimeoutModal'
import { Feedback } from './Feedback'

export interface MainProps {
  timedOut?: boolean
  loading: boolean
}

export const Main: React.FC<MainProps> = ({ timedOut = false, loading = false }) => {
  return (
    <main className="main">
      <Container className="main-content">
        <Breadcrumbs />
        <Title />
        <LanguageSwitcher />
        <ClaimSection loading={loading} />
        <Feedback />
      </Container>
      <TimeoutModal action="startOrUpdate" timedOut={timedOut} />
    </main>
  )
}
