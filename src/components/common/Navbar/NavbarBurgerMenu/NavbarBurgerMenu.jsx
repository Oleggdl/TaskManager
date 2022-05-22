import React from 'react'
import {NavLink} from "react-router-dom"
import './NavbarBurgerMenu.scss'

const NavbarBurgerMenu = ({
                              isStaffMenuBurger, buttonStaffBurger, modalStaffBurger, currentProjectHandler,
                              favoriteProjects, getFavoriteProjectHandler, onSetIsBurgerWindow, getProjects,
                              setIsInviteColleague, text, burgerWindowRef, showProjectsMenuBurger, isProjectsMenuBurger,
                              buttonProjectsBurger, modalProjectsBurger, showStaffMenuBurger
                          }) => {

    return (
        <>
            <div className="burger-window-container" ref={burgerWindowRef}>
                <div className="brand-logo"><h1>TaskManager</h1></div>
                <ul className="nav-container nav-burger-container">
                    <li>
                        <button onClick={() => onSetIsBurgerWindow()} className="nav-button"
                                style={{padding: "unset"}}>
                            <NavLink to="create_task">{text("navbar.create")}</NavLink>
                        </button>
                    </li>
                    <li className="projects-container">
                        <button onMouseUp={showProjectsMenuBurger} onMouseDown={getFavoriteProjectHandler}
                                className="nav-button" ref={buttonProjectsBurger}>{text("navbar.projects.title")}
                        </button>
                        {isProjectsMenuBurger && <div className="dropdown-content" ref={modalProjectsBurger}>
                            <h3>{text("navbar.projects.favorites")}</h3>
                            <ul>
                                <li>
                                    <ul className="recent-projects">
                                        {favoriteProjects && favoriteProjects.map(project =>
                                            <li key={project.scrum_project.id} className="recent-projects-links"
                                                onClick={() => {
                                                    currentProjectHandler(project)
                                                    onSetIsBurgerWindow()
                                                }}>
                                                <NavLink to={`scrum/${project.scrum_project.project_key}`}>
                                                    {project.scrum_project.project_name}
                                                </NavLink>
                                            </li>)}
                                    </ul>
                                </li>

                                <li className="dropdown-content-links" onClick={() => onSetIsBurgerWindow()}>
                                    <NavLink to="/all_projects">{text("navbar.projects.show")}</NavLink></li>
                                <li className="dropdown-content-links" onClick={() => onSetIsBurgerWindow()}>
                                    <NavLink to="/create_project">{text("navbar.projects.create")}</NavLink></li>
                            </ul>
                        </div>}
                    </li>
                    <div className="staff-container">
                        <button onClick={showStaffMenuBurger} onMouseDown={getProjects} className="nav-button"
                                ref={buttonStaffBurger}
                                style={{width: '100%', textAlign: 'left'}}>{text("navbar.staff.title")}
                        </button>
                        {isStaffMenuBurger && <div className="dropdown-content" ref={modalStaffBurger}>
                            <h3 style={{marginLeft: '10px'}}>{text("navbar.staff.colleague")}</h3>
                            <button className="invite-button" onClick={() => setIsInviteColleague(true)}>
                                {text("navbar.staff.invite")}
                            </button>
                        </div>}
                    </div>
                </ul>
            </div>
        </>
    )
}

export default NavbarBurgerMenu
