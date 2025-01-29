# syntax=docker/dockerfile:1

FROM oven/bun:1-alpine
WORKDIR /foodie-master
COPY . /foodie-master
RUN ["bun", "install"]
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "dev" ]
