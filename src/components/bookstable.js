/* eslint-disable react/prop-types */
import React from 'react'
import { Image, Table, Anchor, ScrollArea, ActionIcon } from '@mantine/core'
import { IconX } from '@tabler/icons'

export const TableReviews = ({ data }) => {
	const rows = data.map((row) => {

		return (
			<tr key={row.title}>
				<td><Image width={60} height={60} src={row.cover} size={40} /></td>
				<td>{row.title}</td>
				<td>{row.rating}</td>
				<td>{row.shelf || 'none'}</td>
				<td>{row.authors.map(author => `${author}, `)}</td>
				<td>{row.dateAdded}</td>
				<td>
					<Anchor
						href="#"
						onClick={(event) => event.preventDefault()}
						sx={(theme) => ({
							paddingTop: 2,
							color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
							fontWeight: 500,
							fontSize: theme.fontSizes.xs,
						})}
					>
						edit
					</Anchor>
					<div></div>
					<Anchor
						href="#"
						onClick={(event) => event.preventDefault()}
						sx={(theme) => ({
							paddingTop: 2,
							color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
							fontWeight: 500,
							fontSize: theme.fontSizes.xs,
						})}
					>
						view
					</Anchor>
				</td>
				<td>
					<ActionIcon variant="filled">
						<IconX size={18} />
					</ActionIcon>
				</td>
			</tr>
		)
	})

	return (
		<ScrollArea>
			<Table sx={{ minWidth: 800 }} horizontalSpacing="xs" verticalSpacing="xs">
				<thead>
					<tr>
						<th>Cover</th>
						<th>title</th>
						<th>Rating</th>
						<th>Shelf</th>
						<th>Authors</th>
						<th>Date Added</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea>
	)
}