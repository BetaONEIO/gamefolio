const AWS = require("aws-sdk");
const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
var ffprobe = require("ffprobe-static");
ffmpeg.setFfprobePath(ffprobe.path);
const { v4: uuidv4 } = require("uuid");
const {
  AWS_BUCKET_NAME: bucketName,
  AWS_BUCKET_REGION: region,
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey,
  AWS_S3: S3URL,
  AWS_CDN: CDNURL,
} = process.env;

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

const uploadVideo = async (req, res) => {
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }

  var file = req.file;
  const musicName = req.body.music || "none";
 
 

  const s3VideoFileUpload = (file) => {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`; // Generating a unique filename
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: fileStream,
    };

    const s3Upload = s3.upload(params);

    s3Upload.on("httpUploadProgress", function (progress) {
      const percentCompleted = Math.round(
        (progress.loaded / progress.total) * 100
      );
 
      // You can emit this progress to clients using WebSocket or other mean
    });

    s3Upload.send(function (err, data) {
      if (err) {
        throw err;
      }
      const cdnDataLocation = data.Location.replace(S3URL, CDNURL);
 
      return res.status(201).json({
        message: "File uploaded successfully",
        videoURL: cdnDataLocation,
      });
    });
  };

  const addAudioToVideo = (videoPath, audioPath, outputPath, videoDuration) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .audioCodec("aac")
      .duration(videoDuration) // Set the duration dynamically
      .output(outputPath)
      .on("end", () => {
 
        s3VideoFileUpload({
          path: outputPath,
          originalname: file.originalname,
        });
      })
      .on("error", (err) => {
        console.error("Error adding audio to video:", err);
        return res.status(500).json({ message: "Error adding audio to video" });
      })
      .run();
  };

  const videoFile = req.file;
  const videoPath = videoFile.path;

  // Use ffprobe to get the duration of the video
  ffmpeg.ffprobe(videoPath, (err, videoInfo) => {
    if (err) {
      console.error("Error getting video duration:", err);
      return res.status(500).json({ message: "Error processing video" });
    }

    const videoDuration = videoInfo.format.duration;

    // Now you can use videoDuration in your code as needed

    // For example, you can pass it to the addAudioToVideo function
    const customAudioPath = `audio/${musicName}.mp3`; // dynamic
    const outputVideoPath = `output/${videoFile.originalname}`;
    if (musicName !== "none") {
      addAudioToVideo(
        videoPath,
        customAudioPath,
        outputVideoPath,
        videoDuration
      );
    } else {
      s3VideoFileUpload(file);
    }
  });
};

const uploadImage = async (req, res) => {
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the image" });
  }

  const file = req.file;
  const imageName = req.body.imageName; // Assuming a field 'imageName' in the request body
 

  const s3ImageFileUpload = (file) => {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`; // Generating a unique filename
    const fileStream = fs.createReadStream(file.path);

 

    const params = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const s3Upload = s3.upload(params);

    s3Upload.on("httpUploadProgress", function (progress) {
      const percentCompleted = Math.round(
        (progress.loaded / progress.total) * 100
      );
 
      // You can emit this progress to clients using WebSocket or other means
    });

    s3Upload.send(function (err, data) {
      if (err) {
        throw err;
      }
      const cdnDataLocation = data.Location.replace(S3URL, CDNURL);
 
      return res.status(201).json({
        message: "File uploaded successfully",
        imageURL: cdnDataLocation,
      });
    });
  };

  s3ImageFileUpload(file);
};

module.exports = {
  uploadVideo,
  uploadImage,
};
