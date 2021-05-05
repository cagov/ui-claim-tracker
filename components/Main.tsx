import Container from 'react-bootstrap/Container'

import { Title } from './Title'
import { Breadcrumbs } from './Breadcrumbs'
import { ClaimCard } from './ClaimCard'
import { TimeoutModal } from './TimeoutModal'

export const Main: React.FC = () => {
  return (
    <main className="main">
      <Container className="main-content">
        <Breadcrumbs />
        <Title />
        <ClaimCard />
      </Container>
      <TimeoutModal action="startOrUpdate" />
    </main>
  )
}
