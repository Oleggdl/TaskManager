import React, {useContext} from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import {useForm} from "antd/es/form/Form"
import ProjectInfoComponent from "./ProjectInfoComponent"
import {AuthContext} from "../../../../context/AuthContext"
import {getProjectById, getProjects, updateProject} from "../../../../redux/projects-reducer"
import {LanguageContext} from "../../../../context/LanguageContext"

const ProjectInfoContainerWithHooks = props => {
    const [form] = useForm()
    const {text} = useContext(LanguageContext)
    return <ProjectInfoContainer {...props} form={form} text={text}/>
}

class ProjectInfoContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
        }
        this.onCancel = this.onCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDeleteHandler = this.onDeleteHandler.bind(this)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
    }

    onReset() {
        this.props.form.resetFields()
    }

    onCancel() {
        this.onReset()
        this.props.setIsActions(false)
        this.props.setIsDeleteModal(false)
        this.props.getProjects(this.props.currentUser.id, this.state.headers)
    }

    handleSubmit(values) {
        this.props.updateProject(this.props.projectDataState.project.scrum_project.id,
            this.props.projectDataState.project.id, values, this.state.headers)
        this.props.getProjects(this.props.currentUser.id, this.state.headers)
        this.props.setIsActions(false)
        this.onReset()
    }

    onDeleteHandler() {
        !!this.props.isDeleteModal ? this.props.setIsDeleteModal(false) : this.props.setIsDeleteModal(true)
    }


    render() {
        return (
            <>
                <ProjectInfoComponent projects={this.props.projects} form={this.props.form} onCancel={this.onCancel}
                                      text={this.props.text}
                                      handleSubmit={this.handleSubmit} projectWrapper={this.props.projectWrapper}
                                      onDeleteHandler={this.onDeleteHandler} isDeleteModal={this.props.isDeleteModal}
                                      setIsDeleteModal={this.props.setIsDeleteModal}
                                      projectDataAll={this.props.projectData}
                                      projectData={this.props.projectDataState.project.scrum_project}
                                      setIsActions={this.props.setIsActions}
                                      userScrumProject={this.props.projectData}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    projectData: state.projectsReducer.projectData,
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {updateProject, getProjects, getProjectById})
)(ProjectInfoContainerWithHooks)

