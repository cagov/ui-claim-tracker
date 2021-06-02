export interface ShimmerProps {
  width?: string | number
  height: string | number
  baseColor: string
  shimColor: string
  borderRadius: number
  marginTop?: number
}

export const Shimmer: React.FC<ShimmerProps> = (props) => (
  <div
    className="shimmer"
    style={{
      width: props.width ? props.width : '100%',
      height: props.height,
      background: props.baseColor,
      backgroundImage: `linear-gradient(to right, ${props.baseColor} 0%, ${props.shimColor} 20%, ${props.baseColor} 40%, ${props.baseColor} 100%)`,
      backgroundRepeat: 'no-repeat',
      borderRadius: props.borderRadius,
      marginTop: props.marginTop,
    }}
  />
)
