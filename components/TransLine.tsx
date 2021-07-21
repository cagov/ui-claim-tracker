import { Trans, useTranslation } from 'react-i18next'
import React from 'react'
import { Shimmer } from './Shimmer'
import { useRouter } from 'next/router'
import { TransLineContent } from '../types/common'
import getUrl from '../utils/getUrl'

export interface TransLineProps extends TransLineContent {
  loading: boolean
  userArrivedFromUioMobile: boolean
}

export const TransLine: React.FC<TransLineProps> = ({
  loading = false,
  userArrivedFromUioMobile = false,
  i18nKey,
  links = [],
}) => {
  if (loading) {
    return <Shimmer width={120} height={15} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  }

  const { t } = useTranslation(['common', 'claim-details', 'claim-status'])

  const linkComponents: JSX.Element[] = []
  if (links && links.length > 0) {
    for (let link of links) {
      // Special case for UIO homepage links.
      if (link === 'uio-home') {
        const router = useRouter()
        const userArrivedFromUioMobile = router.query?.from === 'uiom'
        const uioHomeLink = userArrivedFromUioMobile ? getUrl('uio-home-url-mobile') : getUrl('uio-home-url-desktop')
        if (uioHomeLink) {
          link = uioHomeLink
        }
      }

      // Disabling some linting rules for this line. The anchor <a> element will
      // be interporlated by <Trans>.
      /* eslint-disable jsx-a11y/anchor-has-content */
      /* eslint-disable react/self-closing-comp */
      linkComponents.push(<a href={t(link)} key={link}></a>)
      /* eslint-enable jsx-a11y/anchor-has-content */
      /* eslint-enable react/self-closing-comp */
    }
  }
  return <Trans i18nKey={i18nKey}>{linkComponents}</Trans>
}
