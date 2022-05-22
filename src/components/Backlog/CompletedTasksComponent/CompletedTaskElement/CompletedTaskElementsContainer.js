import React, {useContext, useEffect} from 'react'
import CompletedTaskElementComponent from "./CompletedTaskElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../../redux/sprints-reducer"
import {getCurrentTaskFromServer, setCurrentTask} from "../../../../redux/tasks-reducer"
import {deleteMarksScrum, getMarksScrumAll} from "../../../../redux/marksScrum-reducer"
import {TaskContext} from "../../../../context/TaskContext"
import {AuthContext} from "../../../../context/AuthContext"

const CompletedTaskElementsContainer = props => {

    const taskScrumId = props.task.task_scrum ? props.task.task_scrum.id : props.task.scrum_task_id.id

    const {setIsTaskInfo} = useContext(TaskContext)
    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const getCurrentTaskFromServer = (value) => {
        const id = !!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        props.getCurrentTaskFromServer(id, headers)
    }

    const taskInfoHandler = (value) => {
        props.setCurrentTask(value)
    }

    useEffect(() => {
        props.getMarksScrumAll(taskScrumId, headers)
    }, [])

    return (
        <>
            <CompletedTaskElementComponent
                currentProject={props.currentProject.scrum_project}
                taskInfoHandler={taskInfoHandler} index={props.index} task={props.task}
                getCurrentTaskFromServer={getCurrentTaskFromServer}
                setIsTaskInfo={setIsTaskInfo}
                marksScrumAll={props.marksScrumAll}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject,
    marksScrumAll: state.marksScrumReducer.marksScrumAll
})

export default compose(
    connect(mapStateToProps, {getSprints, setCurrentTask, getCurrentTaskFromServer, getMarksScrumAll, deleteMarksScrum})
)(CompletedTaskElementsContainer)
