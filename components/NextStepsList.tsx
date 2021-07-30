import { TransLine } from './TransLine'
import { TransLineContent } from '../types/common'

export interface NextStepsListProps {
  loading: boolean
  userArrivedFromUioMobile: boolean
  nextSteps: Array<TransLineContent | TransLineContent[]>
}

export const NextStepsList: React.FC<NextStepsListProps> = ({
  loading = false,
  userArrivedFromUioMobile = false,
  nextSteps,
}) => {
  const list = (
    <ul>
      {nextSteps.map((nextStep, index) => {
        // Use the only element, or the first element if an array, as the main bullet
        // Include remaining elements in an array as sub-bullets
        const thisStep = Array.isArray(nextStep) ? nextStep[0] : nextStep

        return (
          <li key={index} className="next-step">
            <TransLine
              loading={loading}
              userArrivedFromUioMobile={userArrivedFromUioMobile}
              i18nKey={thisStep.i18nKey}
              links={thisStep.links}
            />
            {
              // Include sub-bullets; ignore first element since it was already included as a main bullet above
              Array.isArray(nextStep) ? (
                <NextStepsList
                  loading={loading}
                  userArrivedFromUioMobile={userArrivedFromUioMobile}
                  nextSteps={nextStep.slice(1)}
                />
              ) : null
            }
          </li>
        )
      })}
    </ul>
  )

  return list
}
