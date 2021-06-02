import { Story, Meta } from '@storybook/react'
import { ShimmerField as ShimmerFieldComponent } from '../components/ShimmerField'

export default {
  title: 'Component/Blocks/Shimmer Field',
  component: ShimmerFieldComponent,
} as Meta

const Template: Story = (args) => <ShimmerFieldComponent {...args} />

export const ShimmerField = Template.bind({})
ShimmerField.args = {}
