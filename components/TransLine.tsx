import { Trans } from 'react-i18next'
import React from 'react'
import { Shimmer } from './Shimmer'
import { TransLineProps } from '../types/common'

export const TransLine: React.FC<TransLineProps> = ({ loading, i18nKey, links = [] }) => {
  if (loading) {
    return <Shimmer width={120} height={15} baseColor="#B6B2B2" shimColor="#656565" borderRadius={3} />
  }

  let linkComponents: JSX.Element[] = []
  if (links && links.length > 0) {
    // Disabling some linting rules for this line. The anchor <a> element will
    // be interporlated by <Trans>.
    /* eslint-disable jsx-a11y/anchor-has-content */
    /* eslint-disable react/self-closing-comp */
    linkComponents = links.map((link) => <a href={link} key={link}></a>)
    /* eslint-enable jsx-a11y/anchor-has-content */
    /* eslint-enable react/self-closing-comp */
  }
  return <Trans i18nKey={i18nKey}>{linkComponents}</Trans>
}
