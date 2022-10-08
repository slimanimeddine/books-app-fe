import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/api',
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	tagTypes: ['book', 'shelf', 'user'],
	endpoints: builder => ({
		login: builder.mutation({
			query: loginInfos => ({
				url: '/login',
				method: 'POST',
				body: loginInfos
			})
		})
	})
})

export const {
	useLoginMutation
} = apiSlice