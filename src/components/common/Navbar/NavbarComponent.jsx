import React from 'react'
import './Navbar.scss'
import {NavLink} from "react-router-dom"
import InviteColleagueContainer from "../InviteColleagueComponent/InviteColleagueContainer"
import {MenuOutlined, SettingOutlined} from "@ant-design/icons"
import {Radio, Space} from "antd"
import NavbarBurgerMenu from "./NavbarBurgerMenu/NavbarBurgerMenu"

export const NavbarComponent = ({
                                    isProjectsMenu, isStaffMenu, modalProjectsTitle,
                                    buttonProjects, buttonStaff, modalProjects, modalStaff, buttonStaffBurger,
                                    logoutHandler, currentUser, currentProjectHandler, showProjectsMenu,
                                    favoriteProjects, getFavoriteProjectHandler, isInviteColleague, setSetting,
                                    setIsInviteColleague, inviteWrapper, getProjects, isSettings,
                                    modalSettings, buttonSettings, onChangeLanguage, currentLanguage, text,
                                    isBurgerWindow, onSetIsBurgerWindow, burgerWindowRef, burgerBtnRef,
                                    showStaffMenu, showProjectsMenuBurger, isProjectsMenuBurger,
                                    buttonProjectsBurger, modalProjectsBurger, modalStaffBurger, isStaffMenuBurger,
                                    showStaffMenuBurger, setIsProjectsMenu
                                }) => {

    return (
        <nav className="navbar-container">
            <div className="burger-icon" onClick={onSetIsBurgerWindow} ref={burgerBtnRef}><MenuOutlined/></div>
            <div className="projects-wrapper">
                <ul className="nav-container">
                    <div className="brand-logo"><h1>TaskManager</h1></div>
                    <li className="nav-button-link">
                        <button onClick={() => {
                        }} className="nav-button" style={{padding: "unset"}}>
                            <NavLink to="create_task">{text("navbar.create")}</NavLink>
                        </button>
                    </li>
                    <li className="projects-container">
                        <button onMouseUp={showProjectsMenu} onMouseDown={getFavoriteProjectHandler}
                                className="nav-button" ref={buttonProjects}>{text("navbar.projects.title")}
                        </button>
                        {isProjectsMenu && <div className="dropdown-content" ref={modalProjects}>
                            <h3 ref={modalProjectsTitle}>{text("navbar.projects.favorites")}</h3>
                            <ul>
                                <li>
                                    <ul className="recent-projects">
                                        {favoriteProjects && favoriteProjects.map(project =>
                                            <li key={project.scrum_project.id} className="recent-projects-links"
                                                onClick={() => {
                                                    currentProjectHandler(project)
                                                    setIsProjectsMenu(false)
                                                }}>
                                                <NavLink to={`scrum/${project.scrum_project.project_key}`}>
                                                    {project.scrum_project.project_name}
                                                </NavLink>
                                            </li>)}
                                    </ul>
                                </li>

                                <li className="dropdown-content-links" onClick={() => setIsProjectsMenu(false)}>
                                    <NavLink to="/all_projects">{text("navbar.projects.show")}</NavLink></li>
                                <li className="dropdown-content-links" onClick={() => setIsProjectsMenu(false)}>
                                    <NavLink to="/create_project">{text("navbar.projects.create")}</NavLink></li>
                            </ul>
                        </div>}
                    </li>
                    <div className="staff-container">
                        <button onClick={showStaffMenu} onMouseDown={getProjects} className="nav-button"
                                ref={buttonStaff}>{text("navbar.staff.title")}
                        </button>
                        {isStaffMenu && <div className="dropdown-content" ref={modalStaff}>
                            <h3 style={{marginLeft: '10px'}}>{text("navbar.staff.colleague")}</h3>
                            <button className="invite-button" onClick={() => setIsInviteColleague(true)}>
                                {text("navbar.staff.invite")}
                            </button>
                        </div>}
                    </div>
                </ul>
            </div>
            <li className="user-link"><h2 style={{textTransform: 'uppercase'}}>{currentUser.username}</h2></li>
            <li className="settings-link" onClick={setSetting} ref={buttonSettings}><SettingOutlined/></li>
            {isSettings && <div className="settings-window" ref={modalSettings}>
                <h3>{text("navbar.languages.current")}: <span>{currentLanguage}</span></h3>
                <Radio.Group onChange={e => onChangeLanguage(e)} name="language" value={currentLanguage}>
                    <Space direction="vertical">
                        <Radio value={'ru'}>{text("navbar.languages.ru")}</Radio>
                        <Radio value={'en'}>{text("navbar.languages.en")}</Radio>
                        <Radio value={'by'}>{text("navbar.languages.by")}</Radio>
                    </Space>
                </Radio.Group>
                <li className="logoutLink">
                    <button onClick={logoutHandler} className="nav-button">{text("navbar.logout")}</button>
                </li>
            </div>}
            {isBurgerWindow &&
                <NavbarBurgerMenu text={text} favoriteProjects={favoriteProjects} buttonStaffBurger={buttonStaffBurger}
                                  currentProjectHandler={currentProjectHandler} isStaffMenuBurger={isStaffMenuBurger}
                                  buttonProjectsBurger={buttonProjectsBurger} modalStaffBurger={modalStaffBurger}
                                  onSetIsBurgerWindow={onSetIsBurgerWindow} showStaffMenuBurger={showStaffMenuBurger}
                                  setIsInviteColleague={setIsInviteColleague} getProjects={getProjects}
                                  burgerWindowRef={burgerWindowRef} showProjectsMenuBurger={showProjectsMenuBurger}
                                  getFavoriteProjectHandler={getFavoriteProjectHandler}
                                  isProjectsMenuBurger={isProjectsMenuBurger} modalProjectsBurger={modalProjectsBurger}
                />}
            {isInviteColleague && <InviteColleagueContainer setIsInviteColleague={setIsInviteColleague}/>}
            {isInviteColleague && <div className="invite-colleague-wrapper" ref={inviteWrapper}></div>}
        </nav>

    )
}
