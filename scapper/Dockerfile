FROM alpine:latest
MAINTAINER neo [at] orz [at] hk

ENV RUNTIME python py-lxml py-requests

RUN mkdir -p /workplace

WORKDIR /workplace

RUN apk add --no-cache $RUNTIME

COPY scapper.py .

RUN chmod a+x scapper.py