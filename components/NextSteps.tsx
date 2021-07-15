import { Shimmer } from './Shimmer'
import { TransLine } from './TransLine'
import { TransLineProps } from '../types/common'

export interface NextStepsProps {
  loading: boolean
  nextSteps: TransLineProps[]
}

export const NextSteps: React.FC<NextStepsProps> = ({ loading = false, nextSteps }) => {
  if (loading) {
    return <Shimmer width="100%" height={50} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  }

  return (
    <div className="next-steps">
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
