interface Props {
  text: string
}

export const CapitalizeFirstLetter = ({ text }: Props) => {
  if (!text) return null
  return <>{text.charAt(0).toUpperCase() + text.slice(1)}</>
}
