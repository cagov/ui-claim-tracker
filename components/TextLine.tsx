export interface TextLineProps {
  header?: boolean
  text: string
}

export const TextLine: React.FC<TextLineProps> = ({ header, text = 'Field text!' }) => {
  // EDD Sets some important info fields as headers
  if (header) {
    return <h3 className="header-line">{text}</h3>
  }

  return <span className="text-line">{text}</span>
}
