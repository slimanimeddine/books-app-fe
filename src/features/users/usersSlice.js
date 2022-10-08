import { apiSlice } from '../api/apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getUsers: query({
			query: () => '/users',
			providesTags: (result = [], error, arg) => [
				'user',
				...result.map(({ id }) => ({ type: 'user', id }))
			]
		}),
		getUser: query({
			query: userId => `/users/${userId}`,
			providesTags: (result, error, arg) => [{ type: 'user', id: arg }],
		}),
		addNewUser: mutation({
			query: userBody => ({
				url: '/users',
				method: 'POST',
				body: userBody
			}),
			invalidatesTags: ['user']
		}),
		editUser: mutation({
			query: ({ userId, userBody }) => ({
				url: `users/${userId}`,
				method: 'PUT',
				body: userBody
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'user', id: arg.userId }],
		}),
		deleteUser: mutation({
			query: userId => ({
				url: `users/${userId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['user']
		})
	})
})

export const {
	useGetUsersQuery,
	useGetUserQuery,
	useAddNewUserMutation,
	useEditUserMutation,
	useDeleteUserMutation
} = usersApiSlice