import Activity from "../models/ActivityLog.js";


export const getActivity = async(req,res)=>{
    try{
   const activity = await Activity.find().sort({createdAt:-1})
    res.status(200).json({
      success: true,
      count: activity.length,
      data: activity,
  
    });
  } catch (error) {
    console.error("Failed to get roles:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    

    }
}


export const getActivitybyId = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "activity not found",
      });
    }

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error("Failed to get activity:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};