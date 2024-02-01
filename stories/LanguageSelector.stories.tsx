import { Story, Meta } from '@storybook/react'

import { LanguageSelector as LanguageSelectorComponent } from '../components/LanguageSelector'

export default {
  title: 'Component/Atoms/External Link',
  component: LanguageSelectorComponent,
} as Meta

const Template: Story = (args) => <LanguageSelectorComponent {...args} />

export const LanguageSelector = Template.bind({})
LanguageSelector.args = {}
