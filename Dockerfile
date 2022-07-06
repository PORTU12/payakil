###########
# BUILDER #
###########

# pull official base image
FROM node:16.14-alpine3.14 AS builder

LABEL maintainer="info@akiltechnologies.com"

# set work directory
WORKDIR /usr/src/app

# install dependencies
COPY . /usr/src/app

RUN npm install && npm cache clean --force

RUN npm run build

#########
# FINAL #
#########

FROM node:16.14-alpine3.14

WORKDIR /app

COPY --from=builder /usr/src/app/node_modules /app/node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/tsconfig.*.json ./
COPY --from=builder /usr/src/app/dist /app/dist

# create the app user and chown all the files to the app user
RUN addgroup -S akilpayapi && adduser -S -G akilpayapi akilpayapi && \
    chown -R akilpayapi:akilpayapi /app

# change to the app user
USER akilpayapi

EXPOSE 3003

CMD ["npm", "run", "migrate-start-prod"]