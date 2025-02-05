
# cenos 安装 docker


### 正文
1. 清理旧版本
```shell
# 查看安装过的docker
yum list installed | grep docker
# 旧版名称是docker , 最新社区版 docker-engine， 目前已改名为docker-ce 
yum remove docker  docker-common docker-selinux docker-engine
```
2. 安装需要的软件包， yum-util 提供yum-config-manager功能，另两个是devicemapper驱动依赖。
```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
```
3. 设置一个yum源
```shell
# （阿里仓库）
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
#### Docker 安装
4. 安装docker
```shell
# 查看版本
yum list docker-ce --showduplicates | sort -r
# 安装
yum install docker-ce docker-ce-cli containerd.io
```
5. 启动并加入开机启动
```shell
systemctl start docker     # 启动  
systemctl restart docker   # 重启
systemctl enable docker    # 开机启动
```
6. 验证
```shell
# --rm 在命令运行完毕后，自动删除容器。
docker run --rm hello-world 
```
#### Docker Compose 安装
7. 安装 docker compose
``` shell
# 下载文件
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
# 移动文件到usr/local/bin 目录
cd  /usr/local/bin/docker-compose
# 添加可执行权限
chmod +x /usr/local/bin/docker-compose
# 验证
docker-compose --version
```
### 常用命令

Docker 常用命令
```shell
# 搜索镜像
docker search tutorial
# 查看所有容器，包括未运行
docker ps -a
# 通过镜像简单创建并启动容器(还有很多命令参数，可以搜索学习一下)
docker run --name 自定义容器名称 镜像名称:镜像版本 
# 启动已停止的容器
docker start 容器id或name
# 停止容器
docker stop 容器id或name
# 重启容器
docker restart 容器id或name
# 强制停止容器
docker kill 容器id
# 查看容器的所有信息
docker inspect 容器id
# 查看容器日志
docker container logs 容器id
# 查看容器里的进程
docker top 容器id
# 删除已停止的容器
docker rm 容器id或name
# 删除正在运行的容器
docker rm -f 容器id
# 删除镜像  24/08/10
docker rmi 镜像名或镜像id
# 进入容器
docker exec -it 容器id /bin/bash
# 进入容器后退出容器(容器内执行)
exit
```
#### Docker Compose 常用命令
> linux 下尝试执行格式为：docker compose
> windows 下尝试执行格式为：docker-compose
```shell
# 下载镜像、生成容器与启动容器。
docker-compose -f docker-compose.yml up
# 下载镜像、生成容器与后台启动容器（守护模式）。
docker-compose up -d
# 涉及到 Dockerfile 的修改 24/06/22
docker-compose up  --build -d
# 停止容器
docker-compose down
# 停止并删除容器、网络、卷以及构建的镜像
docker-compose down --volumes --rmi all
# 使用最新镜像
docker-compose pull && docker-compose -f docker-compose.yaml up -d
```

### 镜像加速

[阿里加速地址](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)
针对Docker客户端版本大于 1.10.0 的用户

您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
```shell 
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://mirror.aliyuncs.com", 
        "https://mirror.ccs.tencentyun.com", 
        "https://mirror.baidubce.com", 
        "https://docker.mirrors.ustc.edu.cn", 
        "https://docker.nju.edu.cn", 
        "https://docker.m.daocloud.io"
    ]
 }

sudo systemctl daemon-reload
sudo systemctl restart docker
```


Docker 官方和国内很多云服务商都提供了国内加速器服务，例如：

- 科大镜像：https://docker.mirrors.ustc.edu.cn
- 网易：https://hub-mirror.c.163.com
- 阿里云：https://<你的ID>.mirror.aliyuncs.com
- 七牛云加速器：https://reg-mirror.qiniu.com

