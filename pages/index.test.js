import React from 'react'
import renderer from 'react-test-renderer'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Index from '../pages/index'

describe("Exemplar-react-test renderer Snapshot test", () => {
  it('renders homepage unchanged', () => {
    const tree = renderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})


describe("Example react testing-library Test", () => {
  it('has NextJS welcome text', () => {
    render(<Index />)
    expect(screen.queryByText("Welcome to")).toBeInTheDocument()
  })
})
