import { Story, Meta } from '@storybook/react'

import { InfoField as InfoFieldComponent, InfoFieldProps } from '../components/InfoField'

export default {
  title: 'Component/Atoms/Info Field',
  component: InfoFieldComponent,
} as Meta

const Template: Story<InfoFieldProps> = (args) => <InfoFieldComponent {...args} />

export const InfoField = Template.bind({})
InfoField.args = {
  label: 'Label text!',
  text: 'Field text!',
}
