const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const fs = require("fs");

const PROTO_PATH = path.resolve(__dirname, "./video.proto");
const VideoDefinition = grpc.loadPackageDefinition(
  protoLoader.loadSync(PROTO_PATH)
);

function getVideoContent(call) {
  const path = "./video.mp4";
  const videoDataStream = fs.createReadStream(path);

  videoDataStream.on("data", chunk => {
    console.log(chunk);
    call.write({ contentStream: chunk });
  });

  videoDataStream.on("end", () => {
    call.end();
  });
}

const server = new grpc.Server();

server.addService(VideoDefinition.videostream.VideoService.service, {
  GetVideoContent: getVideoContent,
});

server.bindAsync(
  "0.0.0.0:9090",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://0.0.0.0:9090");
    server.start();
  }
);
