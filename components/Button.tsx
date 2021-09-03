import { MouseEventHandler } from 'react'

export interface ButtonProps {
  primary?: boolean
  label: string
  onClick?: MouseEventHandler | string
}

export const Button: React.FC<ButtonProps> = ({ primary = false, label, onClick, ...props }) => {
  const mode = primary ? 'btn-primary' : 'btn-secondary'
  return (
    <button type="button" className={['btn', mode].join(' ')} onClick={onClick} {...props}>
      {label}
    </button>
  )
}
