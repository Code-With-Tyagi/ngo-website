import Volunteer from "../models/volunteer.model.js";

// Create a new volunteer application

export const applyVolunteer = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first."
      });
    }

    const existingVolunteer = await Volunteer.findOne({ user: req.userId })
      .select("_id")
      .lean();

    if (existingVolunteer) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a volunteer application."
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "ID Image proof is required"
      });
    }

    const {
      fullName,
      email,
      phone,
      dob,
      city,
      state,
      interests,
      mode,
      availability,
      occupation,
      education,
      skills,
      idType,
      idNumber,
      emergencyName,
      emergencyPhone,
      bgCheck,
      motivation,
      declaration
    } = req.body;

    const interestsArray = Array.isArray(interests)
      ? interests
      : interests
        ? [interests]
        : [];

    if (interestsArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Select at least one area of interest"
      });
    }

    const toBool = (value) => value === true || value === "true";

    const volunteer = await Volunteer.create({
      user: req.userId,
      fullName,
      email,
      phone,
      dob,
      city,
      state,
      interests: interestsArray,
      mode,
      availability,
      occupation,
      education,
      skills,
      idType,
      idNumber,
      idImage: req.file.filename, // storing file name
      emergencyName,
      emergencyPhone,
      bgCheck: toBool(bgCheck),
      motivation,
      declaration: toBool(declaration)
    });

    res.status(201).json({
      success: true,
      message: "Volunteer application submitted successfully",
      volunteer
    });

  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.user) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a volunteer application."
      });
    }

    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({
      success: false,
      message: error.message
    });
  }
};
