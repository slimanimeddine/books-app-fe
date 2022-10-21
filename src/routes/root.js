/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'
import {
	AppShell,
	useMantineTheme,
} from '@mantine/core'
import RootFooter from '../components/rootfooter'
import RootHeader from '../components/rootheader'
import RootMain from '../components/rootmain'
import RootNavBar from '../components/rootnavbar'

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
			navbar={<RootNavBar />}
			aside={<></>}
			footer={<RootFooter />}
			header={<RootHeader theme={theme} opened={opened} setOpened={setOpened} user={currentUser}/>}
		>
			<RootMain currentUser={currentUser} />
		</AppShell>
	)
}

export default Root