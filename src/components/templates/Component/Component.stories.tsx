import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Component, IProps } from './Component'
import { mockComponentProps } from './Component.mocks'

export default {
  title: 'templates/Component',
  component: Component,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Component>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Component> = args => (
  <Component {...args} />
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockComponentProps.base,
} as IProps
