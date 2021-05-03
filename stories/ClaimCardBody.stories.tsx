import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCardBody, ClaimCardBodyProps } from '../components/ClaimCardBody'

export default {
  title: 'Component/Page Section/ClaimCardBody',
  component: ClaimCardBody,
  decorators: [withNextRouter],
} as Meta

const Template: Story<ClaimCardBodyProps> = (args) => <ClaimCardBody {...args} />

export const Default = Template.bind({})
Default.args = {}
