import { NextStepsList } from './NextStepsList'
import { Shimmer } from './Shimmer'
import { TransLineContent } from '../types/common'

export interface NextStepsProps {
  loading: boolean
  userArrivedFromUioMobile: boolean
  header: string
  nextSteps: Array<TransLineContent | TransLineContent[]>
}

export const NextSteps: React.FC<NextStepsProps> = ({
  loading = false,
  userArrivedFromUioMobile = false,
  header,
  nextSteps,
}) => {
  let loadableContent: JSX.Element
  if (loading) {
    loadableContent = <Shimmer width="100%" height={50} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  } else {
    loadableContent = (
      <div className="next-step-explanation">
        <NextStepsList loading={loading} userArrivedFromUioMobile={userArrivedFromUioMobile} nextSteps={nextSteps} />
      </div>
    )
  }

  return (
    <div className="next-steps claim-subsection">
      <h3 className="next-steps-header">{header}</h3>
      {loadableContent}
    </div>
  )
}
