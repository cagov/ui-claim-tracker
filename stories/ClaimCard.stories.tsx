import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCard as ClaimCardComponent } from '../components/ClaimCard'
import * as ClaimCardDetailsStories from './ClaimCardDetails.stories'
import * as ClaimCardBodyStories from './ClaimCardBody.stories'

export default {
  title: 'Component/Page Section/Claim Card',
  component: ClaimCardComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <ClaimCardComponent {...args} />

export const ClaimCard = Template.bind({})
ClaimCard.args = {
  ...ClaimCardDetailsStories.ClaimCardDetails.args,
  ...ClaimCardBodyStories.ClaimCardBody.args,
}
