/* eslint-disable react/prop-types */
import React from 'react'
import {
	Loader
} from '@mantine/core'
import { TableReviews } from './bookstable'
import {
	useGetBooksQuery,
} from '../features/books/booksSlice'

const RootMain = () => {
	let data
	const {
		data: books,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetBooksQuery()

	if (isLoading) {
		data = <Loader />
	} else if (isSuccess) {
		data = books.map(book => ({
			title: book.title,
			authors: book.authors,
			shelf: book.shelf,
			rating: book.rating,
			dateAdded: book.addingDate.toString().substring(0,10),
			cover: book.image
		}))
	} else if (isError) {
		data = <div>{error.toString()}</div>
	}
	return (
		<TableReviews data={data} />
	)
}

export default RootMain