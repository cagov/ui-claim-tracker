import { Shimmer } from './Shimmer'

export interface TextLineProps {
  loading: boolean
  text: string
}

export const TextLine: React.FC<TextLineProps> = ({ loading = false, text = 'Field text!' }) => {
  if (loading) {
    return <Shimmer width={120} height={15} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  }

  return <span className="text-line">{text}</span>
}
