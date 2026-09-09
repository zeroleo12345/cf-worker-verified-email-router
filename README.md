# cf-worker-verified-email-router
send email to Verified Destination Address

## 快速开始

```bash
npm install
npm run dev
```

## 配置

在 Cloudflare Worker 的 **Settings > Variables and Secrets** 中配置：

- `EMAIL_FROM`：已接入 Cloudflare Email Service 的发件地址，例如 `alert@example.com`。
- `EMAIL_TO`：Cloudflare Email Routing 中已验证的 Destination Address。
- `SEND_TOKEN`：用于调用此 Worker 的随机密钥；将其设为 **Secret**。

Worker 仅接受带有 `Authorization: Bearer <SEND_TOKEN>` 的 `POST` 请求，并通过 `EMAIL` 发送绑定发信。


## 调用示例

```bash
curl -X POST 'https://<worker>.workers.dev' \
  -H 'Authorization: Bearer <SEND_TOKEN>'
```
