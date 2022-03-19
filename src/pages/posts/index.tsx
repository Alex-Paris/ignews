import { GetStaticProps } from 'next';
import Head from 'next/head';
import { predicate } from "@prismicio/client";

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

export default function Posts() {
	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.posts}>
					<a href='#'>
						<time>12 de março de 2021</time>
						<strong>Creating a monorepo amimiam</strong>
						<p>In this guide, you will learn how to creatiajfaoi af a jas jasfasfa ija asfasfa ij asfas j </p>
					</a>
					<a href='#'>
						<time>12 de março de 2021</time>
						<strong>Creating a monorepo amimiam</strong>
						<p>In this guide, you will learn how to creatiajfaoi af a jas jasfasfa ija asfasfa ij asfas j </p>
					</a>
					<a href='#'>
						<time>12 de março de 2021</time>
						<strong>Creating a monorepo amimiam</strong>
						<p>In this guide, you will learn how to creatiajfaoi af a jas jasfasfa ija asfasfa ij asfas j </p>
					</a>
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

	console.log(JSON.stringify(response, null, 2));

	return {
		props: {}
	}
}