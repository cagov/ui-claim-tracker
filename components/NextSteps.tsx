import { Shimmer } from './Shimmer'
import { TransLine } from './TransLine'
import { TransLineProps } from '../types/common'

export interface NextStepsProps {
  loading: boolean
  header: string[]
  nextSteps: TransLineProps[]
}

export const NextSteps: React.FC<NextStepsProps> = ({ loading = false, header, nextSteps }) => {
  let loadableContent: JSX.Element
  if (loading) {
    loadableContent = <Shimmer width="100%" height={50} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  } else {
    loadableContent = (
      <div className="next-step-explanation">
        <ul>
          {nextSteps.map((nextStep, index) => (
            <li key={index} className="next-step">
              <TransLine i18nKey={nextStep.i18nKey} links={nextStep.links} />
            </li>
          ))}
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
