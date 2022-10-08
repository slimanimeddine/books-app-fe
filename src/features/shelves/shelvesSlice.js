/* eslint-disable no-unused-vars */
import { apiSlice } from '../api/apiSlice'

export const shelvesApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getShelves: query({
			query: () => '/shelves',
			providesTags: (result = [], error, arg) => [
				'shelf',
				...result.map(({ id }) => ({ type: 'shelf', id }))
			]
		}),
		getShelf: query({
			query: shelfId => `/shelves/${shelfId}`,
			providesTags: (result, error, arg) => [{ type: 'shelf', id: arg }],
		}),
		addNewShelf: mutation({
			query: shelfBody => ({
				url: '/shelves',
				method: 'POST',
				body: shelfBody
			}),
			invalidatesTags: ['shelf']
		}),
		editShelf: mutation({
			query: ({ shelfId, shelfBody }) => ({
				url: `shelves/${shelfId}`,
				method: 'PUT',
				body: shelfBody
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'shelf', id: arg.shelfId }],
		}),
		deleteShelf: mutation({
			query: shelfId => ({
				url: `shelves/${shelfId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['shelf']
		})
	})
})

export const {
	useGetShelvesQuery,
	useGetShelfQuery,
	useAddNewShelfMutation,
	useEditShelfMutation,
	useDeleteShelfMutation
} = shelvesApiSlice