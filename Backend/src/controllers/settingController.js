import setting from "../models/Setting.js"
// ========================================
// GET /api/setting
// Get all setting
// ========================================

export const getSettings = async (req, res) => {
  try {
    const setting = await setting.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: setting.length,
      data: setting,
    });
  } catch (error) {
    console.error("Failed to get setting:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// PUT /api/setting/:id
// Update setting
// ========================================

export const updatesetting = async (req, res) => {
  try {
    const setting = await setting.findById(req.params.id);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "setting not found",
      });
    }

    const {
    language,
    theme,
    audioQuality,
    autoplay,
    notifications
    } = req.body;

    setting.language = language?? setting.language;
    setting.theme = theme ?? setting.theme;
    setting.audioQuality = audioQuality ?? setting.audioQuality;
    setting.autoplay = autoplay ?? setting.autoplay;
    setting.notifications = notifications ?? setting.notifications;

    await setting.save();

    res.status(200).json({
      success: true,
      message: "setting updated successfully",
      data: setting,
    });
  } catch (error) {
    console.error("Failed to update setting:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

