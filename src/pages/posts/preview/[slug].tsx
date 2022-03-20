import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';
import { useSession } from 'next-auth/react'
import { RichTextField } from '@prismicio/types';
import { PrismicRichText } from '@prismicio/react';

import { getPrismicClient } from '../../../services/prismic'

import styles from '../post.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PostPreviewProps {
	post: {
		slug: string;
		title: string;
		excerpt: RichTextField;
		updatedAt: string;
	}
}

export default function PostPreview({ post }: PostPreviewProps) {
	const { data: session } = useSession();
	const router = useRouter()

	useEffect(() => {
		if (session?.activeSubscription) {
			router.push(`/posts/${post.slug}`)
		}
	}, [session])

	return (
		<>
			<Head>
				<title>{post.title} | Ignews</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					<div className={`${styles.postContent} ${styles.previewContent}`}>
						<PrismicRichText field={post.excerpt} />
					</div>

					<div className={styles.continueReading}>
						Wanna continue reading?
						<Link href='/'>
							<a>Subscribe now 🤗</a>
						</Link>
					</div>
				</article>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		//Set a static variable loadded before in another static page
		paths: [
			// { params: { slug: 'the-meaning-of-life' } }
		],
		//fallback
		//  true: load the page before getting information from getStaticProps
		//  false: return 404 if getStaticProps was not loadded
		//  blocking: wait server side rendering before showing page
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params

	const client = getPrismicClient()

	const response = await client.getByUID('hom-ignews-post', String(slug), {})

	const post = {
		slug,
		title: response.data.title,
		excerpt: [{
			...response.data.content[0],
			text: response.data.content[0].text.slice(0, 1000) + '...'
		}],
		updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		})
	}

	return {
		props: {
			post
		},
		redirect: 60 * 30 // 30 minutes
	}
}