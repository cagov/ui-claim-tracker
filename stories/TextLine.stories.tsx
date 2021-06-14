import { Story, Meta } from '@storybook/react'
import { TextLine as TextLineComponent, TextLineProps } from '../components/TextLine'

export default {
  title: 'Component/Atoms/Text Line',
  component: TextLineComponent,
} as Meta

const Template: Story<TextLineProps> = (args) => <TextLineComponent {...args} />

export const TextLine = Template.bind({})
TextLine.args = {}
