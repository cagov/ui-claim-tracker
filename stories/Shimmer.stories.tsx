import { Story, Meta } from '@storybook/react'
import { Shimmer as ShimmerComponent, ShimmerProps } from '../components/Shimmer'

export default {
  title: 'Component/Atoms/Shimmer Base',
  component: ShimmerComponent,
} as Meta

const Template: Story<ShimmerProps> = (args) => <ShimmerComponent {...args} />

export const ShimmerBase = Template.bind({})
ShimmerBase.args = {
  width: 120,
  height: 15,
  baseColor: '#B6B2B2',
  shimColor: '#656565',
  borderRadius: 3,
}
