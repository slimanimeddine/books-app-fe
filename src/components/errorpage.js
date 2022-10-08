import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Text } from '@mantine/core'

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<>
			<Text align="center" weight={700} sx={{ fontSize: 50 }}>Oops!</Text>
			<Text align="center" size="lg">Sorry, an unexpected error has occurred.</Text>
			<Text align="center" color="dimmed">{error.statusText || error.message}</Text>
		</>
	)
}