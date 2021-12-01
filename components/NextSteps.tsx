import { NextStepsList } from './NextStepsList'
import { TransLineContent } from '../types/common'

export interface NextStepsProps {
  userArrivedFromUioMobile: boolean
  header: string[]
  nextSteps: Array<TransLineContent | TransLineContent[]>
}

export const NextSteps: React.FC<NextStepsProps> = ({ userArrivedFromUioMobile = false, header, nextSteps }) => {
  return (
    <div className="next-steps claim-subsection">
      <h3 className="next-steps-header">{header}</h3>
      <div className="next-step-explanation">
        <NextStepsList userArrivedFromUioMobile={userArrivedFromUioMobile} nextSteps={nextSteps} />
      </div>
    </div>
  )
}
