# cf-worker-verified-email-router
send email to Verified Destination Address

## 快速开始

```bash
npm install
npm run dev
```

## 配置

在 Cloudflare Worker 的 **Settings > Variables and Secrets** 中配置：

- `TOKEN`：用于调用此 Worker 的随机密钥；将其设为 **Secret**。

Worker 仅接受带有 `Authorization: Bearer <TOKEN>` 的 `POST` 请求，并通过 `EMAIL` 发送绑定发信。

同时，Worker 实现了 `email()` 处理器并声明 `EMAIL_HANDLER` 路由绑定。部署后可在 **Compute > Email Service > Email Routing > Routing Rules** 创建规则，选择 **Send to a Worker**，然后在 Worker 下拉框中选择此 Worker；收到的邮件会转发至 `EMAIL_TO`。


## 调用示例

```bash
curl -X POST 'https://<worker>.workers.dev' \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"to":"xxxx@qq.com","from":"alert@12345.xyz","subject":"服务异常警通知","html":"<h2>SaaS服务异常, 请检查: Sentry</h2>","text":"SaaS服务异常, 请检查: Sentry"}'
```

