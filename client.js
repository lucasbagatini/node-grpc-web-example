const { HelloRequest } = require("./video_pb.js");
const { VideoServiceClient } = require("./video_grpc_web_pb.js");

const client = new VideoServiceClient(
  "http://" + window.location.hostname + ":8080",
  null,
  null
);

// ToDo: Void does not work \o\
const request = new HelloRequest();
request.setName("");

let chunks = 1;

const stream = client.getVideoContent(request, {});
stream.on("data", response => {
  const arr = response.array[0];
  const main = document.querySelector("#main");
  const firstPart = arr[0];
  const lastPart = arr[arr.length - 1];
  const str = `Chunk ${chunks} ${firstPart}...${lastPart}`;
  const p = document.createElement("p");
  p.innerHTML = str;
  main.append(p);
  chunks += 1;
});

stream.on("error", err => {
  console.log(
    `Unexpected stream error: code = ${err.code}` +
      `, message = "${err.message}"`
  );
});
