import React from 'react'
import './SideBar.scss'
import {NavLink} from "react-router-dom"
import {CloseOutlined, DatabaseOutlined, ProjectOutlined, ScheduleTwoTone} from "@ant-design/icons"

const SideBarComponent = ({
                              currentProject, getSprints, getBacklogElements, getStartedSprint, updateTaskSprints,
                              text, isSidebar, setIsSidebar
                          }) => {

    return (
        <>
            {!isSidebar &&
                <div className="open-sidebar-btn" onClick={() => setIsSidebar(true)}>Open Sidebar</div>}
            {isSidebar && <aside>
                <div className="project-container">
                    <div className="close-sidebar-btn" onClick={() => setIsSidebar(false)}><CloseOutlined/></div>
                    <div className="project-logo">
                        <ScheduleTwoTone/>
                    </div>
                    <div className="project-container-name">{currentProject.project_name}</div>
                </div>
                <h4>{text("sideBar.title")}</h4>
                <ul>
                    <li className="board-link-container" onClick={updateTaskSprints} onMouseDown={() => {
                        getBacklogElements()
                        getSprints()
                    }}>
                        <div><DatabaseOutlined/></div>
                        <NavLink to="backlog" className="board-link">{text("sideBar.backlog")}</NavLink>
                    </li>
                    <li className="board-link-container" onMouseDown={getStartedSprint}>
                        <div><ProjectOutlined/></div>
                        <NavLink to="board" className="board-link">{text("sideBar.board")}</NavLink>
                    </li>
                </ul>
            </aside>}
        </>
    )
}

export default SideBarComponent
