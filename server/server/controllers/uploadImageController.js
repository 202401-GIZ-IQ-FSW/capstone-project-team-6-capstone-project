const uploadImage = async (req, res) => {
    try {
        if (req?.files?.length) {
            console.log(req.files);
            let uploadedFiles = req?.files?.map((image) => {
                return { img: image.filename };
            });
            res.status(200).json({
                success: true,
                message: "Image Uploaded successfully",
                data: uploadedFiles,
            });
        } else {
            console.log("Something is missing.");
            res.status(400).json({ success: false, error: "Image Upload Failed. Send Image Again." });
        }
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ success: false, error: "Server Error. Image Upload Failed" });
    }
};

module.exports = {
    uploadImage
};
