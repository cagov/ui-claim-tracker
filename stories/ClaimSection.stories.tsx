import { Story, Meta } from '@storybook/react'

import { ClaimSection as ClaimSectionComponent, ClaimSectionProps } from '../components/ClaimSection'
import * as ClaimDetailsStories from './ClaimDetails.stories'
import * as ClaimStatusStories from './ClaimStatus.stories'

export default {
  title: 'Component/Page Section/Claim Section',
  component: ClaimSectionComponent,
} as Meta

const Template: Story<ClaimSectionProps> = (args) => <ClaimSectionComponent {...args} />

export const ClaimSection = Template.bind({})
ClaimSection.args = {
  ...ClaimDetailsStories.ClaimDetails.args,
  ...ClaimStatusStories.ClaimStatus.args,
}
