/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
	Header,
	MediaQuery,
	Burger,
	Group,
	Text,
	Input,
	Space,
	Menu,
	UnstyledButton,
	createStyles,
	Avatar,
	ActionIcon,
	Loader,
	Button
} from '@mantine/core'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { IconSearch, IconLogout, IconChevronDown, } from '@tabler/icons'
import { setCredentials } from '../features/auth/authSlice'

const useStyles = createStyles((theme) => ({
	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
		},

		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},

	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
}))


const RootHeader = ({ theme, opened, setOpened, user }) => {
	const { classes, cx } = useStyles()
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const isLoading = false
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSignOutClicked = () => {
		dispatch(setCredentials({
			user: null,
			token: null
		}))
		navigate('/signin')
	}

	return (
		<Header height={70} p="md">
			<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
				<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
					<Burger
						opened={opened}
						onClick={() => setOpened((o) => !o)}
						size="sm"
						color={theme.colors.gray[6]}
						mr="xl"
					/>
				</MediaQuery>
				<Group>
					<Text component={Link} to='/' weight={700} sx={{ fontSize: 30 }} size="xl">Booksgenix</Text>
					<Space w={300} />
					<Input
						sx={{ width: 400 }}
						placeholder="Search books"
						rightSection={
							isLoading
								? <Loader size='sm' />
								: <ActionIcon variant='transparent'>
									<IconSearch size={16} />
								</ActionIcon>
						}
					/>
					<Space w={150} />
					<Menu
						width={150}
						position="bottom-end"
						transition="pop-top-right"
						onClose={() => setUserMenuOpened(false)}
						onOpen={() => setUserMenuOpened(true)}
					>
						<Menu.Target>
							<UnstyledButton
								className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
							>
								<Group spacing={7}>
									<Avatar src={user.image} alt={user.name} radius="xl" size={20} />
									<Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
										{user.name}
									</Text>
									<IconChevronDown size={12} stroke={1.5} />
								</Group>
							</UnstyledButton>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item color="red" icon={<IconLogout size={14} />} component={Button} onClick={onSignOutClicked}>Sign out</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</div>
		</Header>
	)
}

export default RootHeader