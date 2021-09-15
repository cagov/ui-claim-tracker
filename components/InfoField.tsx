import { ShimmerField } from './ShimmerField'

export interface InfoFieldProps {
  loading?: boolean
  label: string
  text: string
}

export const InfoField: React.FC<InfoFieldProps> = ({ loading = false, label, text }) => {
  if (loading) {
    return <ShimmerField />
  }

  return (
    <div className="info">
      <div className="info-label">{label}</div>
      <div className="info-entry">{text}</div>
    </div>
  )
}
