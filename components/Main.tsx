import Container from 'react-bootstrap/Container'

import { Title } from './Title'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ClaimSection } from './ClaimSection'
import { TimeoutModal } from './TimeoutModal'
import { ScenarioContent } from '../types/common'

export interface MainProps extends ScenarioContent {
  timedOut?: boolean
  loading: boolean
  userArrivedFromUioMobile: boolean
}

export const Main: React.FC<MainProps> = ({
  timedOut = false,
  loading = false,
  userArrivedFromUioMobile = false,
  statusContent,
  detailsContent,
}) => {
  return (
    <main className="main">
      <Container className="main-content">
        <Title />
        <LanguageSwitcher userArrivedFromUioMobile={userArrivedFromUioMobile} />
        <ClaimSection loading={loading} statusContent={statusContent} detailsContent={detailsContent} />
      </Container>
      <TimeoutModal action="startOrUpdate" timedOut={timedOut} />
    </main>
  )
}
