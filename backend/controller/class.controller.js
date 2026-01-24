const Class = require("../models/classes.model");
const Student = require("../models/student.model");

const createNewClass = async (req, res) => {
  const { name, school } = req.body;

  try {
    if (!name || !school) {
      return res.status(401).json({ message: "all fields are required" });
    }
    const isExisted = await Class.findOne({ name, school });
    if (isExisted) {
      return res.status(401).json({ message: "Class Already Existed" });
    }
    const newClass = new Class({
      name,
      school,
    });
    const saveClass = await newClass.save();
    res.status(201).json(saveClass);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ===========Get All Class==============
const getAllClass = async (req, res) => {
  try {
    let { school } = req.query;

    school = school?.trim();

    const allClass = await Class.find({ school });
    res.status(200).json(allClass);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ===========Get Class By Id==============

const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const getClass = await Class.find({ _id: id });
    res.status(200).json(getClass);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { school } = req.query;

    const classFind = await Class.findById(id);
    if (!classFind) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    const classNamae = classFind.name;

    const findStudent = await Student.deleteMany({
      classId: classNamae,
      school,
    });

    if (!findStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found in this class",
      });
    }
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { createNewClass, getAllClass, getClassById, deleteClass };
