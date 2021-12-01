export interface InfoFieldProps {
  label: string
  text: string
}

export const InfoField: React.FC<InfoFieldProps> = ({ label, text }) => {
  return (
    <div className="info">
      <div className="info-label">{label}</div>
      <div className="info-entry">{text}</div>
    </div>
  )
}
