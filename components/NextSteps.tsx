import { Shimmer } from './Shimmer'
import { TransLine } from './TransLine'
import { TransLineContent } from '../types/common'

export interface NextStepsProps {
  loading: boolean
  userArrivedFromUioMobile: boolean
  header: string[]
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
                {Array.isArray(nextStep) ? (
                  <ul>
                    {
                      // Include sub-bullets; ignore first element since it was already included as a main bullet above
                      nextStep.slice(1).map((subStep, index2) => (
                        <li key={index2} className="next-step">
                          <TransLine
                            loading={loading}
                            userArrivedFromUioMobile={userArrivedFromUioMobile}
                            i18nKey={subStep.i18nKey}
                            links={subStep.links}
                          />
                        </li>
                      ))
                    }
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
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
