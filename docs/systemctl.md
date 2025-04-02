# linux 安装systemctl


## 安装 systemd

如果您的 Linux 服务器上尚未安装 systemd，可以使用包管理器如 yum（适用于 CentOS/RHEL）或 apt（适用于 Debian/Ubuntu）来安装它：

```bash
# 使用 yum 安装 systemd（CentOS/RHEL）
yum install systemd

# 使用 apt 安装 systemd（Debian/Ubuntu）
apt install systemd
```

## 创建 frps.service 文件

使用文本编辑器 (如 vim) 在 /etc/systemd/system 目录下创建一个 frps.service 文件，用于配置 frps 服务。
```bash
$ sudo vim /etc/systemd/system/frps.service
```
写入内容
```bash
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /path/to/frps -c /path/to/frps.toml

[Install]
WantedBy = multi-user.target
```
## 使用 systemd 命令管理 frps 服务
```bash
# 启动frp
sudo systemctl start frps
# 停止frp
sudo systemctl stop frps
# 重启frp
sudo systemctl restart frps
# 查看frp状态
sudo systemctl status frps
```
##设置 frps 开机自启动
```bash
sudo systemctl enable frps
```