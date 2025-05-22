# Build stage
FROM grafana/xk6:0.20 AS builder
WORKDIR /tmp/k6
RUN xk6 build --with github.com/grafana/xk6-output-influxdb

# Run stage
FROM alpine:3.21 AS runner
ENV K6_OUT=xk6-influxdb=http://pt_playground_influxdb:8086
ENV K6_INFLUXDB_ORGANIZATION=k6io
ENV K6_INFLUXDB_BUCKET=k6
ENV K6_INFLUXDB_INSECURE=true
ENV K6_INFLUXDB_TOKEN=EEKpryGZk8pVDXmIuy484BKUxM5jOEDv7YNoeNZUbsNbpbPbP6kK_qY9Zsyw7zNnlZ7pHG16FYzNaqwLMBUz8g==
ENV BASE_URL=http://pt_playground_httpbin:80

WORKDIR /app

RUN \
  apk add --no-cache ca-certificates bash curl \
  && addgroup -g 1000 nonroot \
  && adduser -u 1000 -G nonroot -S nonroot

COPY --from=builder /tmp/k6 /usr/bin/k6
COPY ./resources /app/resources
COPY ./scripts /app/scripts

USER nonroot
ENV PATH="/usr/bin/k6:$PATH"
