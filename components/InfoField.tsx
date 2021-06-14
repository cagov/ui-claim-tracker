import { ShimmerField } from './ShimmerField'

export interface InfoFieldProps {
  primary?: boolean
  loading?: boolean
  label: string
  text: string
}

export const InfoField: React.FC<InfoFieldProps> = ({
  primary = false,
  loading = false,
  label = 'Label text!',
  text = 'Field text!',
}) => {
  if (loading) {
    return <ShimmerField />
  }

  return (
    <div className="info">
      <h3 className="info-label">{label}</h3>
      <span className={primary ? 'info-entry-primary' : 'info-entry'}>{text}</span>
    </div>
  )
}
