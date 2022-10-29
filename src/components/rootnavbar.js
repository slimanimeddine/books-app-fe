/* eslint-disable react/prop-types */
import {
	createStyles,
	Navbar,
	TextInput,
	UnstyledButton,
	Text,
	Group,
	ActionIcon,
	Tooltip,
	ScrollArea,
	Loader,
	Button,
	Collapse
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
	IconSearch,
	IconPlus,
} from '@tabler/icons'
import React, {
	useState
} from 'react'
import {
	useGetShelvesQuery,
	useAddNewShelfMutation
} from '../features/shelves/shelvesSlice'

const useStyles = createStyles((theme) => ({
	navbar: {
		paddingTop: 0,
	},

	section: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		marginBottom: theme.spacing.md,

		'&:not(:last-of-type)': {
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
		},
	},

	searchCode: {
		fontWeight: 700,
		fontSize: 10,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
		}`,
	},

	mainLinks: {
		paddingLeft: theme.spacing.md - theme.spacing.xs,
		paddingRight: theme.spacing.md - theme.spacing.xs,
		paddingBottom: theme.spacing.md,
	},

	mainLink: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		fontSize: theme.fontSizes.xs,
		padding: `8px ${theme.spacing.xs}px`,
		borderRadius: theme.radius.sm,
		fontWeight: 500,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	mainLinkInner: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
	},

	mainLinkIcon: {
		marginRight: theme.spacing.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
	},

	mainLinkBadge: {
		padding: 0,
		width: 20,
		height: 20,
		pointerEvents: 'none',
	},

	collections: {
		paddingLeft: theme.spacing.md - 6,
		paddingRight: theme.spacing.md - 6,
		paddingBottom: theme.spacing.md,
	},

	collectionsHeader: {
		paddingLeft: theme.spacing.md + 2,
		paddingRight: theme.spacing.md,
		marginBottom: 5,
	},

	collectionLink: {
		display: 'block',
		padding: `8px ${theme.spacing.xs}px`,
		textDecoration: 'none',
		borderRadius: theme.radius.sm,
		fontSize: theme.fontSizes.xs,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		lineHeight: 1,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},
}))

const links = [
	{ label: 'Edit bookshelves' },
	{ label: 'All' },
]

const RootNavBar = () => {
	const [addShelfFormOpened, setAddShelfFormOpened] = useState(false)
	const addShelfForm = useForm({
		initialValues: {
			shelfName: ''
		}
	})
	const [addNewShelf, addNewShelfState] = useAddNewShelfMutation()
	const canAddNewShelf = addShelfForm.values.shelfName && !addNewShelfState.isLoading
	const onAddNewShelfClicked = async () => {
		if (canAddNewShelf) {
			try {
				await addNewShelf({
					name: addShelfForm.values.shelfName
				}).unwrap()
				addShelfForm.reset()
			} catch (err) {
				window.alert(err.data.error)
			}
		}
	}
	const { classes } = useStyles()
	const {
		data: shelves,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetShelvesQuery()

	let bookshelves

	if (isLoading) {
		bookshelves = <Loader />
	} else if (isSuccess) {
		bookshelves = shelves.map(shelf => ({
			label: shelf.name
		}))
	} else if (isError) {
		bookshelves = <div>{error.toString()}</div>
	}
	const mainLinks = links.map((link) => (
		<UnstyledButton key={link.label} className={classes.mainLink}>
			<div className={classes.mainLinkInner}>
				<span>{link.label}</span>
			</div>
		</UnstyledButton>
	))

	const bookshelvesLinks = bookshelves.map((bookshelf) => (
		<a
			href="/"
			onClick={(event) => event.preventDefault()}
			key={bookshelf.label}
			className={classes.collectionLink}
		>
			{bookshelf.label}
		</a>
	))

	return (
		<Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>

			<TextInput
				placeholder="Search"
				size="xs"
				icon={<IconSearch size={12} stroke={1.5} />}
				rightSectionWidth={70}
				styles={{ rightSection: { pointerEvents: 'none' } }}
				mb="sm"
			/>

			<Navbar.Section className={classes.section}>
				<div className={classes.mainLinks}>{mainLinks}</div>
			</Navbar.Section>

			<Navbar.Section grow component={ScrollArea} className={classes.section}>
				<Group className={classes.collectionsHeader} position="apart">
					<Text size="xs" weight={500} color="dimmed">
						Bookshelves
					</Text>
					<Tooltip label="add shelf" withArrow position="right">
						<ActionIcon component={Button} onClick={() => setAddShelfFormOpened(o => !o)} variant="default" size={18}>
							<IconPlus size={12} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</Group>
				<div className={classes.collections}>{bookshelvesLinks}</div>
				<Collapse in={addShelfFormOpened}>
					<form>
						<Group spacing='xs' position='center'>
							<TextInput
								placeholder="add shelf"
								size="xs"
								rightSection={null}
								{...addShelfForm.getInputProps('shelfName')}
							/>
							<Button type='button' size='xs' color='gray' onClick={onAddNewShelfClicked} disabled={!canAddNewShelf}>add</Button>
						</Group>
					</form>
				</Collapse>
			</Navbar.Section>
		</Navbar>
	)
}

export default RootNavBar