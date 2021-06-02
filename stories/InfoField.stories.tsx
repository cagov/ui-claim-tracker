import { Story, Meta } from '@storybook/react'

import { InfoField as InfoFieldComponent, InfoFieldProps } from '../components/InfoField'

export default {
  title: 'Component/Blocks/Info Field',
  component: InfoFieldComponent,
} as Meta

const Template: Story<InfoFieldProps> = (args) => <InfoFieldComponent {...args} />

export const Loaded = Template.bind({})
Loaded.args = {}

export const Loading = Template.bind({})
Loading.args = { loading: true }
