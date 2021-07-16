import { Story, Meta } from '@storybook/react'
import { TransLine as TransLineComponent } from '../components/TransLine'
import { TransLineProps } from '../types/common'

export default {
  title: 'Component/Atoms/Trans Line',
  component: TransLineComponent,
} as Meta

const Template: Story<TransLineProps> = (args) => <TransLineComponent {...args} />

export const TransLine = Template.bind({})
TransLine.args = {
  i18nKey: 'work-in-progress.message',
  // There are two links in this array because the work-in-progress.message translation
  // string uses <1> as the link placeholder. <0> is not used and is ignored.
  links: ['example.com/placeholder', 'https://edd.ca.gov'],
}
