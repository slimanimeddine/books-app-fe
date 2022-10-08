/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'
import { Navigate, Link } from 'react-router-dom'
import {
	createStyles,
	Menu,
	Avatar,
	Loader,
	ActionIcon,
	Group,
	AppShell,
	Navbar,
	UnstyledButton,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	Space,
	useMantineTheme,
	Input
} from '@mantine/core'
import { IconSearch, IconLogout, IconHeart,
	IconStar,
	IconMessage,
	IconSettings,
	IconPlayerPause,
	IconTrash,
	IconSwitchHorizontal,
	IconChevronDown, } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
		}`,
		marginBottom: 120,
	},

	mainSection: {
		paddingBottom: theme.spacing.sm,
	},

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

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},

	tabs: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	tabsList: {
		borderBottom: '0 !important',
	},

	tab: {
		fontWeight: 500,
		height: 38,
		backgroundColor: 'transparent',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		},

		'&[data-active]': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
			borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		},
	},
}))


const Root = () => {
	const theme = useMantineTheme()
	const [opened, setOpened] = useState(false)
	const currentUser = useSelector(selectCurrentUser)

	if (!currentUser) {
		return (
			<Navigate to='/signin' replace={true} />
		)
	}

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={<RootNavBar opened={opened} />}
			aside={
				<MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
					<Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
						<Text>Application sidebar</Text>
					</Aside>
				</MediaQuery>

			}
			footer={<RootFooter />}
			header={<RootHeader theme={theme} opened={opened} setOpened={setOpened} user={currentUser}/>}
		>
			<RootMain currentUser={currentUser} />
		</AppShell>
	)
}

const RootFooter = () => {
	return (
		<Footer height={60} p="md">
			<Text align='center' color="dimmed">© 2022 Booksgenix, Inc.</Text>
		</Footer>
	)
}

const RootNavBar = ({ opened }) => {
	return (
		<Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
			<Text>Application navbar</Text>
		</Navbar>
	)
}

const RootAside = () => {
	return (
		<MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
			<Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
				<Text>Application sidebar</Text>
			</Aside>
		</MediaQuery>
	)
}

const RootHeader = ({ theme, opened, setOpened, user }) => {
	const { classes, cx } = useStyles()
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const isLoading = false
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
						width={200}
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
							<Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                Delete account
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
					{/*<Menu zIndex={5}>
						<Menu.Target>
							<Avatar radius='xl' sx={{ cursor: 'pointer' }} src={null} color="indigo" />
						</Menu.Target>
						<Menu.Dropdown sx={{ zIndex: 5 }}>
							<Menu.Item color="red" icon={<IconLogout size={14} />}>Logout</Menu.Item>
						</Menu.Dropdown>
					</Menu> */}
				</Group>
			</div>
		</Header>
	)
}

const RootMain = ({ currentUser }) => {
	return (
		<Text>hello {currentUser.username}</Text>
	)
}

export default Root