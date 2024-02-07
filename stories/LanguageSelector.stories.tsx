import { Story, Meta } from '@storybook/react'

import { LanguageSelector as LanguageSelectorComponent, LanguageSelectorProps } from '../components/LanguageSelector'

export default {
  title: 'Component/Atoms/External Link',
  component: LanguageSelectorComponent,
} as Meta

const Template: Story<LanguageSelectorProps> = (args) => <LanguageSelectorComponent {...args} />

export const LanguageSelector = Template.bind({})
LanguageSelector.args = {}
