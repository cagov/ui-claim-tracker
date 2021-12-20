import { Story, Meta } from '@storybook/react'

import { ExternalLink as ExternalLinkComponent, ExternalLinkProps } from '../components/ExternalLink'

export default {
  title: 'Component/Atoms/External Link',
  component: ExternalLinkComponent,
} as Meta

const Template: Story<ExternalLinkProps> = (args) => <ExternalLinkComponent {...args} />

export const ExternalLink = Template.bind({})
ExternalLink.args = {
  url: 'edd-ca-gov',
  text: 'External Link text!',
}
