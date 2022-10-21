/* eslint-disable react/prop-types */
import React from 'react'
import {
	Text
} from '@mantine/core'

const RootMain = ({ currentUser }) => {
	return (
		<Text>hello {currentUser.username}</Text>
	)
}

export default RootMain