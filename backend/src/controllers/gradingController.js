
export const gradingHandler = async (req, res, next) => {
  try {
    // Response 
    return res.json({ success: true, grade: req.locals.assignmentGrade });
  } catch (error) {
    return next(error)
  }
};

