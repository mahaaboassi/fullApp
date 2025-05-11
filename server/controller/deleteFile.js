const mongoose = require("mongoose")
const Property = require('../models/Property');
const User = require("../models/User");
// Function to delete file 
const deleteFileFromProperty = async (req,res) => {
    const { filePath } = req.body ;
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({
                error: 1,
                data: [],
                message: "Property ID is required.",
                status: 400
            });
        }
        if (!filePath) {
            return res.status(400).json({
                error: 1,
                data: [],
                message: "filePath is required.",
                status: 400
            });
        }
        const currentProperty =  await Property.findById(id);
        if (!currentProperty) {
            return res.status(404).json({
                error: 1,
                data: [],
                message: "Property not found.",
                status: 404
            });
        }
        const fileExist = currentProperty.files.find( e=> e.path == filePath)
        if(!fileExist){
            return res.status(400).json({
                error: 1,
                data: [],
                message: "File not found",
                status: 404
            }); 
        }
        const newFiles = currentProperty.files.filter( e=> e.path != filePath)
      
        const propertyToUpdate = await Property.findOneAndUpdate(
            { _id: id },  // Find the document by ID
            { $set: { files: newFiles } },  // Set the updated files array
            { new: true }  // Ensure the updated document is returned
        );
        
        if (!propertyToUpdate) {
            return res.status(404).json({
                error: 1,
                data: [],
                message: "Property update failed.",
                status: 404
            });
        }
        await propertyToUpdate.save();
        // Respond with a success message
        res.status(200).json({
            error: 0,
            data:propertyToUpdate,
            message: "Property updated successfully, file removed."
        });

    } catch (error) {
      console.error('Error deleting file from database:', error);
      return false;
    }
  };



module.exports = {
    deleteFileFromProperty
}