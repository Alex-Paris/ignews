import { GetStaticProps } from 'next';
import Head from 'next/head';
import { predicate } from "@prismicio/client";
import { RichTextField } from '@prismicio/types';
import { PrismicRichText } from '@prismicio/react';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type Post = {
	slug: string;
	title: string;
	excerpt: RichTextField;
	updatedAt: string;
};

interface PostsProps {
	posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map(post => (
						<a key={post.slug} href='#' >
							<time>{post.updatedAt}</time>
							<strong>{post.title}</strong>
							<PrismicRichText field={post.excerpt} />
						</a>
					))}
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const client = getPrismicClient();

	const response = await client.get({
		predicates: [
			predicate.at("document.type", "hom-ignews-post")
		],
		fetch: ['post.title', 'post.content'],
		pageSize: 100
	})

	const posts = response.results.map(post => {
		return {
			slug: post.uid,
			title: post.data.title,
			excerpt: [post.data.content[0]],
			updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}
	})

	// console.log(JSON.stringify(posts, null, 1));

	return {
		props: {
			posts
		}
	}
}