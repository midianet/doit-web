FROM node:18-alpine

USER root

ENV NODE_ENV production

COPY package.json ./

RUN apk --no-cache add ca-certificates tzdata \
    && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
    && echo "America/Sao_Paulo" > /etc/timezone \
    && npm install --production

COPY . ./

COPY .cert/root.cer /etc/ssl/certs/cnp_root.cer
COPY .cert/sub.cer /etc/ssl/certs/cnp_sub.cer

RUN npm run build \
    && update-ca-certificates \

ENV LANG pt_BR.UTF8
ENV NODE_OPTIONS --use-openssl-ca
ENV PORT 5173

EXPOSE 5173

CMD ["npm","start"]