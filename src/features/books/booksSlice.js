import { apiSlice } from '../api/apiSlice'
import { store } from '../../app/store'

export const booksApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getBooks: query({
			query: () => '/books',
			transformResponse: res => res.filter(book => book.user.id === store.getState().auth.user.id),
			providesTags: (result = [], error, arg) => [
				'book',
				...result.map(({ id }) => ({ type: 'book', id }))
			]
		}),
		getBook: query({
			query: bookId => `/books/${bookId}`,
			providesTags: (result, error, arg) => [{ type: 'book', id: arg }],
		}),
		addNewBook: mutation({
			query: bookBody => ({
				url: '/books',
				method: 'POST',
				body: bookBody
			}),
			invalidatesTags: ['book']
		}),
		editBook: mutation({
			query: ({ bookId, bookBody }) => ({
				url: `books/${bookId}`,
				method: 'PUT',
				body: bookBody
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'book', id: arg.bookId }],
		}),
		deleteBook: mutation({
			query: bookId => ({
				url: `books/${bookId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['book']
		})
	})
})

export const {
	useGetBooksQuery,
	useGetBookQuery,
	useAddNewBookMutation,
	useEditBookMutation,
	useDeleteBookMutation
} = booksApiSlice