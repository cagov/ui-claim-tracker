import { render, screen } from '@testing-library/react'
import { TransLine } from '../../components/TransLine'

const alpha = 'https://uio.edd.ca.gov/UIO/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx'
const beta = 'https://uio.edd.ca.gov/UIO/Pages/ExternalUser/ClaimantAccountManagement/UIOnlineHome.aspx'

describe('TransLine component loads', () => {
  it('a string with no links or styles', () => {
    render(<TransLine i18nKey="test:transLine.plainString" userArrivedFromUioMobile={false} />)
    expect(screen.getByText('just text')).toBeInTheDocument()
  })

  it('a string with one internal link and no styles', () => {
    const links = ['uio-landing-page']
    render(<TransLine i18nKey="test:transLine.plainStringOneLink" links={links} userArrivedFromUioMobile={false} />)
    expect(screen.getByRole('link', { name: 'second' })).toHaveAttribute('href', alpha)
  })

  it('a string with multiple links and no styles', () => {
    const links = ['uio-landing-page', 'uio-home']
    render(<TransLine i18nKey="test:transLine.plainStringLinks" links={links} userArrivedFromUioMobile={false} />)
    expect(screen.getByRole('link', { name: 'second' })).toHaveAttribute('href', alpha)
    expect(screen.getByRole('link', { name: 'third' })).toHaveAttribute('href', beta)
  })

  it('a string with multiple internal links reused links and out of order', () => {
    const links = ['uio-landing-page', 'uio-home']
    render(
      <TransLine i18nKey="test:transLine.plainStringLinksComplicated" links={links} userArrivedFromUioMobile={false} />,
    )
    expect(screen.getByRole('link', { name: 'second' })).toHaveAttribute('href', alpha)
    expect(screen.getByRole('link', { name: 'fourth' })).toHaveAttribute('href', alpha)
    expect(screen.getByRole('link', { name: 'first' })).toHaveAttribute('href', beta)
    expect(screen.getByRole('link', { name: 'fifth' })).toHaveAttribute('href', beta)
  })

  it('a string with no links, but with styles', () => {
    render(<TransLine i18nKey="test:transLine.styledString" userArrivedFromUioMobile={false} />)
    expect(screen.getByText('first', { exact: false })).toBeInTheDocument()
    screen.getByText((content, element) => {
      return element === null ? false : element.tagName.toLowerCase() === 'strong' && content.startsWith('second')
    })
    expect(screen.getByText('third', { exact: false })).toBeInTheDocument()
  })

  it('a string with one internal link and styles', () => {
    const links = ['uio-landing-page']
    render(<TransLine i18nKey="test:transLine.styledStringOneLink" links={links} userArrivedFromUioMobile={false} />)
    expect(screen.getByText('first', { exact: false })).toBeInTheDocument()
    screen.getByText((content, element) => {
      return element === null ? false : element.tagName.toLowerCase() === 'strong' && content.startsWith('second')
    })
    expect(screen.getByRole('link', { name: 'third' })).toHaveAttribute('href', alpha)
  })

  it('a string with a styled internal link', () => {
    const links = ['uio-landing-page']
    render(<TransLine i18nKey="test:transLine.styledLink" links={links} userArrivedFromUioMobile={false} />)
    expect(screen.getByText('first', { exact: false })).toBeInTheDocument()
    screen.getByText((content, element) => {
      return element === null ? false : element.tagName.toLowerCase() === 'strong'
    })
    expect(screen.getByRole('link', { name: 'second' })).toHaveAttribute('href', alpha)
  })
})
