

export type PostPageLayoutProps = {
  children: React.ReactNode
}

export default function PostPageLayoutLayout(props: PostPageLayoutProps) {
  const { children } = props
  return <main>
    {children}
  </main>
}