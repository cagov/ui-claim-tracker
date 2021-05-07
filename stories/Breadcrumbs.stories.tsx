import { Story, Meta } from '@storybook/react'

import { Breadcrumbs as BreadcrumbsComponent } from '../components/Breadcrumbs'

export default {
  title: 'Component/Atoms/Breadcrumbs',
  component: BreadcrumbsComponent,
} as Meta

const Template: Story = (args) => <BreadcrumbsComponent {...args} />

export const Breadcrumbs = Template.bind({})
Breadcrumbs.args = {
  user: {},
}
