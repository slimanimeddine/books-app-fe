import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Alert, Divider, Text, TextInput, PasswordInput, Button, Group, Box } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { useForm } from '@mantine/form'
import { useLoginMutation } from '../features/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, selectCurrentUser } from '../features/auth/authSlice'

const SignIn = () => {
	const [loginError, setLoginError] = useState(null)
	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		}
	})

	const currentUser = useSelector(selectCurrentUser)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [login, loginState] = useLoginMutation()
	const canSubmit = form.values.username && form.values.password  && !loginState.isLoading

	const onSignInClicked = async () => {
		if (canSubmit) {
			try {
				const loginResult = await login(form.values).unwrap()
				dispatch(setCredentials({
					user: {
						id: loginResult._doc._id,
						name: loginResult._doc.name,
						username: loginResult._doc.username,
						books: loginResult._doc.books,
						shelves: loginResult._doc.shelves
					},
					token: loginResult.token
				}))
				navigate('/')
			} catch (err) {
				setLoginError(err)
				setTimeout(() => {
					setLoginError(null)
				}, 5000)
			}
		}
	}

	if (currentUser) {
		return (
			<Navigate to='/' replace={true} />
		)
	}

	return (
		<Box sx={{ maxWidth: 300 }} mx="auto">
			<Text align="center" sx={{ fontSize: 50 }}>Sign in</Text>
			<Alert sx={{ display: !loginError ? 'none' : 'contents' }} icon={<IconAlertCircle size={16} />} title="There was a problem" color="red">
				{loginError?.data?.error}
			</Alert>
			<form >
				<TextInput
					withAsterisk
					label="Username"
					placeholder="Username"
					{...form.getInputProps('username')}
				/>

				<PasswordInput
					placeholder="Password"
					label="Password"
					withAsterisk
					{...form.getInputProps('password')}
				/>

				<Group position="center" mt="md">
					<Button type='button' onClick={onSignInClicked} fullWidth disabled={!canSubmit} loading={loginState.isLoading}>Sign in</Button>
				</Group>

				<Divider my="xs"
					label={<Text size="md">New to Booksgenix?</Text>}
					labelPosition="center"
				/>

				<Group position="center" mt="md">
					<Button fullWidth variant="outline" component={Link} to="/signup">Sign up</Button>
				</Group>
			</form>
			<Text sx={{ position: 'absolute', bottom: 30, align: 'center', marginLeft: 70 }} color="dimmed">© 2022 Booksgenix, Inc.</Text>
		</Box>
	)
}

export default SignIn