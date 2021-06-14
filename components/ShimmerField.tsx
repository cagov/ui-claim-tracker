import { Shimmer } from '../components/Shimmer'

export const ShimmerField = () => (
  <div className="shimmer-field">
    <div className="shimmer-label">
      <Shimmer width="40%" height={15} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
    </div>
    <div className="shimmer-text">
      <Shimmer height={45} baseColor="#e9eaeb" shimColor="#c8c9ca" borderRadius={4} marginTop={14} />
    </div>
  </div>
)
