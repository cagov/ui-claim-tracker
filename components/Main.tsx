import Container from 'react-bootstrap/Container'

import { Title } from './Title'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ClaimSection } from './ClaimSection'
import { TimeoutModal } from './TimeoutModal'

export interface MainProps {
  timedOut?: boolean
  loading: boolean
  mobile: boolean
}

export const Main: React.FC<MainProps> = ({ timedOut = false, loading = false, mobile = false }) => {
  return (
    <main className="main">
      <Container className="main-content">
        <Title />
        <LanguageSwitcher mobile={mobile} />
        <ClaimSection loading={loading} />
      </Container>
      <TimeoutModal action="startOrUpdate" timedOut={timedOut} />
    </main>
  )
}
