
[toc]

# docker-compose 安装nacos

## 1. 在宿主机创建env 

```shell
mkdir -p ./docker/nacos/env
```
## 3. nacos.env 编写

```shell
# 支持IP还是域名模式，对应nacos.inetutils.prefer-hostname-over-ip
PREFER_HOST_MODE=hostname
# 系统启动方式: 集群/单机，对应nacos.standalone
MODE=standalone
# 单机模式下支持MYSQL数据库，对应spring.sql.init.platform
SPRING_DATASOURCE_PLATFORM=mysql
# 数据库 连接地址
MYSQL_SERVICE_HOST=mysql
# 数据库库名	
MYSQL_SERVICE_DB_NAME=nacos
# 数据库端口	
MYSQL_SERVICE_PORT=3306
# 数据库用户名	
MYSQL_SERVICE_USER=nacos
# 数据库用户密码	
MYSQL_SERVICE_PASSWORD=nacos***
# 数据库连接参数	
MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
# nacos.core.auth.server.identity.key	
# Nacos Server节点身份信息的key，用户Server节点之间通信的识别，当开启鉴权时为必填项
NACOS_AUTH_IDENTITY_KEY=okra
# nacos.core.auth.server.identity.value	
# Nacos Server节点身份信息的value，用户Server节点之间通信的识别，当开启鉴权时为必填项
NACOS_AUTH_IDENTITY_VALUE=okra0987654321
# token
NACOS_AUTH_TOKEN=okra098765432109876543210987654321098765432109876543210987654321
```

## 2. docker-compose.yml 编写

```yml
services:
  nacos:
    image: nacos/nacos-server:v2.5.0
    container_name: nacos
    env_file:
      - /root/docker/nacos/env/nacos.env
    volumes:
      - /root/docker/nacos/logs/:/home/nacos/logs
    ports:
      - "8848:8848"
      - "9848:9848"
    restart: always
```

## 执行命令

```shell
docker-compose up -d
```


