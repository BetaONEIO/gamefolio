const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const clipsRoutes = require("./routes/clipsRoutes");
const musicRoutes = require("./routes/musicRoutes");
const { myDbConnection } = require("./db/connection");
const generateToken = require("./utils/generateToken");
const authMiddleware = require("./middleware/authMiddleware");
const AWS = require("aws-sdk");
const fs = require("fs");
const multer = require("multer");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
var ffprobe = require("ffprobe-static");
ffmpeg.setFfprobePath(ffprobe.path);
const upload = multer({ dest: "uploads/" });

const app = express();
const port = 4000;
require("./Authentication/googleAuth");
require("./Authentication/facebookAuth");
require("./Authentication/twitterAuth");

myDbConnection();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Initialize express-session before passport.initialize

app.use(cookieParser("Rk8%&7wP3z$Q2tY!a@S#vG5bU9rK6mN"));
app.use(
  session({
    secret: "Rk8%&7wP3z$Q2tY!a@S#vG5bU9rK6mN", // Replace with a strong and secure secret
    cookie: {
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ...

// Now, set up your Google authentication routes and other middleware as needed.

// Google auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/store-token",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/main", (req, res) => {
  res.send("Successfully authenticated");
});

//facebook authentication
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["user_friends", "manage_pages"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/store-token",
    failureRedirect: "/auth/facebook/failure",
  })
);

app.get("/main", (req, res) => {
  res.send("Successfully authenticated");
});

//twitter authentication
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/api/store-token",
    failureRedirect: "/auth/twitter/failure",
  })
);

// Store the Twitter access token in a secure location (e.g., session)
app.get("/api/store-token", (req, res) => {
  const accessToken = generateToken(req.user._id);
  req.session.token = accessToken;
  res.cookie("gfoliotoken", accessToken, { maxAge: 900000, httpOnly: false });
  res.redirect("http://localhost:3000/main");
});

app.get("/main", (req, res) => {
  res.send("Successfully authenticated");
});

// User API
app.use("/api/user", userRoutes);

// Post API
app.use("/api/post", postRoutes);

// Clips API
app.use("/api/clip", clipsRoutes);

// Music API
app.use("/api/music", musicRoutes);

app.get("/api/user/protected", authMiddleware, (req, res) => {
  // Access protected resource
  res.json({ message: "Success" });
});

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

app.post("/uploadfile", upload.single("file"), (req, res) => {
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }

  var file = req.file;
  const musicName = req.body.music;
  console.log(musicName);

  const uploadVideo = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: fileStream,
    };

    const s3Upload = s3.upload(params);

    s3Upload.on("httpUploadProgress", function (progress) {
      const percentCompleted = Math.round(
        (progress.loaded / progress.total) * 100
      );
      console.log(`Upload Progress : ${percentCompleted}%`);
      // You can emit this progress to clients using WebSocket or other means
    });

    s3Upload.send(function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      return res.status(201).json({
        message: "File uploaded successfully",
        videoURL: data.Location,
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
        console.log("Audio added to video successfully.");
        uploadVideo({ path: outputPath, originalname: file.originalname });
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

    addAudioToVideo(videoPath, customAudioPath, outputVideoPath, videoDuration);
  });
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
