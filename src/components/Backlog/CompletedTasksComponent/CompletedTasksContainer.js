import React, {useContext} from 'react'
import CompletedTasksComponent from "./CompletedTasksComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {LanguageContext} from "../../../context/LanguageContext"

const CompletedTasksContainer = props => {

    const {text} = useContext(LanguageContext)

    return (
        <>
            <CompletedTasksComponent completedTasks={props.completedTasks} text={text}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    completedTasks: state.backlogReducer.completedTasks
})

export default compose(
    connect(mapStateToProps, {})
)(CompletedTasksContainer)
