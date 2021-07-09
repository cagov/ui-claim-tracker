import { Shimmer } from './Shimmer'

export interface NextStepsProps {
  loading: boolean
  header: string[]
  nextSteps?: string[]
}

export const NextSteps: React.FC<NextStepsProps> = ({
  loading = false,
  header = 'Next Steps',
  nextSteps = ['just one step'],
}) => {
  if (loading) {
    return <Shimmer width="100%" height={50} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  }

  return (
    <div className="next-steps">
      <h3 className="next-steps-header">{header}</h3>
      <div className="explanation">
        <ul>
          {nextSteps.map((nextStep, index) => (
            <li key={index} className="next-step">
              {nextStep}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
