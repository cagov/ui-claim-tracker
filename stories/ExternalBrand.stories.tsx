import { Story, Meta } from '@storybook/react'

import { ExternalBrand as ExternalBrandComponent, ExternalBrandProps } from '../components/ExternalBrand'

export default {
  title: 'Component/Atoms/External Brand',
  component: ExternalBrandComponent,
} as Meta

const Template: Story<ExternalBrandProps> = (args) => <ExternalBrandComponent {...args} />

export const ExternalBrand = Template.bind({})
ExternalBrand.args = {
  url: 'edd-ca-gov',
  src: '/images/Ca-Gov-Logo-Gold.svg',
  alt: 'External Brand Alt Text!',
  width: '36',
  height: '34',
}
