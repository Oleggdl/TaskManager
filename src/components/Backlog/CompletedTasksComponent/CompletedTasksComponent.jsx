import React from 'react'
import './CompletedTasks.scss'
import CompletedTaskElementsContainer from "./CompletedTaskElement/CompletedTaskElementsContainer"

const CompletedTasksComponent = ({completedTasks, text}) => {

    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{text("completedTasks.title")}</h4>
                </div>
                {completedTasks && completedTasks.map(task =>
                    <CompletedTaskElementsContainer key={task.id} task={task}/>)}
            </div>
        </>
    )
}

export default CompletedTasksComponent
