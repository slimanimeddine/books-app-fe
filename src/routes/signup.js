import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Alert, Text, TextInput, PasswordInput, Button, Group, Box } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { useForm } from '@mantine/form'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'
import { useAddNewUserMutation } from '../features/users/usersSlice'

const SignUp = () => {
	const [signUpError, setSignUpError] = useState(null)
	const form = useForm({
		initialValues: {
			name: '',
			username: '',
			password: '',
		}
	})

	const currentUser = useSelector(selectCurrentUser)
	const navigate = useNavigate()

	const [addNewUser, addNewUserState] = useAddNewUserMutation()
	const canSubmit = form.values.username && form.values.username && form.values.password  && !addNewUserState.isLoading

	const onSignUpClicked = async () => {
		if (canSubmit) {
			try {
				addNewUser(form.values).unwrap()
				navigate('/signin')
			} catch (err) {
				setSignUpError(err)
				setTimeout(() => {
					setSignUpError(null)
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
			<Text align="center" sx={{ fontSize: 50 }}>Sign up</Text>
			<Alert sx={{ display: !signUpError ? 'none' : 'contents' }} icon={<IconAlertCircle size={16} />} title="There was a problem" color="red">
				{signUpError?.data?.error}
			</Alert>
			<form>
				<TextInput
					withAsterisk
					label="Your Name"
					placeholder="Your Name"
					{...form.getInputProps('name')}
				/>

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
					<Button fullWidth type="button" onClick={onSignUpClicked} disabled={!canSubmit} loading={addNewUserState.isLoading}>Create Account</Button>
				</Group>
			</form>
			<Text size="md" sx={{ marginTop: 10 }}>Already have an account? <Text variant="link" component={Link} to="/signin">Sign in</Text></Text>
			<Text sx={{ position: 'absolute', bottom: 30, align: 'center', marginLeft: 70 }} color="dimmed">© 2022 Booksgenix, Inc.</Text>
		</Box>
	)
}

export default SignUp