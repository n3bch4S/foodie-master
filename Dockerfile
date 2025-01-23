# syntax=docker/dockerfile:1

FROM oven/bun:1.1-alpine
WORKDIR /foodie-master-ui
COPY . /foodie-master-ui
RUN ["bun", "install"]
EXPOSE 3000
ENTRYPOINT ["bun", "dev"]
