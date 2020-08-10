import React from 'react'
import Link from 'next/link'
import ContentLayout from '@layouts/Content'

export default function index(): JSX.Element {
  return (
    <ContentLayout
      title={`Hello title`}
    >
      <p>
        Content
      </p>
    </ContentLayout>
  )
}
