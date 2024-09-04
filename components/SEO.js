import Head from 'next/head'
import smirk from '/public/images/smirk.jpg'
import cowboy from '/public/images/favicon_io/favicon.ico'
import React from 'react'
const SEO = () => {
  const site = {
    title: 'Brad Tramel | Creative Developer',
    description:
      'Award-nominated creative developer for the Minnesota Timberwolves.',
    url: 'https://bradtramel.com',
    image: smirk,
    author: 'Brad Tramel',
    favicon: cowboy,
  }
  const twitterHandle = '@uhhhbrad'
  const mobileApp = {
    appleName: 'Brad Tramel',
    appleId: '0',
    androidName: 'Brad Tramel',
    androidId: 'c0',
  }
  return (
    <Head>
      <meta charSet='UTF-8' />
      <title>{site.title}</title>
      <meta name='description' content={site.description} />
      <meta name='author' content={site.author} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:title' content={site.title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={site.url} />
      <meta property='og:description' content={site.description} />
      <meta property='og:image' content={site.image} />
      <meta property='og:image:secure_url' content={site.image} />
      <meta property='og:image:width' content='1920' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:image:type' content='image/jpg' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content={site.url} />
      <meta name='twitter:creator' content={twitterHandle} />
      <meta name='twitter:title' content={site.title} />
      <meta name='twitter:description' content={site.description} />
      <meta name='twitter:image' content={site.image} />
      <meta name='twitter:app:name:iphone' content={mobileApp.appleName} />
      <meta name='twitter:app:id:iphone' content={mobileApp.appleId} />
      <meta
        name='twitter:app:name:googleplay'
        content={mobileApp.androidName}
      />
      <meta name='twitter:app:id:googleplay' content={mobileApp.androidId} />
      <link rel='shortcut icon' type='image/png' href={`${site.favicon}`} />
    </Head>
  )
}
export default SEO
