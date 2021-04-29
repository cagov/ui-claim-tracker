export interface ButtonProps {
  primary?: boolean
  label: string
}

export const Button: React.FC<ButtonProps> = ({ primary = false, label, ...props }) => {
  const mode = primary ? 'btn-primary' : 'btn-secondary'
  return (
    <button type="button" className={['btn', mode].join(' ')} {...props}>
      {label}
    </button>
  )
}
