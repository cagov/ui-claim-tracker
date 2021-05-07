import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCardBody as ClaimCardBodyComponent, ClaimCardBodyProps } from '../components/ClaimCardBody'

export default {
  title: 'Component/Page Section/Claim Card Body',
  component: ClaimCardBodyComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story<ClaimCardBodyProps> = (args) => <ClaimCardBodyComponent {...args} />

export const ClaimCardBody = Template.bind({})
ClaimCardBody.args = {}
