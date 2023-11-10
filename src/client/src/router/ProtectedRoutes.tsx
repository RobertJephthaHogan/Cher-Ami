import React from "react"
import {Navigate, Outlet} from "react-router-dom"

const useAuth = () => {
	let user;
	const _user = localStorage.getItem("user")
	if (_user) {
		user = JSON.parse(_user)
		console.log('user', user)
	}
	if (user?.data?.role) {
		return {
			auth: true,
			role: user?.data?.role,
		}
	} else {
		return {
			auth: false,
			role: null,
		}
	}
}

type ProtectedRouteType = {
	roleRequired?: "user" | "admin"
};

const ProtectedRoutes = (props: ProtectedRouteType) => {
	const {auth, role} = useAuth()

	if (props.roleRequired) {
		return auth ? (
			props.roleRequired === role ? (
				<Outlet />
			) : (
				<Navigate to="/denied" />
			)
		) : (
			<Navigate to="/login" />
		)
	} else {
		return auth ? <Outlet /> : <Navigate to="/login" />
	}
}

export default ProtectedRoutes
