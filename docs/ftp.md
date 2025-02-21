

frps.toml 配置
```shell
bindAddr = "0.0.0.0"
bindPort = 37000
auth.method = "token"
auth.token = "admin"

webServer.addr = "0.0.0.0"
webServer.port = 37500
webServer.user = "admin"
webServer.password = "admin"
```

frpc.toml 配置

```shell
serverAddr = "8.153.107.114"
serverPort = 37000
auth.method = "token"
auth.token = "admin"

[[proxies]]
name = "nacos"
type = "http"
localIP = "127.0.0.1"
localPort = 8848
customDomains = ["nacos.1q18.com"]
```

