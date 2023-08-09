import Project from "../models/project"

export const getAllProject = async (req, res) => {
    try {
        const Projects = await Project.find({}).populate({
            path: "member",
            populate: {
                path: "userId",
            }
        })  
        res.status(200).json({
            success: true,
            Projects
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const getOneProject = async (req, res) => {
    console.log(req.params.id);
    try {
        const project = await Project.findOne({_id: req.params.id}).populate({
            path: "member",
            populate: {
                path: "userId",
            }
        })
        res.status(200).json({
            success: true,
            project
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createProject = async (req, res) => {
    const {projectName} = req.body
    if(!projectName){
        return res.status(404).json({success: false, message: 'name Project is required'})
    }
    try {
        const newProject = new Project(req.body);
        await newProject.save()
        res.status(200).json({success: true, message: 'Project saved successfully', Project: newProject})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateProject = async (req, res) => {
    const {projectName} = req.body
    if(!projectName){
        return res.status(404).json({success: false, message: 'name Project is required'})
    }
    try {
        const UpdateConditions = { _id: req.params.id, userId: req.userId}
        const updateProject = await Project.findOneAndUpdate(UpdateConditions, req.body, {new: true})
        if(!updateProject){
            return res.status(401).json({success: false, message: 'User not authorised to update Project'})
        }
        return res.status(200).json({success: true, message: 'User updated Project successfully', Project: updateProject})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteProject = async (req, res) => {
    console.log(req.params.id);

    try {
        // const DeleteConditions = { _id: req.params.id, userId: req.userId}
        console.log(req.params.id);
        const DeleteConditions = { _id: req.params.id}
        const deleteProject = await Project.findOneAndDelete(DeleteConditions)
        if(!deleteProject){
            return res.status(401).json({success: false, message: 'User not authorised to delete Project'})
        }
        return res.status(200).json({success: true, message: 'Delete Product successfully'})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
