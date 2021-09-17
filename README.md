# node-grpc-web-example

Based on: [gRPC-Web Hello World Guide](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld)

## Requirements

- protoc
- protoc-gen-grpc-web

## Install

```sh
$ npm install
```

---

## Build

### Generate JS proto files

```sh
$ protoc -I=. video.proto \
  --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```

### Build client

```sh
$ npx webpack client.js
```

---

## Run

### Start service (:9090)

```sh
$ node server.js
```

### Start proxy (:8080)

```sh
$ docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    --network=host envoyproxy/envoy:v1.17.0
```

> NOTE: As per [this issue](https://github.com/grpc/grpc-web/issues/436):
> if you are running Docker on Mac/Windows, remove the `--network=host` option:
>
> ```sh
> $ docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
>     -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.17.0
> ```

### Host static files (:8081)

```sh
$ python3 -m http.server 8081
```

---

## View

http://localhost:8081/

```
Chunk 1 0...242

Chunk 2 255...71

Chunk 3 66...169

Chunk 4 124...182

Chunk 5 198...244
...
```
