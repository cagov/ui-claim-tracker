import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCard as ClaimCardComponent } from '../components/ClaimCard'
import * as ClaimDetailsStories from './ClaimDetails.stories'
import * as ClaimStatusStories from './ClaimStatus.stories'

export default {
  title: 'Component/Page Section/Claim Card',
  component: ClaimCardComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <ClaimCardComponent {...args} />

export const ClaimCard = Template.bind({})
ClaimCard.args = {
  ...ClaimDetailsStories.ClaimDetails.args,
  ...ClaimStatusStories.ClaimStatus.args,
}
