import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { useRef, useEffect } from 'react'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  const penmarkRef = useRef(null)

  //inject penmark script
  useEffect(() => { 
    const script = document.createElement('script');
    script.setAttribute('type', 'module');
    script.setAttribute('src', 'https://penmark.appsinprogress.com/dist/DraftsClient.js');
    script.setAttribute('draftsFolder', '_drafts');
    script.setAttribute('postsFolder', '_posts');
    script.setAttribute('imagesFolder', 'public/assets/blog');
    script.setAttribute('githubUsername', 'penmark-cms');
    script.setAttribute('githubRepoName', 'penmark-nextjs-example');
    script.async = true;

    if (penmarkRef.current) {
      penmarkRef.current.appendChild(script);
    }

    if(window.penmarkDraftsInit) {
      window.penmarkDraftsInit();
    }
  }, [penmarkRef]);

  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          <div ref={penmarkRef}></div>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
