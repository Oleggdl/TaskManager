import React, {useContext, useEffect, useRef, useState} from 'react'
import {NavbarComponent} from "./NavbarComponent"
import {useNavigate, useSearchParams} from "react-router-dom"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrentProject, getFavoriteProjects, getProjects, joinTheProject} from "../../../redux/projects-reducer"
import {getUser} from "../../../redux/users-reducer"
import {LanguageContext} from "../../../context/LanguageContext"
import {CurrentLanguageContext} from "../../../context/CurrentLanguageContext"

const userName = 'userName'

const NavbarContainer = props => {

    const [isProjectsMenu, setIsProjectsMenu] = useState(false)
    const [isProjectsMenuBurger, setIsProjectsMenuBurger] = useState(false)
    const [isStaffMenu, setIsStaffMenu] = useState(false)
    const [isStaffMenuBurger, setIsStaffMenuBurger] = useState(false)
    const [isInviteColleague, setIsInviteColleague] = useState(false)
    const [isSettings, setIsSettings] = useState(false)
    const [isBurgerWindow, setIsBurgerWindow] = useState(false)

    const modalStaff = useRef()
    const buttonStaff = useRef()
    const modalStaffBurger = useRef()
    const buttonStaffBurger = useRef()

    const burgerWindowRef = useRef()
    const burgerBtnRef = useRef()

    const modalProjects = useRef()
    const modalProjectsBurger = useRef()
    const modalProjectsTitle = useRef()
    const buttonProjects = useRef()
    const buttonProjectsBurger = useRef()
    const inviteWrapper = useRef()
    const modalSettings = useRef()
    const buttonSettings = useRef()

    const history = useNavigate()
    const auth = useContext(AuthContext)
    const {changeLanguage} = useContext(LanguageContext)
    const {currentLanguage, setCurrentLanguage} = useContext(CurrentLanguageContext)
    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem(userName))
        if (data && data.userName) {
            props.getUser(data.userName)
        }
    }, [])

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history('/')
    }

    const showProjectsMenu = () => {

        if (!!isProjectsMenu) {
            setIsProjectsMenu(false)
        } else {
            if (!!props.currentUser.id) {
                props.getProjects(props.currentUser.id, headers)
            }
            setIsProjectsMenu(true)
        }
    }

    const showProjectsMenuBurger = () => {

        if (!!isProjectsMenuBurger) {
            setIsProjectsMenuBurger(false)
        } else {
            if (!!props.currentUser.id) {
                props.getProjects(props.currentUser.id, headers)
            }
            setIsProjectsMenuBurger(true)
        }
    }

    const getFavoriteProjectHandler = () => {
        props.getFavoriteProjects(props.currentUser.id, headers)
    }

    const closeModalStaff = event => {
        if (event.target !== buttonStaff.current && event.target !== modalStaff.current) {
            setIsStaffMenu(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => closeModalStaff(event))
        return window.removeEventListener("click", event => closeModalStaff(event))
    }, [])

    const closeModalStaffBurger = event => {
        if (event.target !== buttonStaffBurger.current && event.target !== modalStaffBurger.current) {
            setIsStaffMenuBurger(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => closeModalStaffBurger(event))
        return window.removeEventListener("click", event => closeModalStaffBurger(event))
    }, [])

    const onCloseBurgerWindow = event => {
        if (burgerWindowRef.current) {
            if (!burgerWindowRef.current.contains(event.target) && !burgerBtnRef.current.contains(event.target)) {
                setIsBurgerWindow(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => onCloseBurgerWindow(event))
        return window.removeEventListener("click", event => onCloseBurgerWindow(event))
    }, [])

    const closeSettingsWindow = event => {
        if (modalSettings.current) {
            if (!buttonSettings.current.contains(event.target) && !modalSettings.current.contains(event.target)) {
                setIsSettings(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", event => closeSettingsWindow(event))
        return window.removeEventListener("mousedown", event => closeSettingsWindow(event))
    }, [])

    const inviteWrapperHandler = (event) => {
        if (event.target === inviteWrapper.current) {
            setIsInviteColleague(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => inviteWrapperHandler(event))
        return window.removeEventListener("click", event => inviteWrapperHandler(event))
    }, [])

    const closeModalProjects = event => {
        if (modalProjects.current) {
            if (!buttonProjects.current.contains(event.target) && !modalProjects.current.contains(event.target)) {
                setIsProjectsMenu(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => closeModalProjects(event))
        return window.removeEventListener("click", event => closeModalProjects(event))
    }, [])

    const closeModalProjectsBurger = event => {
        if (modalProjectsBurger.current) {
            if (!buttonProjectsBurger.current.contains(event.target)
                && !modalProjectsBurger.current.contains(event.target)) {
                setIsProjectsMenuBurger(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => closeModalProjectsBurger(event))
        return window.removeEventListener("click", event => closeModalProjectsBurger(event))
    }, [])

    const currentProjectHandler = project => {
        props.getCurrentProject(project)
    }


    const getProjects = () => {
        if (!!props.currentUser.id) {
            props.getProjects(props.currentUser.id, headers)
        }
    }

    useEffect(() => {
        if (!!props.currentUser.id && !!searchParams.get("joinTheTeam")) {
            let currentRole = null
            if (searchParams.get("userType") === 'product_owner') {
                currentRole = 2
            } else if (searchParams.get("userType") === 'developer') {
                currentRole = 3
            }

            props.joinTheProject(searchParams.get("projectId"), props.currentUser.id, currentRole, headers)
        }
    }, [props.currentUser])

    const setSetting = () => {
        !!isSettings ? setIsSettings(false) : setIsSettings(true)
    }

    const onChangeLanguage = e => {
        setCurrentLanguage(e.target.value)
        localStorage.setItem('currentLanguage', JSON.stringify(e.target.value))
        setIsSettings(false)
    }

    useEffect(() => {
        changeLanguage(currentLanguage)
    }, [currentLanguage])

    const {text} = useContext(LanguageContext)

    const onSetIsBurgerWindow = () => {
        isBurgerWindow ? setIsBurgerWindow(false) : setIsBurgerWindow(true)
    }

    const showStaffMenu = () => {
        !!isStaffMenu ? setIsStaffMenu(false) : setIsStaffMenu(true)
    }

    const showStaffMenuBurger = () => {
        !!isStaffMenuBurger ? setIsStaffMenuBurger(false) : setIsStaffMenuBurger(true)
    }

    return (
        <>
            <NavbarComponent isProjectsMenu={isProjectsMenu} isStaffMenu={isStaffMenu} setIsStaffMenu={setIsStaffMenu}
                             modalStaff={modalStaff} modalStaffBurger={modalStaffBurger}   buttonStaff={buttonStaff}
                             modalProjects={modalProjects} modalProjectsTitle={modalProjectsTitle} text={text}
                             buttonProjects={buttonProjects} logoutHandler={logoutHandler} projects={props.projects}
                             currentUser={props.currentUser} currentProjectHandler={currentProjectHandler}
                             showProjectsMenu={showProjectsMenu} favoriteProjects={props.favoriteProjects}
                             getFavoriteProjectHandler={getFavoriteProjectHandler} isInviteColleague={isInviteColleague}
                             setIsInviteColleague={setIsInviteColleague} isBurgerWindow={isBurgerWindow}
                             inviteWrapper={inviteWrapper} getProjects={getProjects} isSettings={isSettings}
                             setSetting={setSetting} modalSettings={modalSettings} buttonSettings={buttonSettings}
                             onChangeLanguage={onChangeLanguage} currentLanguage={currentLanguage}
                             onSetIsBurgerWindow={onSetIsBurgerWindow} burgerWindowRef={burgerWindowRef}
                             burgerBtnRef={burgerBtnRef} showStaffMenu={showStaffMenu} buttonStaffBurger={buttonStaffBurger}
                             buttonProjectsBurger={buttonProjectsBurger} modalProjectsBurger={modalProjectsBurger}
                             showProjectsMenuBurger={showProjectsMenuBurger} isProjectsMenuBurger={isProjectsMenuBurger}
                             isStaffMenuBurger={isStaffMenuBurger} setIsStaffMenuBurger={setIsStaffMenuBurger}
                             showStaffMenuBurger={showStaffMenuBurger} setIsProjectsMenu={setIsProjectsMenu}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    currentUser: state.userReducer.currentUser,
    favoriteProjects: state.projectsReducer.favoriteProjects,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getProjects, getUser, getCurrentProject, getFavoriteProjects, joinTheProject})
)(NavbarContainer)

