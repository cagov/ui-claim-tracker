import { TransLine } from './TransLine'
import { TransLineContent } from '../types/common'

export interface NextStepsListProps {
  userArrivedFromUioMobile: boolean
  nextSteps: Array<TransLineContent | TransLineContent[]>
}

export const NextStepsList: React.FC<NextStepsListProps> = ({ userArrivedFromUioMobile = false, nextSteps }) => {
  const list = (
    <ul>
      {nextSteps.map((nextStep, index) => {
        // Use the only element, or the first element if an array, as the main bullet
        // Include remaining elements in an array as sub-bullets
        const thisStep = Array.isArray(nextStep) ? nextStep[0] : nextStep

        return (
          <li key={index} className="next-step">
            <TransLine
              userArrivedFromUioMobile={userArrivedFromUioMobile}
              i18nKey={thisStep.i18nKey}
              links={thisStep.links}
            />
            {
              // Include sub-bullets; ignore first element since it was already included as a main bullet above
              Array.isArray(nextStep) ? (
                <div className="sub-bullets">
                  <NextStepsList userArrivedFromUioMobile={userArrivedFromUioMobile} nextSteps={nextStep.slice(1)} />
                </div>
              ) : null
            }
          </li>
        )
      })}
    </ul>
  )

  return list
}
