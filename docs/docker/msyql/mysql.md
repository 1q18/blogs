
[toc]


# docker-compose 安装mysql

## mysql 配置文件

1. 在宿主机创建conf,data,logs 

```shell
mkdir -p ./docker/mysql/{conf,data,logs}
```

2. 在conf下创建my.cnf

```shell
[mysqld]
# 基础设置
user                    = mysql
default-storage-engine  = InnoDB
character-set-server    = utf8mb4
collation-server        = utf8mb4_unicode_ci

# 连接设置
max_connections         = 200
table_open_cache        = 2000
thread_cache_size       = 100
wait_timeout            = 300
interactive_timeout     = 300

# 安全设置
skip-name-resolve       = 1
local-infile            = 0
symbolic-links          = 0
skip-show-database      = ON
ssl                     = ON
# 需要将证书挂载到容器中
# ssl-ca                = /etc/mysql/ssl/ca.pem
# ssl-cert              = /etc/mysql/ssl/server-cert.pem
# ssl-key               = /etc/mysql/ssl/server-key.pem

# 日志设置
log-error               = /var/log/mysql/error.log
slow_query_log          = 1
slow_query_log_file     = /var/log/mysql/slow.log
long_query_time         = 2
log_queries_not_using_indexes = 1

# InnoDB 设置
innodb_buffer_pool_size = 1G  # 根据内存调整（建议50-70%总内存）
innodb_log_file_size    = 256M
innodb_log_buffer_size  = 16M
innodb_flush_log_at_trx_commit = 1
innodb_file_per_table   = 1
innodb_buffer_pool_instances = 2

# 二进制日志（主从复制需要）
server-id               = 1
log-bin                 = /var/lib/mysql/mysql-bin
binlog_format           = row
expire_logs_days        = 7
sync_binlog             = 1

# 其他优化
tmp_table_size          = 64M
max_heap_table_size     = 64M
key_buffer_size         = 16M
max_allowed_packet      = 256M

[client]
default-character-set   = utf8mb4
```

## 创建docker-compose.yml

docker-compose.yml内容如下：

```yml
services:
  mysql:
    image: mysql:8.0.34  # 指定稳定版本
    container_name: mysql8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: you_password  # 设置强密码
      MYSQL_DATABASE: app_db
      MYSQL_USER: app_use
      MYSQL_PASSWORD: app_use_password
    ports:
      - "3306:3306"
    volumes:
      - /root/docker/mysql/data:/var/lib/mysql
      - /root/docker/mysql/conf:/etc/mysql/conf.d
      - /root/docker/mysql/logs:/var/log/mysql
    networks:
      mysql-bridge-network: 
        ipv4_address: 192.168.3.10  # 设置固定IP
    security_opt:
      - no-new-privileges:true

volumes:
  mysql_data:

networks:
  mysql-bridge-network:
    driver: bridge
    ipam:
      config:
        - subnet: "192.168.3.0/24"  # 设置桥接网络
          gateway: "192.168.3.1"   
```

## 常用mysql命令

```sql
use mysql;

-- 创建数据库
create database okra_cloud;

-- 创建用户
create user 'okra'@'%' identified by 'okra_password';

-- 授权 
grant select,insert,update,delete on okra_cloud.* to 'okra'@'%';
grant create,alter,drop on okra_cloud.* to 'okra'@'%';

-- 刷新
flush privileges;

```


