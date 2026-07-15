



### ADB操作板子（推荐）
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774512163618-50c86f80-5cf5-43b1-b1a8-d7ca7c0a5394.png)

### NFS网络文件系统
板子中挂载主机上的文件

```plain
mount -t nfs -o nolock,ver=3 IP地址:/路径 /mnt
```

这样就可以通过访问/mnt来访问主机上的文件了



### GCC选项
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774248615482-bd9277a3-f517-4d0b-97ba-4698a3a8122c.png)



### Makefile
#### <font style="color:rgb(43, 45, 49);">规则结构</font>
<font style="color:rgb(43, 45, 49);">Makefile 的本质是一系列规则：</font>

**<font style="color:rgb(108, 113, 122);">code</font>****<font style="color:rgb(28, 27, 27);">Makefile</font>**

```plain
目标(Target): 依赖(Dependencies)
	命令(Command)  # 前面必须是 Tab 键
```

+ **<font style="color:rgb(43, 45, 49);">使用方式</font>**<font style="color:rgb(43, 45, 49);">：执行</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">make [目标名]</font><font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">默认行为</font>**<font style="color:rgb(43, 45, 49);">：若不加目标名，</font><font style="color:rgb(43, 45, 49);">make</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">自动执行第一个出现的“目标”。</font>

#### <font style="color:rgb(43, 45, 49);">自动化变量（符号全家桶）</font>
<font style="color:rgb(43, 45, 49);">这些变量极大简化了重复书写：</font><font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">| 符号 | 含义 | 记忆技巧 |</font><font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">| :--- | :--- | :--- |</font><font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">$@</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">目标文件</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">| “at”目标地址 |</font><font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">$^</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">所有依赖文件</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">| 这一堆（上箭头指向上方一排依赖） |</font><font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">$<</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">第一个依赖文件</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">| 指向左边第一个依赖 |</font><font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">$?</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">|</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">所有更新过的依赖</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">| 谁变了？（Question） |</font>

#### <font style="color:rgb(43, 45, 49);">变量赋值的四种方式</font>
| **<font style="color:rgb(43, 45, 49);">方式</font>** | **<font style="color:rgb(43, 45, 49);">名称</font>** | **<font style="color:rgb(43, 45, 49);">行为说明</font>** |
| --- | --- | --- |
| **<font style="color:rgb(43, 45, 49);">=</font>** | <font style="color:rgb(43, 45, 49);">延迟赋值</font> | <font style="color:rgb(43, 45, 49);">在最终使用时才展开值（可能引用后面定义的变量）。</font> |
| **<font style="color:rgb(43, 45, 49);">:=</font>** | **<font style="color:rgb(43, 45, 49);">立即赋值</font>** | **<font style="color:rgb(43, 45, 49);">（推荐）</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">定义即固定，防止循环引用或意外改动。</font> |
| **<font style="color:rgb(43, 45, 49);">?=</font>** | <font style="color:rgb(43, 45, 49);">条件赋值</font> | <font style="color:rgb(43, 45, 49);">若变量未定义则赋值，已定义则忽略（常用于设置默认值）。</font> |
| **<font style="color:rgb(43, 45, 49);">+=</font>** | <font style="color:rgb(43, 45, 49);">追加赋值</font> | <font style="color:rgb(43, 45, 49);">在原有的值后面空格连接新内容。</font> |


---

#### <font style="color:rgb(43, 45, 49);">假想目标（伪目标） .PHONY</font>
<font style="color:rgb(43, 45, 49);">为了防止目录下有同名文件导致命令失效（如有一个叫</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">clean</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">的文件）：</font>

**<font style="color:rgb(108, 113, 122);"></font>****<font style="color:rgb(28, 27, 27);">Makefile</font>**

```plain
.PHONY: clean
clean:
	rm -f *.o test
```

#### <font style="color:rgb(43, 45, 49);">通配符与匹配</font>
+ **<font style="color:rgb(43, 45, 49);">%</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">(模式匹配)</font>**<font style="color:rgb(43, 45, 49);">：用于规则中。</font>
    - <font style="color:rgb(43, 45, 49);">例：</font><font style="color:rgb(43, 45, 49);">%.o: %.c</font><font style="color:rgb(43, 45, 49);">（将所有</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">.c</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">对应编译成</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">.o</font><font style="color:rgb(43, 45, 49);">）。</font>
+ **<font style="color:rgb(43, 45, 49);">*</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">(文件名通配)</font>**<font style="color:rgb(43, 45, 49);">：用于命令中。</font>
    - <font style="color:rgb(43, 45, 49);">例：</font><font style="color:rgb(43, 45, 49);">rm *.o</font><font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">$(wildcard 模式)</font>**<font style="color:rgb(43, 45, 49);">：函数，获取匹配的文件列表。</font>
    - <font style="color:rgb(43, 45, 49);">例：</font><font style="color:rgb(43, 45, 49);">SRCS = $(wildcard *.c)</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">获取当前目录下所有</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">.c</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">文件。</font>

#### <font style="color:rgb(43, 45, 49);">执行控制符</font>
+ **<font style="color:rgb(43, 45, 49);">@</font>**<font style="color:rgb(43, 45, 49);">：静默执行。不显示命令本身，只显示输出结果。</font>
    - <font style="color:rgb(43, 45, 49);">@echo "Building..."</font>
+ **<font style="color:rgb(43, 45, 49);">-</font>**<font style="color:rgb(43, 45, 49);">：忽略错误。即使该行命令失败，也继续执行后续步骤。</font>
    - <font style="color:rgb(43, 45, 49);">-rm -f *.o</font>

### 文件IO
<font style="color:rgb(43, 45, 49);">标准 IO 的内部，会分配一个用户空间的 buffer，读写操作先经过这个 buffer。在有必要时，才会调用底下的系统调用 IO 向内核发起操作。 </font>

<font style="color:rgb(43, 45, 49);">所以：标准 IO 效率更高；但是要访问驱动程序时就不能使用标准 IO，而是使用系统调用 IO。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774595519016-21d548b2-ecae-4065-a075-c4a5a4969939.png)



### 字符编码
<font style="color:rgb(43, 45, 49);">对于不同国家，它们默认的 ANSI 编码各不相同，所以同一个 TXT 文件在不同国家就很有可能出现乱码</font>

<font style="color:rgb(43, 45, 49);">UNICODE 编码就是解决这类问题：对于地球上任意一个字符，都给它一个唯 一的数值。（向下兼容ASCII码）</font>

<font style="color:rgb(43, 45, 49);"></font>

<font style="color:rgb(43, 45, 49);"></font>

### <font style="color:rgb(43, 45, 49);">设备输入系统</font>
各种各样的硬件设备挂载在设备节点，如/dev/input/event0供用户访问

输入设备表示：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774770376727-336b9049-41f2-4aeb-8c39-5c5058024821.png)



输入事件：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774770398573-26c8f344-003c-45cb-86d8-ac269350deaa.png)type哪类事件，code哪个事件，value事件值

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774770449158-69f71997-bfda-4e95-ba79-9a8a29c2125d.png)

<font style="color:rgb(43, 45, 49);">访问硬件输入方式：</font>

1. 查询（非阻塞式的轮询）：APP 调用 open 函数时，传入“O_NONBLOCK”表示“非阻塞”。没数据时直接返回错误
2. 休眠-唤醒方式：APP 调用 open 函数时，不要传入“O_NONBLOCK”。没数据时，APP会在内核休眠
3. POLL/SELECT方式：设置超时时间，且可一次性等待多个事件和设备。用法：

```plain
while (1)
	{
		fds[0].fd = fd;
		fds[0].events  = POLLIN;
		fds[0].revents = 0;
		ret = poll(fds, nfds, 5000);    //fds结构体数组表示poll监控的fd，nfds表示fd数量，timeout=5000ms表示超时时间
		if (ret > 0)  //ret 返回的是出现事件的fd数量
		{
			if (fds[0].revents == POLLIN)
			{
				while (read(fd, &event, sizeof(event)) == sizeof(event))
				{
					printf("get event: type = 0x%x, code = 0x%x, value = 0x%x\n", event.type, event.code, event.value);
				}
			}
		}
		else if (ret == 0)
		{
			printf("time out\n");
		}
		else
		{
			printf("poll err\n");
		}
	}
```

4. 异步通知方式：APP干自己的事，让驱动自己发通知，APP接受通知处理。需要做以下配置：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774770800546-7538fc05-adaf-489a-91dd-8aa8c67a19ae.png) 



### 网络编程
#### TCP
服务器端：

1. **创建socket：**

```c
int listenfd = socket(AF_INET, SOCK_STREAM, 0);
```

| 参数 | 含义 | 常见值 |
| --- | --- | --- |
| AF_INET | 地址族 | IPv4 |
| SOCK_STREAM | 类型 | TCP |
| protocol | 协议 | 0（自动） |


2. **绑定自身端口和所要监听的客户端IP :**

```c
struct sockaddr_in addr = {0};
addr.sin_family = AF_INET;
addr.sin_port = htons(8888);
addr.sin_addr.s_addr = htonl(INADDR_ANY);

bind(listenfd, (struct sockaddr *)&addr, sizeof(addr));
```

| 字段 | 含义 |
| --- | --- |
| sin_family | 必须 AF_INET |
| sin_port | 端口（必须 htons） |
| sin_addr | IP（INADDR_ANY 表示监听所有网卡） |


3. **开始监听**

```c
listen(listenfd, 10);
```

| 参数 | 含义 |
| --- | --- |
| 10 | 最大排队连接数 |


4. **接受连接**

```c
int connfd;
struct sockaddr_in client_addr;
socklen_t len = sizeof(client_addr);

connfd = accept(listenfd, (struct sockaddr *)&client_addr, &len);
```

| socket | 用途 |
| --- | --- |
| listenfd | 只负责监听 |
| connfd | 负责通信 **connfd = 和某个客户端建立连接后的“专用通信通道”** |


5. **通信**

接收：

```c
recv(connfd, buf, sizeof(buf), 0);
```

发送：

```c
send(connfd, buf, len, 0);
```

| 参数 | 含义 |
| --- | --- |
| connfd | 客户端 socket |
| buf | 缓冲区 |
| len | 长度 |
| flags | 一般为 0 |


6. **关闭连接**

```c
close(connfd);
close(listenfd);
```



客户端：

1. 创建socket

```c
int sockfd = socket(AF_INET, SOCK_STREAM, 0);
```

2. 连接对应的服务器ip和端口

```c
struct sockaddr_in server_addr = {0};
server_addr.sin_family = AF_INET;
server_addr.sin_port = htons(8888);
inet_aton("127.0.0.1", &server_addr.sin_addr);

connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr));
```

3. 通信

```c
send(sockfd, buf, len, 0);
recv(sockfd, buf, sizeof(buf), 0);
```

4. 关闭

```c
close(sockfd);
```



#### UDP
服务器端：

1. 创建socket

```c
int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
```

`SOCK_DGRAM` = UDP  

2. 绑定端口和IP

```c
struct sockaddr_in addr = {0};

addr.sin_family = AF_INET;
addr.sin_port = htons(8888);
addr.sin_addr.s_addr = htonl(INADDR_ANY);

bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
```

3. 收发数据

```c
struct sockaddr_in client_addr;
socklen_t len = sizeof(client_addr);

recvfrom(sockfd, buf, sizeof(buf), 0,
         (struct sockaddr *)&client_addr, &len);

sendto(sockfd, buf, strlen(buf), 0,
       (struct sockaddr *)&client_addr, len);
```

| 参数 | 含义 |
| --- | --- |
| sockfd | socket |
| buf | 接收缓冲区 |
| len | 最大长度 |
| flags | 一般 0 |
| client_addr | 输出：谁发来的 |
| len | 地址长度 |


 

客户端：

1. 创建socket

```c
int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
```

2. 准备服务器地址和端口

```c
struct sockaddr_in server_addr = {0};

server_addr.sin_family = AF_INET;
server_addr.sin_port = htons(8888);
inet_aton("127.0.0.1", &server_addr.sin_addr);
```

3. 收发数据

```c
sendto(sockfd, buf, strlen(buf), 0,
       (struct sockaddr *)&server_addr, sizeof(server_addr));

recvfrom(sockfd, buf, sizeof(buf), 0, NULL, NULL);
```



### 多线程编程
```c
//线程执行的任务
void* my_task(void* arg) {
    int val = *(int*)arg;
    printf("线程运行中，参数: %d\n", val);
    pthread_exit((void*)100); // 退出并返回 100
}

// 主线程中
pthread_t tid;
int arg = 1;
pthread_create(&tid, NULL, my_task, &arg);
```

```c
//初始化
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;


//互斥使用资源
//消费者：
pthread_mutex_lock(&mutex);
pthread_cond_wait(&cond, &mutex);
//使用某个资源
pthread_mutex_unlock(&mutex);

//生产者：
pthread_mutex_lock(&mutex);
//生产某资源
pthread_cond_signal(&cond);
pthread_mutex_unlock(&mutex);

```



```c
static sem_t g_sem;

//等待信号量（消费者）
sem_wait(&g_sem);

//发送信号量（生产者）
sem_post(&g_sem);
```



```c
1. 进程结束，自动退出

2. 线程主动退出
void pthread_exit(void *retval);
pthread_exit 函数为线程退出函数，在退出时候可以传递一个 void*类
型的数据带给主线程，若选择不传出数据，可将参数填充为 NULL。

3. 线程被动退出
int pthread_cancel(pthread_t thread);
成功：返回 0 该函数传入一个 tid 号，会强制退出该 tid 所指向的线程，若成功执行会返
回 0。
```



```c
1. 阻塞式
int pthread_join(pthread_t thread, void **retval);
该函数为线程回收函数，默认状态为阻塞状态，直到成功回收线程后才返回。
    第一个参数为要回收线程的 tid 号，
    第二个参数为线程回收后接受线程传出的数据。

2. 非阻塞式
int pthread_tryjoin_np(pthread_t thread, void **retval);
该函数为非阻塞模式回收函数，通过返回值判断是否回收掉线程，
成功回收则返回 0，其余参数与 pthread_join 一致。
```





<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1774943450829-25a02103-7dd0-4129-8383-c8bc1c5b44fd.png)

### 串口编程
串口编程主要是点对点通信，不需要处理设备地址。

对串口设备像操作文件那样

1. 打开设备 如 /dev/ttySAC1
+ **<font style="color:rgb(43, 45, 49);">常用标志</font>**<font style="color:rgb(43, 45, 49);">：O_RDWR (读写)、O_NOCTTY (不作为控制终端)、O_NDELAY (非阻塞，可选)。</font>

```c
int open_port(char *com)
{
	int fd;
	//fd = open(com, O_RDWR|O_NOCTTY|O_NDELAY);
	fd = open(com, O_RDWR|O_NOCTTY);
    if (-1 == fd){
		return(-1);
    }

	  if(fcntl(fd, F_SETFL, 0)<0) /* 设置串口为阻塞状态*/
	  {
			printf("fcntl failed!\n");
			return -1;
	  }

	  return fd;
}
```

2. 进行相应的初始化和设置

波特率、数据位、是否开启奇偶校验、是否有停止位，设置一些模式和读写模式

```c
iRet = set_opt(fd, 115200, 8, 'N', 1);

int set_opt(int fd,int nSpeed, int nBits, char nEvent, int nStop)
{
	struct termios newtio,oldtio;

	if ( tcgetattr( fd,&oldtio) != 0) {
		perror("SetupSerial 1");
		return -1;
	}

	bzero( &newtio, sizeof( newtio ) );
	// CLOCAL: 忽略调制解调器线路（本地连接）
	// CREAD:  启用接收器，只有设置了它，read 才能收到数据
	newtio.c_cflag |= CLOCAL | CREAD;
	// CSIZE: 清除当前位设置
	newtio.c_cflag &= ~CSIZE;

	/* 关键：关闭规范模式、回显、信号字符 */
	// ICANON: 标准输入模式（设为 0 表示原始模式）
	// ECHO:   回显（设为 0 表示你发数据时，串口不会自动把数据再发回来）
	// ISIG:   终端产生的信号（设为 0 表示不处理 Ctrl+C 等）
	newtio.c_lflag  &= ~(ICANON | ECHO | ECHOE | ISIG);  /*Input*/

	// OPOST:  输出处理（设为 0 表示不对输出进行处理）
	newtio.c_oflag  &= ~OPOST;   /*Output*/

	//设置数据位
	switch( nBits )
	{
	case 7:
		newtio.c_cflag |= CS7;
	break;
	case 8:
		newtio.c_cflag |= CS8;
	break;
	}

	//设置奇偶校验位
	switch( nEvent )
	{
	//奇校验
	case 'O':
		newtio.c_cflag |= PARENB;  // 启用奇偶校验
		newtio.c_cflag |= PARODD;  // 设置为奇校验
		newtio.c_iflag |= (INPCK | ISTRIP);  // 输入奇偶校验和剥离 ?
	break;
	//偶校验
	case 'E':
		newtio.c_iflag |= (INPCK | ISTRIP); // 输入奇偶校验和剥离 ?
		newtio.c_cflag |= PARENB; // 启用奇偶校验
		newtio.c_cflag &= ~PARODD;  // 设置为偶校验
	break;
	//无校验
	case 'N':
		newtio.c_cflag &= ~PARENB;  // 禁用奇偶校验
	break;
	}

	switch( nSpeed )
	{
	case 2400:
		cfsetispeed(&newtio, B2400);  // 设置输入波特率
		cfsetospeed(&newtio, B2400);  // 设置输出波特率
	break;
	case 4800:
		cfsetispeed(&newtio, B4800);  // 设置输入波特率
		cfsetospeed(&newtio, B4800);  // 设置输出波特率
	break;
	case 9600:
		cfsetispeed(&newtio, B9600);  // 设置输入波特率
		cfsetospeed(&newtio, B9600);  // 设置输出波特率
	break;
	case 115200:
		cfsetispeed(&newtio, B115200);  // 设置输入波特率
		cfsetospeed(&newtio, B115200);  // 设置输出波特率
	break;
	default:
		cfsetispeed(&newtio, B9600);  // 设置输入波特率
		cfsetospeed(&newtio, B9600);  // 设置输出波特率
	break;
	}

	if( nStop == 1 )
		newtio.c_cflag &= ~CSTOPB;  // CSTOPB 为 0，表示 1 个停止位
	else if ( nStop == 2 )
		newtio.c_cflag |= CSTOPB;   // CSTOPB 为 1，表示 2 个停止位

	newtio.c_cc[VMIN]  = 1;  /* 读数据时的最小字节数: 没读到这些数据我就不返回! */
	newtio.c_cc[VTIME] = 0; /* 等待第1个数据的时间:
	                         * 比如VMIN设为10表示至少读到10个数据才返回,
	                         * 但是没有数据总不能一直等吧? 可以设置VTIME(单位是10秒)
	                         * 假设VTIME=1，表示:
	                         *    10秒内一个数据都没有的话就返回
	                         *    如果10秒内至少读到了1个字节，那就继续等待，完全读到VMIN个数据再返回
	                         */

	tcflush(fd,TCIFLUSH);  // 清空输入缓冲区的残留数据


	// tcsetattr：将配置应用到硬件
    // TCSANOW：立即生效
    // 其他选项：TCSADRAIN（等所有输出发完再生效）、TCSAFLUSH（丢弃输入缓冲区数据后再生效）
	if((tcsetattr(fd,TCSANOW,&newtio))!=0)
	{
		perror("com set error");
		return -1;
	}
	//printf("set done!\n");
	return 0;
}
```

3. 数据读写（read/write)

```c
iRet = write(fd, &c, 1);  
iRet = read(fd, &c, 1);
```

4. 关闭设备

```c
close(fd)
```

### I2C编程
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1775290016186-9cf55ed5-a1f0-4b1d-a51e-e47118912247.png)

#### <font style="color:rgb(43, 45, 49);">i2c_adapter</font>
<font style="color:rgb(43, 45, 49);">在一个 SoC（比如 IMX6ULL 或 STM32MP1）里，通常有多个 I2C 控制器。内核为了管理它们，为每一个控制器都分配了一个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">struct i2c_adapter</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">结构体。</font>

+ **<font style="color:rgb(43, 45, 49);">nr</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">(总线编号)</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">这是你最熟悉的。你在</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">/dev</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">下看到的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">i2c-0</font><font style="color:rgb(43, 45, 49);">、</font><font style="color:rgb(43, 45, 49);">i2c-1</font><font style="color:rgb(43, 45, 49);">，对应的就是这个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">nr</font><font style="color:rgb(43, 45, 49);">。</font>
    - **<font style="color:rgb(43, 45, 49);">意义</font>**<font style="color:rgb(43, 45, 49);">：当你调用</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">open("/dev/i2c-1", ...)</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">时，内核就是通过这个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">nr</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">找到了对应的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">i2c_adapter</font><font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">algo</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">(算法指针)</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">指向该适配器使用的传输函数集。每个厂家（如 NXP, Rockchip）的控制器硬件寄存器都不一样，所以他们会实现一套属于自己的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">algo</font><font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">name</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">适配器的名字，比如 "i2c-imx"。</font>

#### <font style="color:rgb(43, 45, 49);">i2c_algorithm（不太关注）</font>
<font style="color:rgb(43, 45, 49);">硬件驱动工程师最关心的地方。它定义了</font>**<font style="color:rgb(43, 45, 49);">如何通过硬件产生 I2C 的起始信号、停止信号、读写字节</font>**<font style="color:rgb(43, 45, 49);">。</font>

<font style="color:rgb(43, 45, 49);">最重要的成员是 </font>**<font style="color:rgb(43, 45, 49);">master_xfer</font>**<font style="color:rgb(43, 45, 49);"></font>

```plain
struct i2c_algorithm {
    int (*master_xfer)(struct i2c_adapter *adap, struct i2c_msg *msgs, int num);
    // ... 其他函数 ...
};
```

+ **<font style="color:rgb(43, 45, 49);">master_xfer</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">(核心函数)</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">功能</font>**<font style="color:rgb(43, 45, 49);">：它是“执行官”。当你调用应用层的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">ioctl(fd, I2C_RDWR, ...)</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">时，内核最终会调用到这个函数。</font>
    - **<font style="color:rgb(43, 45, 49);">参数</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">msgs</font>**<font style="color:rgb(43, 45, 49);">：这是一个数组，里面存放了你要发送或接收的所有数据包（地址、读/写标志、数据缓冲区）。</font>
    - **<font style="color:rgb(43, 45, 49);">逻辑</font>**<font style="color:rgb(43, 45, 49);">：它会操作 SoC 的寄存器，控制 SDA/SCL 引脚电平，真正地把数据在总线上“跑”起来。</font>

#### i2c_client
+ **<font style="color:rgb(43, 45, 49);">i2c_client</font>**<font style="color:rgb(43, 45, 49);">：代表一个</font>**<font style="color:rgb(43, 45, 49);">挂在总线上的具体从设备</font>**<font style="color:rgb(43, 45, 49);">。</font>
+ <font style="color:rgb(43, 45, 49);">它包含了这个设备的</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">7位地址</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">和 它所属的</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">i2c_adapter</font>**<font style="color:rgb(43, 45, 49);">。</font>
+ <font style="color:rgb(43, 45, 49);">每一个物理芯片（如传感器 AP3216C）在内核里都被抽象为一个 i2c_client。</font>

#### i2c_msg
```c
struct i2c_msg {
    __u16 addr;     /* 从设备地址 (7位地址) */
    __u16 flags;    /* 标志位：读还是写？ */
#define I2C_M_RD        0x0001  /* 1表示读，0表示写 */
#define I2C_M_TEN       0x0010  /* 1表示10位从设备地址 */
    __u16 len;      /* 数据长度（字节数） */
    __u8 *buf;      /* 数据缓冲区指针 */
};
```

数组形式作为消息，作为原子操作

```c
struct i2c_msg msgs[2];
unsigned char reg_addr = 0x0A; // 想要读的寄存器
unsigned char data_buf;        // 存放读到的数据
// 第一封信：写寄存器编号
msgs[0].addr  = 0x1E;
msgs[0].flags = 0;             // 写标志
msgs[0].len   = 1;
msgs[0].buf   = &reg_addr;
// 第二封信：读数据
msgs[1].addr  = 0x1E;
msgs[1].flags = I2C_M_RD;      // 读标志
msgs[1].len   = 1;
msgs[1].buf   = &data_buf;


struct i2c_rdwr_ioctl_data rdwr_data;
rdwr_data.msgs  = msgs;  // 放入刚才定义的信件数组
rdwr_data.nmsgs = 2;     // 信件的数量
// 寄出信件
ioctl(fd, I2C_RDWR, &rdwr_data);
```

#### 编程流程
| **<font style="color:rgb(43, 45, 49);">步骤</font>** | **<font style="color:rgb(43, 45, 49);">操作内容</font>** | **<font style="color:rgb(43, 45, 49);">用到的核心函数/结构体</font>** |
| --- | --- | --- |
| **<font style="color:rgb(43, 45, 49);">1. 打开总线</font>** | <font style="color:rgb(43, 45, 49);">打开</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">/dev/i2c-x</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">文件节点</font> | <font style="color:rgb(43, 45, 49);">open()</font> |
| **<font style="color:rgb(43, 45, 49);">2. 设置地址</font>** | <font style="color:rgb(43, 45, 49);">告诉内核你要和哪个地址的设备说话</font> | <font style="color:rgb(43, 45, 49);">ioctl(fd, I2C_SLAVE, addr)</font> |
| **<font style="color:rgb(43, 45, 49);">3. 封装消息</font>** | <font style="color:rgb(43, 45, 49);">把要读写的寄存器、缓冲区填入结构体</font> | <font style="color:rgb(43, 45, 49);">struct i2c_msg</font> |
| **<font style="color:rgb(43, 45, 49);">4. 执行传输</font>** | <font style="color:rgb(43, 45, 49);">把打包好的消息发送出去</font> | <font style="color:rgb(43, 45, 49);">ioctl(fd, I2C_RDWR, &rdwr_data)</font> |
| **<font style="color:rgb(43, 45, 49);">5. 关闭总线</font>** | <font style="color:rgb(43, 45, 49);">释放资源</font> | <font style="color:rgb(43, 45, 49);">close()</font> |


### 驱动程序框架
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1775540916851-8b21c19c-3168-4e31-8dda-79c13c36136e.png)

对于应用层，它通过open、read、write、ioctl等API函数访问硬件设备，实际上会调用到对应实现好的驱动程序。

因此对于一般的驱动程序开发框架如下

1. 先确定一个主设备号

```c
/* 1. 确定主设备号                                                                 */
static int major = 0;
```

2. 定义自己的file_operations结构体，用于确定应用API与驱动程序的映射关系

```c
/* 2. 定义自己的file_operations结构体                                              */
static struct file_operations hello_drv = {
	.owner	 = THIS_MODULE,
	.open    = hello_drv_open,
	.read    = hello_drv_read,
	.write   = hello_drv_write,
	.release = hello_drv_close,
};
```

3. 实现对应的驱动程序

:::info
1. 访问应用层：驱动程序中所使用的函数不能直接访问到应用程序中的数据，需要考虑使用一些辅助函数如copy_to_user
2. 访问硬件层：不能直接访问硬件相关寄存器物理地址，需使用ioremap（phy）得到虚拟地址，并对虚拟地址读写从而操作硬件。

:::

```c
/* 3. 实现对应的open/read/write等函数，填入file_operations结构体                   */
static ssize_t hello_drv_read (struct file *file, char __user *buf, size_t size, loff_t *offset)
{
	int err;
	printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	err = copy_to_user(buf, kernel_buf, MIN(1024, size));
	return MIN(1024, size);
}

static ssize_t hello_drv_write (struct file *file, const char __user *buf, size_t size, loff_t *offset)
{
	int err;
	printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	err = copy_from_user(kernel_buf, buf, MIN(1024, size));
	return MIN(1024, size);
}

static int hello_drv_open (struct inode *node, struct file *file)
{
	printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	return 0;
}

static int hello_drv_close (struct inode *node, struct file *file)
{
	printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	return 0;
}
```

4. 编写入口函数（注册驱动）

```c
static int __init hello_init(void)
{
    // 1. 向内核注册：请给我分配一个主设备号
	major = register_chrdev(0, "hello", &hello_drv); 

    // 2. 创建一个“类”：在 /sys/class/ 下建个目录
	hello_class = class_create(THIS_MODULE, "hello_class");

    // 3. 创建设备节点：在 /dev/ 下创建一个叫 "hello" 的文件
	device_create(hello_class, NULL, MKDEV(major, 0), NULL, "hello"); 

	return 0;
}
```

5. 编写出口函数（卸载驱动）

```c
static void __exit hello_exit(void)
{
    // 撤销顺序必须和初始化相反：
	device_destroy(hello_class, MKDEV(major, 0)); // 删掉 /dev/hello
	class_destroy(hello_class);                  // 删掉分类目录
	unregister_chrdev(major, "hello");           // 归还设备号
}
```

6. 模块驱动

```c
module_init(hello_init); // 告诉内核：启动时找这个函数
module_exit(hello_exit); // 告诉内核：退出时找这个函数

MODULE_LICENSE("GPL");   // 许可证：不写这个，内核会骂你是流氓软件，并不给你调用很多核心函数
```



### GPIO点灯
对寄存器操作的指针，最好加上volatile

led_drv.c注册硬件驱动函数

```c
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/slab.h>
#include <linux/init.h>
#include <linux/fs.h>
#include <linux/delay.h>
#include <linux/poll.h>
#include <linux/mutex.h>
#include <linux/wait.h>
#include <linux/uaccess.h>
#include <linux/device.h>
#include <asm/io.h>

static int major;
static struct class *led_class;

/* registers */
// IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3 地址：0x02290000 + 0x14
static volatile unsigned int *IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3;

// GPIO5_GDIR 地址：0x020AC004
static volatile unsigned int *GPIO5_GDIR;

//GPIO5_DR 地址：0x020AC000
static volatile unsigned int *GPIO5_DR;

static ssize_t led_write(struct file *filp, const char __user *buf,
			 size_t count, loff_t *ppos)
{
	char val;
	int ret;
	
	/* copy_from_user : get data from app */
	ret = copy_from_user(&val, buf, 1);

	/* to set gpio register: out 1/0 */
	if (val)
	{
		/* set gpio to let led on */
		*GPIO5_DR &= ~(1<<3);
	}
	else
	{

		/* set gpio to let led off */
		*GPIO5_DR |= (1<<3);
	}
	return 1;
}

static int led_open(struct inode *inode, struct file *filp)
{
	/* enable gpio5
	 * configure gpio5_io3 as gpio
	 * configure gpio5_io3 as output 
	 */
	*IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3 &= ~0xf;
	*IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3 |= 0x5;

	*GPIO5_GDIR |= (1<<3);
	
	return 0;
}

static struct file_operations led_fops = {
	.owner		= THIS_MODULE,
	.write		= led_write,
	.open		= led_open,
};

/* 入口函数 */
static int __init led_init(void)
{
	printk("%s %s %d\n", __FILE__, __FUNCTION__, __LINE__);
	
	major = register_chrdev(0, "100ask_led", &led_fops);

	/* ioremap */
	// IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3 地址：0x02290000 + 0x14
	IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3 = ioremap(0x02290000 + 0x14, 4);
	
	// GPIO5_GDIR 地址：0x020AC004
	GPIO5_GDIR = ioremap(0x020AC004, 4);
	
	//GPIO5_DR 地址：0x020AC000
	GPIO5_DR  = ioremap(0x020AC000, 4);

	led_class = class_create(THIS_MODULE, "myled");
	device_create(led_class, NULL, MKDEV(major, 0), NULL, "myled"); /* /dev/myled */
	
	return 0;
}

static void __exit led_exit(void)
{
	iounmap(IOMUXC_SNVS_SW_MUX_CTL_PAD_SNVS_TAMPER3);
	iounmap(GPIO5_GDIR);
	iounmap(GPIO5_DR);
	
	device_destroy(led_class, MKDEV(major, 0));
	class_destroy(led_class);
	
	unregister_chrdev(major, "100ask_led");
}

module_init(led_init);
module_exit(led_exit);
MODULE_LICENSE("GPL");
```



### 分层架构设计
1. 应用层通过open、read、write、ioctl函数访问驱动程序
2. 驱动程序如led_drv 获取opr结构体调用底层设备驱动对应的驱动函数实现通用逻辑
3. 底层设备驱动如board_a 依据硬件结构操作结构体实现对应功能。
4. 分离硬件相关资源，可供替换



### 总线设备驱动
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1775722654056-eb4e3c1c-d1ce-457d-84d3-1ce43b6e4f24.png)

将驱动分为platform_device和platform_driver，分别注册，放入内核虚拟总线bus。根据名字自动匹配，调用probe

#### platform_device
1. 定义platform_device结构体

```c
static struct platform_device board_A_led_dev = {
        .name = "100ask_led",
        .num_resources = ARRAY_SIZE(resources),
        .resource = resources,
        .dev = {
                .release = led_dev_release,
         },
};
```

2. 资源

```c
static struct resource resources[] = {
        {
                .start = GROUP_PIN(3,1),
                .flags = IORESOURCE_IRQ,
                .name = "100ask_led_pin",
        },
        {
                .start = GROUP_PIN(5,8),
                .flags = IORESOURCE_IRQ,
                .name = "100ask_led_pin",
        },
};
```

3. 入口/出口函数

```c
static int __init led_dev_init(void)
{
    int err;
    
    err = platform_device_register(&board_A_led_dev);   
    
    return 0;
}

static void __exit led_dev_exit(void)
{
    platform_device_unregister(&board_A_led_dev);
}
```

4. 模块

```c
module_init(led_dev_init);
module_exit(led_dev_exit);

MODULE_LICENSE("GPL");
```

#### platform_driver
1. 定义platform_driver结构体

```c
static struct platform_driver chip_demo_gpio_driver = {
    .probe      = chip_demo_gpio_probe,
    .remove     = chip_demo_gpio_remove,
    .driver     = {
        .name   = "100ask_led",
    },
};
```

2. 实现对应的probe和remove用于在匹配后获取资源并注册设备

```c
static int chip_demo_gpio_probe(struct platform_device *pdev) //在device attach时调用,获取资源并注册led设备
{
    struct resource *res;
    int i = 0;

    while (1)
    {
        res = platform_get_resource(pdev, IORESOURCE_IRQ, i++);
        if (!res)
            break;
        
        g_ledpins[g_ledcnt] = res->start;
        led_class_create_device(g_ledcnt);
        g_ledcnt++;
    }
    return 0;   
}

static int chip_demo_gpio_remove(struct platform_device *pdev)
{
    struct resource *res;
    int i = 0;

    while (1)
    {
        res = platform_get_resource(pdev, IORESOURCE_IRQ, i);
        if (!res)
            break;
        
        led_class_destroy_device(i);
        i++;
        g_ledcnt--;
    }
    return 0;
}
```

3. 定义驱动的opr结构体

```c
static struct led_operations board_demo_led_opr = {
    .init = board_demo_led_init,
    .ctl  = board_demo_led_ctl,
};
```

4. 实现相关驱动opr函数

```c
static int board_demo_led_init (int which)     
{     
    return 0;
}

static int board_demo_led_ctl (int which, char status) 
{
    return 0;
}
```

5. 出入口函数

```c
static int __init chip_demo_gpio_drv_init(void)
{
    int err;
    
    err = platform_driver_register(&chip_demo_gpio_driver); 
    register_led_operations(&board_demo_led_opr);
    
    return 0;
}

static void __exit lchip_demo_gpio_drv_exit(void)
{
    platform_driver_unregister(&chip_demo_gpio_driver);
}
```

6. 模块

```c
module_init(chip_demo_gpio_drv_init);
module_exit(lchip_demo_gpio_drv_exit);
MODULE_LICENSE("GPL");
```



### 设备树
1. 修改dts文件
2. 编译成dtb文件
3. 移植到板子上

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776067622354-a84992ca-6695-4308-83df-befc2123b892.png)

内核会自动解析设备树的相应节点为platform_device,然后去和platform_driver配对

对于没有解析成platform_device的节点，仍然可以通过内核源码 incldue/linux/of.h里声明的一些函数来访问：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776067871746-45b29db0-6134-420e-ad02-6dd9de441b08.png)



### Pinctrl子系统
负责引脚功能配置问题，相当于通过软件得到一个虚拟的引脚控制器pincontroller

#### <font style="color:rgb(43, 45, 49);">A. 引脚复用 (Pin Muxing)</font>
<font style="color:rgb(43, 45, 49);">一个引脚可以配置为不同的功能。例如，芯片上的 Pin A2 既可以作为</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">GPIO</font>**<font style="color:rgb(43, 45, 49);">，也可以作为</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">UART 的 TX</font>**<font style="color:rgb(43, 45, 49);">，或者</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">I2C 的 SCL</font>**<font style="color:rgb(43, 45, 49);">。</font>

+ <font style="color:rgb(43, 45, 49);">Pinctrl 负责在系统启动或驱动加载时，切换这些引脚的内部逻辑通路。</font>

#### <font style="color:rgb(43, 45, 49);">B. 引脚配置 (Pin Configuration)</font>
<font style="color:rgb(43, 45, 49);">除了功能选择，引脚还有许多电气参数需要配置：</font>

+ **<font style="color:rgb(43, 45, 49);">上下拉</font>**<font style="color:rgb(43, 45, 49);">：Pull-up, Pull-down, Floating。</font>
+ **<font style="color:rgb(43, 45, 49);">驱动能力</font>**<font style="color:rgb(43, 45, 49);">：Drive Strength（例如 2mA, 4mA, 8mA...）。</font>
+ **<font style="color:rgb(43, 45, 49);">开漏输出</font>**<font style="color:rgb(43, 45, 49);">：Open Drain。</font>
+ **<font style="color:rgb(43, 45, 49);">电压等级</font>**<font style="color:rgb(43, 45, 49);">：1.8V 还是 3.3V。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776068227921-5f9480df-168c-4e8a-8bd4-63629811bdb5.png)

如何得到pinctrl的配置引用：1. 使用芯片厂的图形化配置工具生成    2. 查看官方文档    3. 搜索和借鉴别人的代码



### GPIO子系统
<font style="color:rgb(43, 45, 49);">负责输出高低电平、读取输入状态。它是引脚的一种</font>**<font style="color:rgb(43, 45, 49);">功能状态</font>**<font style="color:rgb(43, 45, 49);">。（事先就需要Pinctrl子系统对引脚进行配置）</font>

<font style="color:rgb(43, 45, 49);">一般芯片厂会在设备树dtsi中提供“GPIO 组”就是一个 GPIO Controller，这通常都由芯片厂家设置好。</font>

<font style="color:rgb(43, 45, 49);">然后我们就可以在设备节点通过xxx-gpios=<>来指定引脚资源了。</font>

<font style="color:rgb(43, 45, 49);">因此一般的设备节点若用到GPIO需包含 ： Pinctrl引用的配置信息 + GPIO引脚资源信息</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776068507244-182be7dc-d2b3-4b7a-8441-e59ad6805361.png)

那么这样驱动程序就可以通过一下接口函数使用这些引脚了：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776068668414-c8035e5e-82c0-4a13-b2fa-34c4d04511a5.png)







### 中断处理
<font style="color:rgb(26, 28, 30);">对于中断处理，可以拆成上半部分（硬中断）就会立即执行，且不能嵌套和打断。而对于下半部分，根据实现方式不同，分为两种。一种是作为软中断执行,相当于维护了一个执行队列，这个队列里的函数会在硬中断结束后立即执行。另一种是将下半部分线程化，并可以设置优先级，同正常的APP任务一样参与调度器调度执行</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776151789635-555e1fba-9d7c-414f-8e38-2fb585bfd0aa.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776151936690-fef7338c-621c-44bd-b4fa-70f88575423d.png)

相应数据结构：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776154251319-2f565621-10c4-4f18-aa5c-281f9f908a01.png)

action链表存共享该中断的处理函数，每个函数会判断是否属于自己发出的中断，若是则执行。





ir_domian建立硬件中断号和虚拟中断号的映射关系，毕竟这些引脚会接在驱动设备上。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776155093738-9560e9db-ca5e-452b-ae3c-af1f839c4a5c.png)

在设备树中指定对应的硬件终端源，比如GPIO1的5号引脚，那么GPIO1的irq_domian，这些domain也是级联的关系，。设备树被解析后就会分配一个虚拟中断号，然后设置好与GPIO1_5的映射。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776155241249-9cf9fa38-f172-4e5f-8f09-67a42869f8a8.png)



### Read的驱动实现
#### 休眠唤醒方式
首先得实现一个环形buffer来用于存储按键值

```c
/* 环形缓冲区 */
#define BUF_LEN 128
static int g_keys[BUF_LEN];
static int r, w;

#define NEXT_POS(x) ((x+1) % BUF_LEN)

static int is_key_buf_empty(void)
{
	return (r == w);
}

static int is_key_buf_full(void)
{
	return (r == NEXT_POS(w));
}

static void put_key(int key)
{
	if (!is_key_buf_full())
	{
		g_keys[w] = key;
		w = NEXT_POS(w);
	}
}

static int get_key(void)
{
	int key = 0;
	if (!is_key_buf_empty())
	{
		key = g_keys[r];
		r = NEXT_POS(r);
	}
	return key;
}
```

然后根据这个buffer中是否有数据来实现休眠和唤醒

首先得声明要是初始化一个等待队列头

```c
static DECLARE_WAIT_QUEUE_HEAD(gpio_key_wait);
```

然后在驱动的read函数中实现逻辑就是首先看buffer里面是否有数据，然后被唤醒后在从buffer中取值。

```c
/* 实现对应的open/read/write等函数，填入file_operations结构体                   */
static ssize_t gpio_key_drv_read (struct file *file, char __user *buf, size_t size, loff_t *offset)
{
	//printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	int err;
	int key;
	
	wait_event_interruptible(gpio_key_wait, !is_key_buf_empty());
	key = get_key();
	err = copy_to_user(buf, &key, 4);
	
	return 4;
}
```

在probe函数的时候就获取GPIO、IRQ，并注册中断函数

```c
gpio_keys_100ask = kzalloc(sizeof(struct gpio_key) * count, GFP_KERNEL);
	for (i = 0; i < count; i++)
	{
		gpio_keys_100ask[i].gpio = of_get_gpio_flags(node, i, &flag);
		if (gpio_keys_100ask[i].gpio < 0)
		{
			printk("%s %s line %d, of_get_gpio_flags fail\n", __FILE__, __FUNCTION__, __LINE__);
			return -1;
		}
		gpio_keys_100ask[i].gpiod = gpio_to_desc(gpio_keys_100ask[i].gpio);
		gpio_keys_100ask[i].flag = flag & OF_GPIO_ACTIVE_LOW;
		gpio_keys_100ask[i].irq  = gpio_to_irq(gpio_keys_100ask[i].gpio); //把GPIO引脚转换成IRQ中断号
	}

	for (i = 0; i < count; i++)
	{
		err = request_irq(gpio_keys_100ask[i].irq, gpio_key_isr, IRQF_TRIGGER_RISING | IRQF_TRIGGER_FALLING, "100ask_gpio_key", &gpio_keys_100ask[i]);
	}
```

当按键被按下时就会触发中断函数，中断函数要做的就是往buffer里面填值，并且唤醒等待队列中的进程。

```c
static irqreturn_t gpio_key_isr(int irq, void *dev_id)
{
	struct gpio_key *gpio_key = dev_id;
	int val;
	int key;
	
	val = gpiod_get_value(gpio_key->gpiod);
	

	printk("key %d %d\n", gpio_key->gpio, val);
	key = (gpio_key->gpio << 8) | val;
	put_key(key);
	wake_up_interruptible(&gpio_key_wait);
	
	return IRQ_HANDLED;
}
 
```



#### Poll方式
poll方式即增加最长等待时间，要么有数据唤醒，要么超时唤醒

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776343247211-15ee22e1-f591-4869-afa2-8752cabca0c4.png)

我们要做的就是注册.poll接口函数，函数逻辑是调用poll_wait ,然后返回状态。

进程被唤醒后被再次调用该函数查看状态。

> `poll_wait` 并不会导致当前进程休眠！ 它的作用仅仅是“登记信息”——把当前的等待队列头（`gpio_key_wait`）添加到内核维护的 `poll_table` 监控列表里。相当于告诉内核：“如果后续有数据来了，记得通过 `gpio_key_wait` 把去休眠的进程叫醒。
>

```c
static unsigned int gpio_key_drv_poll(struct file *fp, poll_table * wait)
{
	printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	poll_wait(fp, &gpio_key_wait, wait);
	return is_key_buf_empty() ? 0 : POLLIN | POLLRDNORM;
}
```

对于中断函数依旧只需要获取按键值加唤醒进程就可以了

```c
static irqreturn_t gpio_key_isr(int irq, void *dev_id)
{
	struct gpio_key *gpio_key = dev_id;
	int val;
	int key;
	
	val = gpiod_get_value(gpio_key->gpiod);
	

	printk("key %d %d\n", gpio_key->gpio, val);
	key = (gpio_key->gpio << 8) | val;
	put_key(key);
	wake_up_interruptible(&gpio_key_wait);
	
	return IRQ_HANDLED;
}
```

#### 异步通知方式
即内核驱动产生中断时给应用层发信号通知，应用层需对信号进行处理。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776351739456-c27008bf-c9b8-4d3c-90c2-a688e7611d82.png)

对于应用层需要做的

首先就是撰写信号处理函数

```c
static void sig_func(int sig)
{
	int val;
	read(fd, &val, 4);
	printf("get button : 0x%x\n", val);
}
```

绑定信号，设置进程ID给fd，并设置FASYNC标志位

```c
signal(SIGIO, sig_func);  //当进程收到SIGIO信号时，就会去调用sig_func函数

/* 2. 打开文件 */
fd = open(argv[1], O_RDWR);
if (fd == -1)
{
    printf("can not open file %s\n", argv[1]);
    return -1;
}
fcntl(fd, F_SETOWN, getpid());  //设置当前进程为fd的owner
flags=fcntl(fd, F_GETFL);  //获取fd的flags
fcntl(fd, F_SETFL, flags | FASYNC);  //设置fd的flags为原来的flags加上FASYNC, 这样当fd有数据可读时就会发送SIGIO信号给owner
```



对于驱动层

首先实现file_operations中的.fasync函数，主要是让应用层的进程订阅当前设备的异步通知。

```c
struct fasync_struct *button_fasync;
//的作用是记录有哪些进程订阅了当前设备的异步通知。
//如果多个进程都开了异步通知，它们都会被记录在这个链表里
```

```c
static int gpio_key_drv_fasync(int fd, struct file *file, int on)
{
    if (fasync_helper(fd, file, on, &button_fasync) >= 0)
        return 0;
    else
        return -EIO;
}

static struct file_operations gpio_key_drv = {
    // ...
    .fasync  = gpio_key_drv_fasync,
};

//应用程序中执行 fcntl(fd, F_SETFL, flags | FASYNC); 时，
//内核最终就会调用到驱动里的这个 gpio_key_drv_fasync 函数。
```

其次在中断处理函数中就是再加上给这些链表中的进程发信号

```c
static irqreturn_t gpio_key_isr(int irq, void *dev_id)
{
    // ... (读取按键状态，存入缓冲区，唤醒等待队列等) ...
    
    kill_fasync(&button_fasync, SIGIO, POLL_IN);
    
    return IRQ_HANDLED;
}
```



#### 阻塞&非阻塞方式
当 APP 打开某个驱动时，在内核中会有一个 struct file 结构体对应这个驱动，这个结构体中有 f_flags，就是打开文件 时的标记位；可以设置 f_flasgs 的 O_NONBLOCK 位，表示非阻塞；也可以清除这个位表示阻塞。

设置方法如下：

```c
int fd = open(“/dev/xxx”, O_RDWR | O_NONBLOCK); /* 非阻塞方式 */
int fd = open(“/dev/xxx”, O_RDWR ); /* 阻塞方式 */


int flags = fcntl(fd, F_GETFL);
fcntl(fd, F_SETFL, flags | O_NONBLOCK); /* 非阻塞方式 */
fcntl(fd, F_SETFL, flags & ~O_NONBLOCK); /* 阻塞方式 */
```

然后需要优化的就是驱动层read程序，即在加入等待队列之前先判断是否为空且又设置了非阻塞

```c
/* 实现对应的open/read/write等函数，填入file_operations结构体                   */
static ssize_t gpio_key_drv_read (struct file *file, char __user *buf, size_t size, loff_t *offset)
{
	//printk("%s %s line %d\n", __FILE__, __FUNCTION__, __LINE__);
	int err;
	int key;

	//如果缓冲区没有数据了，并且是非阻塞读，就返回-EAGAIN
	if (is_key_buf_empty() && (file->f_flags & O_NONBLOCK))
		return -EAGAIN;
	
	wait_event_interruptible(gpio_key_wait, !is_key_buf_empty());
	key = get_key();
	err = copy_to_user(buf, &key, 4);
	
	return 4;
}
```

#### 
### 定时器
定时器就是启动定时器后,当特定系统Tick到达后就会触发定时器中断. 可用于按键防抖.

一般流程如下:

1. 定义timer_list结构体

```c
struct gpio_key{
    // ... 其他成员
    struct timer_list key_timer; 
} ;
```

2. 编写定时器中断处理函数

```c
static void key_timer_expire(unsigned long data)
{
    struct gpio_key *gpio_key = (struct gpio_key *)data;
    int val = gpiod_get_value(gpio_key->gpiod);
    int key = (gpio_key->gpio << 8) | val;
    put_key(key);
    wake_up_interruptible(&gpio_key_wait);
    kill_fasync(&button_fasync, SIGIO, POLL_IN);
}
```

3. 绑定处理函数和timer,然后向内核添加定时器

```c
// setup_timer 是老版本内核的API（新版本通常使用 timer_setup）
// 参数依次为：定时器结构体指针、超时处理函数、传递给处理函数的参数(这里传了该按键结构体的地址)
setup_timer(&gpio_keys_100ask[i].key_timer, key_timer_expire, (unsigned long)&gpio_keys_100ask[i]);

// 初始化时将超时时间设为一个极大的值 (~0)，这意味着它不会立刻执行
gpio_keys_100ask[i].key_timer.expires = ~0;

// 将定时器注册到内核链表中，此时定时器处于休眠/未真正激活的状态
add_timer(&gpio_keys_100ask[i].key_timer);  
```

4. 在程序合适位置通过mod_timer修改定时器超时时间,即可使用定时,到点触发

```c
static irqreturn_t gpio_key_isr(int irq, void *dev_id)
{
    struct gpio_key *gpio_key = dev_id;
    // 将超时时间更新为：当前时间 (jiffies) + 200ms (HZ/5)
    mod_timer(&gpio_key->key_timer, jiffies + HZ/5);  
    return IRQ_HANDLED;
}
```

### 中断上下部--Tasklet
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776409257872-e564b937-44f8-4652-b0eb-714baea606b7.png)

对于一个完整中断处理流程的话，将例如一些不耗时的操作放在上半部执行，而一些耗时的如数据处理操作放在下半部分处理。

整个流程如下：

1. 先通过request_irq(gpio_irq, irq_func)绑定上半部处理函数，这部分就是当硬件中断触发时要调用的函数
2. 准备下半部分函数，并放入tasklet_struct结构体

```c
void my_tasklet_func(unsigned long data) {
    // 这里做耗时的活，比如解析数据、消抖
    // 此时中断是开着的，我们可以被新的硬中断打断
}

struct tasklet_struct my_tasklet;
// 把你的 funB 包装进这个结构体
tasklet_init(&my_tasklet, my_tasklet_func, 0);
```

3. 在上半部的最后调度下半部

```c
irqreturn_t my_handler(int irq, void *dev_id) {
    // 1. 紧急处理硬件
    
    // 2. 调度下半部（对应图中红色的“调度下半部”箭头）
    tasklet_schedule(&my_led_tasklet); 
    
    return IRQ_HANDLED;
}
```

4. 在模块remove函数中要对应remove掉

```c
tasklet_kill(&gpio_keys_100ask[i].tasklet);
```

> ### <font style="color:rgb(43, 45, 49);">核心机制：Tasklet 的“唯一性”状态</font>
> <font style="color:rgb(43, 45, 49);">在内核中，每一个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">tasklet_struct</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">都有一个状态位，叫</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">TASKLET_STATE_SCHED</font><font style="color:rgb(43, 45, 49);">。</font>
>
> <font style="color:rgb(43, 45, 49);">当你调用</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">tasklet_schedule(&my_tasklet)</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">时，内核的动作如下：</font>
>
> + **<font style="color:rgb(43, 45, 49);">检查</font>**<font style="color:rgb(43, 45, 49);">：这个 Tasklet 的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">SCHED</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">位是不是已经是</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">1</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">了？</font>
> + **<font style="color:rgb(43, 45, 49);">判断</font>**<font style="color:rgb(43, 45, 49);">：</font>
>     - <font style="color:rgb(43, 45, 49);">如果已经是</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">1</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">了（说明它已经在队列里等候，还没轮到它跑）：</font>**<font style="color:rgb(43, 45, 49);">内核会直接返回，什么都不做！</font>**
>     - <font style="color:rgb(43, 45, 49);">如果是 0：才把它挂进队列，并将位设为 1。</font>
> + **<font style="color:rgb(43, 45, 49);">正确逻辑</font>**<font style="color:rgb(43, 45, 49);">：下半部函数里通常要写一个 while 循环，或者读取状态寄存器，直到</font>**<font style="color:rgb(43, 45, 49);">把当前硬件缓冲区里积压的所有数据全部处理完</font>**<font style="color:rgb(43, 45, 49);">再退出。</font>
>



其中的 state 有 2 位： 

◼ bit0 表示 TASKLET_STATE_SCHED 

等于 1 时表示已经执行了 tasklet_schedule 把该 tasklet 放入队列了； tasklet_schedule 会判断该位，如果已经等于 1 那么它就不会再次把 tasklet 放入队列。 

◼ bit1 表示 TASKLET_STATE_RUN 

等于 1 时，表示正在运行 tasklet 中的 func 函数；函数执行完后内核会把该位清 0。





### 中断上下部--work queue 工作队列
t<font style="color:rgb(26, 28, 30);">asklet是在中断上半部执行完后立即调度执行,期间只可能被新的中断打断,且只有当所有tasklet执行完后,才能返回去执行用户程序.只其实有可能造成用户程序迟迟不能执行,而引起系统卡顿.</font>

<font style="color:rgb(26, 28, 30);">而工作队列解决的就是把下半部放入队列中,然后借助处理他的是内核线程的身份,参与和用户程序的共同调度执行.</font>

<font style="color:rgb(26, 28, 30);">现代内核中存在多个专门用户处理工作队列任务的内核线程,其主要做的就是取work来执行.</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776419074121-3c437e70-3b23-4f9c-831e-bb7571df240c.png)

使用流程:

1. 包含头文件：

```c
#include <linux/workqueue.h>
```

2. 定义工作结构体 struct work_struct：通常将其嵌入到你自己定义的设备结构体中：

```c
struct gpio_key{
    // ...
    struct work_struct work;
};
```

3. 编写工作处理函数：函数的原型必须是 void (*func)(struct work_struct *work)。在函数内部，通常使用 container_of 宏来获取外层包含它的自定义设备结构体。

```c
static void my_work_func(struct work_struct *work) {
    struct gpio_key *dev = container_of(work, struct gpio_key, work);
    // 执行耗时、可能引起阻塞或休眠的任务
}
```

4. 初始化工作队列：在使用前必须初始化，通常在驱动的 probe 函数中调用 INIT_WORK 宏，绑定结构体和处理函数：

```c
INIT_WORK(&gpio_keys_100ask[i].work, key_work_func);
```

5. 调度（触发）工作：在需要延后处理的地方（比如中断处理函数 isr 中），调用 schedule_work 将任务提交给内核默认的工作队列调度：

```c
schedule_work(&gpio_keys_100ask[i].work);
```

6. 销毁/清理工作（非常重要）：  
在驱动卸载（remove 函数）时，必须确保还没有执行完的 work 被取消。（注：您提供的代码在 gpio_key_remove 函数中漏掉了这一步，存在隐患）  
标准的做法应是在卸载时调用

```c
cancel_work_sync(&gpio_keys_100ask[i].work);
```



### 中断上下部--中断线程化
对于工作队列，他借助专门处理它的内核线程kwork来间接参与调度

而对于中断线程化，他要做的就是把为下半部直接单独创建一个线程参与调度。

### <font style="color:rgb(43, 45, 49);">一、 配置初始化阶段：搭建“流水线”</font>
<font style="color:rgb(43, 45, 49);">当你调用</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">request_threaded_irq</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">时，内核并不仅仅是记下了你的函数地址，它还做了大量搬砖工作：</font>

+ **<font style="color:rgb(43, 45, 49);">创建</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">irqaction</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">结构体</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">内核在堆内存中申请一个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">struct irqaction</font><font style="color:rgb(43, 45, 49);">。</font>
    - <font style="color:rgb(43, 45, 49);">将你传入的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">handler</font><font style="color:rgb(43, 45, 49);">（上半部）和</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">thread_fn</font><font style="color:rgb(43, 45, 49);">（下半部）存入这个结构体的对应字段。</font>
+ **<font style="color:rgb(43, 45, 49);">创建专属内核线程</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">图中右侧的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">kthread_create</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">是关键。内核会自动为你创建一个名为</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irq/%d-%s</font><font style="color:rgb(43, 45, 49);">（例如</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irq/131-my_led</font><font style="color:rgb(43, 45, 49);">）的内核线程。</font>
    - <font style="color:rgb(43, 45, 49);">这个线程的指针被保存在</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irqaction->thread</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">中。</font>
    - **<font style="color:rgb(43, 45, 49);">初始状态</font>**<font style="color:rgb(43, 45, 49);">：这个线程创建后会立刻进入</font>**<font style="color:rgb(43, 45, 49);">睡眠状态</font>**<font style="color:rgb(43, 45, 49);">，不占用 CPU，等待被唤醒。</font>
+ **<font style="color:rgb(43, 45, 49);">挂载到“档案库”</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">内核根据</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irq</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">号找到</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irq_desc</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">数组中的对应项。</font>
    - <font style="color:rgb(43, 45, 49);">将配置好的 irqaction 挂载到 irq_desc->action 链表上。</font>

### <font style="color:rgb(43, 45, 49);">二、 中断发生处理阶段：流水线运转</font>
<font style="color:rgb(43, 45, 49);">当硬件触发中断（比如按键按下），内核按照图中 ① 和 ② 的顺序执行：</font>

#### <font style="color:rgb(43, 45, 49);">1. 第一步：执行上半部（硬中断上下文）</font>
+ **<font style="color:rgb(43, 45, 49);">动作</font>**<font style="color:rgb(43, 45, 49);">：CPU 跳入内核入口，找到</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irq_desc</font><font style="color:rgb(43, 45, 49);">，并执行</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">action->handler</font><font style="color:rgb(43, 45, 49);">（即你写的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">handler</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">函数）。</font>
+ **<font style="color:rgb(43, 45, 49);">判断返回值</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">情况 A</font>**<font style="color:rgb(43, 45, 49);">：返回</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">IRQ_HANDLED</font><font style="color:rgb(43, 45, 49);">。内核认为活干完了，流程结束，不唤醒线程。</font>
    - **<font style="color:rgb(43, 45, 49);">情况 B</font>**<font style="color:rgb(43, 45, 49);">：返回</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">IRQ_WAKE_THREAD</font>**<font style="color:rgb(43, 45, 49);">。</font>
        * **<font style="color:rgb(43, 45, 49);">动作</font>**<font style="color:rgb(43, 45, 49);">：内核看到这个信号，会立即去执行图中红字描述的操作：</font>**<font style="color:rgb(43, 45, 49);">唤醒</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">irqaction->thread</font>****<font style="color:rgb(43, 45, 49);"> </font>****<font style="color:rgb(43, 45, 49);">指向的那个内核线程</font>**<font style="color:rgb(43, 45, 49);">。</font>
        * **<font style="color:rgb(43, 45, 49);">返回</font>**<font style="color:rgb(43, 45, 49);">：上半部执行完毕，释放 CPU，系统回到可中断状态。</font>

#### <font style="color:rgb(43, 45, 49);">2. 第二步：执行下半部（进程上下文）</font>
+ **<font style="color:rgb(43, 45, 49);">唤醒</font>**<font style="color:rgb(43, 45, 49);">：刚才处于睡眠状态的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">irq/d-%s</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">线程现在变成了“就绪态”，等待调度器分配时间片。</font>
+ **<font style="color:rgb(43, 45, 49);">执行</font>**<font style="color:rgb(43, 45, 49);">：一旦调度器选中了这个线程，它就会跑起来，并自动调用你当初注册的</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">thread_fn</font>**<font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">自由度</font>**<font style="color:rgb(43, 45, 49);">：在</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">thread_fn</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">运行期间，它可以放心地休眠（比如消抖、读写磁盘）。</font>
+ **<font style="color:rgb(43, 45, 49);">善后</font>**<font style="color:rgb(43, 45, 49);">：执行完后，线程再次进入睡眠，等待下一次上半部的唤醒信号。</font>

> + **<font style="color:rgb(43, 45, 49);">与“工作队列”的区别</font>**<font style="color:rgb(43, 45, 49);">：</font>
>     - **<font style="color:rgb(43, 45, 49);">工作队列</font>**<font style="color:rgb(43, 45, 49);">：是所有驱动共用几个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">kworker</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">线程（排队排得长）。</font>
>     - **<font style="color:rgb(43, 45, 49);">Threaded IRQ</font>**<font style="color:rgb(43, 45, 49);">：是</font>**<font style="color:rgb(43, 45, 49);">一个中断号对应一个线程</font>**<font style="color:rgb(43, 45, 49);">（图中明确画出了</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">kthread_create</font><font style="color:rgb(43, 45, 49);">）。</font>
>     - **<font style="color:rgb(43, 45, 49);">优势</font>**<font style="color:rgb(43, 45, 49);">：这种“一对一”的关系让你可以独立设置每个中断的优先级。</font>
>

使用流程：

1. 编写中断上半部

```c
static irqreturn_t gpio_key_isr(int irq, void *dev_id)
{
    struct gpio_key *gpio_key = dev_id;
    // ... (代码中为了演示也调度了tasklet等，实际情况可省略) ...
    
    // 核心点：必须返回 IRQ_WAKE_THREAD 来唤醒下半部的线程化中断函数
    return IRQ_WAKE_THREAD;
}
```

> <font style="color:rgb(43, 45, 49);">注意： 如果此函数认为本次中断不需要进一步处理，可以返回 </font>`<font style="color:rgb(43, 45, 49);">IRQ_HANDLED</font>`<font style="color:rgb(43, 45, 49);"> 或是 </font>`<font style="color:rgb(43, 45, 49);">IRQ_NONE</font>`<font style="color:rgb(43, 45, 49);">，此时下半部的线程将不会被唤醒。如果在申请中断时把硬中断处理函数设为 </font>`<font style="color:rgb(43, 45, 49);">NULL</font>`<font style="color:rgb(43, 45, 49);">，内核会提供默认的回调并自动返回 </font>`<font style="color:rgb(43, 45, 49);">IRQ_WAKE_THREAD</font>`<font style="color:rgb(43, 45, 49);">。</font>
>

2. 编写中断下半部

```c
static irqreturn_t gpio_key_thread_func(int irq, void *data)
{
    struct gpio_key *gpio_key = data;
    int val;

    // 执行耗时的或者可能引起休眠的操作（如读取硬件寄存器/GPIO状态）
    val = gpiod_get_value(gpio_key->gpiod);

    printk("gpio_key_thread_func: the process is %s pid %d\n",current->comm, current->pid);	
    printk("gpio_key_thread_func key %d %d\n", gpio_key->gpio, val);
    
    // 处理完成后返回 IRQ_HANDLED
    return IRQ_HANDLED;
}
```

3. 申请线程化中断

```c
// request_threaded_irq 参数说明：
// 1. 中断号: gpio_keys_100ask[i].irq
// 2. 硬中断处理函数: gpio_key_isr
// 3. 线程化中断处理函数: gpio_key_thread_func
// 4. 触发标志位: IRQF_TRIGGER_RISING | IRQF_TRIGGER_FALLING
// 5. 中断名称: "100ask_gpio_key"
// 6. 传递给处理函数的参数: &gpio_keys_100ask[i]
err = request_threaded_irq(gpio_keys_100ask[i].irq, 
                           gpio_key_isr, 
                           gpio_key_thread_func, 
                           IRQF_TRIGGER_RISING | IRQF_TRIGGER_FALLING, 
                           "100ask_gpio_key", 
                           &gpio_keys_100ask[i]);
```

4. 释放中断资源

<font style="color:rgb(43, 45, 49);">在驱动卸载或 </font>`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">remove</font>`<font style="color:rgb(43, 45, 49);"> 函数中，需要将申请的中断资源释放，调用 </font>`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">free_irq</font>`<font style="color:rgb(43, 45, 49);">。</font>

<font style="color:rgb(43, 45, 49);">在代码的 </font>`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">gpio_key_remove</font>`<font style="color:rgb(43, 45, 49);"> 中：</font>

```c
free_irq(gpio_keys_100ask[i].irq, &gpio_keys_100ask[i]);
```





### mmap
**<font style="color:rgb(43, 45, 49);">第一层：进程的“身份证” —— task_struct</font>**

<font style="color:rgb(43, 45, 49);">在 Linux 内核中，每一个进程都由一个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">task_struct</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">结构体来表示（这就是所谓的 PCB - 进程控制块）。</font>

+ **<font style="color:rgb(43, 45, 49);">作用</font>**<font style="color:rgb(43, 45, 49);">：它是进程的“总管”，里面记录了进程的 PID、状态、优先级、文件描述符等。</font>
+ **<font style="color:rgb(43, 45, 49);">内存指针</font>**<font style="color:rgb(43, 45, 49);">：它里面有一个成员 struct mm_struct *mm。这个指针指向了该进程的</font>**<font style="color:rgb(43, 45, 49);">整个内存管理信息</font>**<font style="color:rgb(43, 45, 49);">。如果 mm 为 NULL，说明这是一个内核线程（没有用户空间内存）。</font>

**<font style="color:rgb(43, 45, 49);">第二层：内存的“总账本” —— mm_struct</font>**

<font style="color:rgb(43, 45, 49);">这个结构体代表了进程所能看到的</font>**<font style="color:rgb(43, 45, 49);">整个虚拟地址空间</font>**<font style="color:rgb(43, 45, 49);">。它主要管两件事：</font>

**<font style="color:rgb(43, 45, 49);">1. 虚拟空间的“功能区”划分 (VMA)</font>**

+ **<font style="color:rgb(43, 45, 49);">数据结构</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">mmap</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">成员。它是一个链表头，指向一串</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">vm_area_struct</font><font style="color:rgb(43, 45, 49);">（简称</font><font style="color:rgb(43, 45, 49);"> </font>**<font style="color:rgb(43, 45, 49);">VMA</font>**<font style="color:rgb(43, 45, 49);">）。</font>
+ **<font style="color:rgb(43, 45, 49);">内部实现</font>**<font style="color:rgb(43, 45, 49);">：进程的虚拟内存不是乱放的，而是分块的。</font>
    - <font style="color:rgb(43, 45, 49);">一个 VMA 描述代码段（只读、可执行）。</font>
    - <font style="color:rgb(43, 45, 49);">一个 VMA 描述堆（可读写）。</font>
    - <font style="color:rgb(43, 45, 49);">一个 VMA 描述栈（可读写、向下增长）。</font>
+ **<font style="color:rgb(43, 45, 49);">VMA 的作用</font>**<font style="color:rgb(43, 45, 49);">：当你程序运行出错，提示</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">Segmentation Fault</font><font style="color:rgb(43, 45, 49);">（段错误）时，通常是因为你访问了一个地址，而这个地址</font>**<font style="color:rgb(43, 45, 49);">不在任何一个 VMA 定义的范围内</font>**<font style="color:rgb(43, 45, 49);">，或者你试图写一个“只读”的 VMA。</font>

**<font style="color:rgb(43, 45, 49);">2. 映射的“导航入口” (pgd)</font>**

+ **<font style="color:rgb(43, 45, 49);">数据结构</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">pgd_t *pgd</font><font style="color:rgb(43, 45, 49);">（Page Global Directory）。</font>
+ **<font style="color:rgb(43, 45, 49);">内部实现</font>**<font style="color:rgb(43, 45, 49);">：它存储了该进程</font>**<font style="color:rgb(43, 45, 49);">第一级页表的物理基地址</font>**<font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">动作</font>**<font style="color:rgb(43, 45, 49);">：这就是我们之前聊到的，当进程切换时，内核把这个 pgd 的值写进 CPU 的 </font>**<font style="color:rgb(43, 45, 49);">CR3/TTBR0 寄存器</font>**<font style="color:rgb(43, 45, 49);">，从而让 MMU 切换导航地图。</font>

**<font style="color:rgb(43, 45, 49);">第三层：物理映射的“翻译机器” —— 页目录与页表</font>**

<font style="color:rgb(43, 45, 49);">图的右侧展示了虚拟地址如何变成物理地址的微观过程。</font>

+ **<font style="color:rgb(43, 45, 49);">PGD (页全局目录)</font>**<font style="color:rgb(43, 45, 49);">：这是翻译的第一站。它把虚拟地址的高位拆出来，像查字典的“部首”一样，找到下一级页表的位置。</font>
+ **<font style="color:rgb(43, 45, 49);">多级页表</font>**<font style="color:rgb(43, 45, 49);">（图中简略了，通常有 PUD, PMD, PTE 等级）：</font>
    - **<font style="color:rgb(43, 45, 49);">为什么分级？</font>**<font style="color:rgb(43, 45, 49);">：如果只用一级页表，管理 4GB 空间需要 4MB 连续内存。如果有 1000 个进程，光页表就占 4GB 内存。分级后，只有</font>**<font style="color:rgb(43, 45, 49);">真正用到</font>**<font style="color:rgb(43, 45, 49);">的内存才分配页表，极大地节省了空间。</font>
+ **<font style="color:rgb(43, 45, 49);">最终产物</font>**<font style="color:rgb(43, 45, 49);">：最后一级页表记录了：</font>**<font style="color:rgb(43, 45, 49);">虚拟页号 -》物理页号</font>**<font style="color:rgb(43, 45, 49);">。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776581124167-f4f6e11f-6860-4b2f-a652-cfb3cd724e7a.png)                                                                                    

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776582131260-6d4a84a0-5ee8-4363-baf4-cccd83979b66.png)



<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/62618266/1776587308916-51265d43-e990-405f-a68b-0818d4b522af.png)

#### <font style="color:rgb(43, 45, 49);">1. MAP_SHARED (共享映射)</font>
<font style="color:rgb(43, 45, 49);">这是最符合“映射”直觉的模式。</font>

+ **<font style="color:rgb(43, 45, 49);">行为</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">你对这块内存的任何修改，都会</font>**<font style="color:rgb(43, 45, 49);">直接同步</font>**<font style="color:rgb(43, 45, 49);">到底层硬件（或文件）。</font>
    - <font style="color:rgb(43, 45, 49);">其他映射了同一个物理地址（或同一个文件）的进程，能立刻看到你的修改。</font>
+ **<font style="color:rgb(43, 45, 49);">底层</font>**<font style="color:rgb(43, 45, 49);">：所有进程的页表都指向</font>**<font style="color:rgb(43, 45, 49);">同一个物理内存页</font>**<font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">适用场景</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">驱动开发（操作寄存器/显存）</font>**<font style="color:rgb(43, 45, 49);">：当你映射 i.MX6ULL 的寄存器时，</font>**<font style="color:rgb(43, 45, 49);">必须</font>**<font style="color:rgb(43, 45, 49);">选这个。否则你改了半天内存，硬件引脚根本没动静。</font>
    - **<font style="color:rgb(43, 45, 49);">进程间通信 (IPC)</font>**<font style="color:rgb(43, 45, 49);">：两个进程通过读写同一块共享内存来传数据。</font>
    - **<font style="color:rgb(43, 45, 49);">高性能文件读写</font>**<font style="color:rgb(43, 45, 49);">：修改内存就等同于修改磁盘上的文件，省去了显式的</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">write</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">调用。</font>

---

#### <font style="color:rgb(43, 45, 49);">2. MAP_PRIVATE (私有映射 / 写时复制)</font>
<font style="color:rgb(43, 45, 49);">这是一种带有“保护意识”的模式。</font>

+ **<font style="color:rgb(43, 45, 49);">行为</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - <font style="color:rgb(43, 45, 49);">读操作：大家读取的是同一个内容。</font>
    - <font style="color:rgb(43, 45, 49);">写操作：</font>**<font style="color:rgb(43, 45, 49);">写时复制 (Copy-on-Write)</font>**<font style="color:rgb(43, 45, 49);">。当你尝试修改这块内存时，内核会偷偷拷贝一份副本给你，你在副本上改，</font>**<font style="color:rgb(43, 45, 49);">不会影响</font>**<font style="color:rgb(43, 45, 49);">底层文件，也不会影响其他进程。</font>
+ **<font style="color:rgb(43, 45, 49);">底层</font>**<font style="color:rgb(43, 45, 49);">：一旦发生写操作，页表就会指向一个新的物理页，不再共享。</font>
+ **<font style="color:rgb(43, 45, 49);">适用场景</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">加载共享库 (.so)</font>**<font style="color:rgb(43, 45, 49);">：多个程序共用同一个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">.so</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">文件的代码段，但每个程序需要有自己独立的全局变量副本。</font>
    - **<font style="color:rgb(43, 45, 49);">程序二进制文件执行</font>**<font style="color:rgb(43, 45, 49);">：所有的程序都从同一个磁盘文件读代码，但数据修改互不干扰。</font>

---

#### <font style="color:rgb(43, 45, 49);">3. MAP_ANONYMOUS (匿名映射)</font>
<font style="color:rgb(43, 45, 49);">它通常不单独使用，而是与上面两个结合（例如</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">MAP_SHARED | MAP_ANONYMOUS</font><font style="color:rgb(43, 45, 49);">）。</font>

+ **<font style="color:rgb(43, 45, 49);">行为</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">不关联文件</font>**<font style="color:rgb(43, 45, 49);">：这块内存不对应磁盘上的任何文件或硬件设备，它就是一块</font>**<font style="color:rgb(43, 45, 49);">纯粹的 RAM</font>**<font style="color:rgb(43, 45, 49);">（初始内容全为 0）。</font>
    - <font style="color:rgb(43, 45, 49);">忽略</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">fd</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">参数（通常传 -1）。</font>
+ **<font style="color:rgb(43, 45, 49);">适用场景</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">大块内存申请</font>**<font style="color:rgb(43, 45, 49);">：当你要申请超过</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">malloc</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">阈值（如 128KB）的大内存时，</font><font style="color:rgb(43, 45, 49);">malloc</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">底层就会调用</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">mmap(MAP_ANONYMOUS)</font><font style="color:rgb(43, 45, 49);">。</font>
    - **<font style="color:rgb(43, 45, 49);">父子进程通信</font>**<font style="color:rgb(43, 45, 49);">：父进程创建</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">MAP_SHARED | MAP_ANONYMOUS</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">的内存，然后</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">fork</font><font style="color:rgb(43, 45, 49);">，子进程会继承这块内存，两者可以互传数据。</font>

---

#### <font style="color:rgb(43, 45, 49);">4. 总结对比表：我该如何选择？</font>
| **<font style="color:rgb(43, 45, 49);">需求场景</font>** | **<font style="color:rgb(43, 45, 49);">推荐 flags 组合</font>** | **<font style="color:rgb(43, 45, 49);">核心理由</font>** |
| --- | --- | --- |
| **<font style="color:rgb(43, 45, 49);">操作硬件寄存器 (GPIO/UART等)</font>** | <font style="color:rgb(43, 45, 49);">MAP_SHARED</font> | <font style="color:rgb(43, 45, 49);">必须让修改直接作用于物理硬件。</font> |
| **<font style="color:rgb(43, 45, 49);">映射显存 (Framebuffer)</font>** | <font style="color:rgb(43, 45, 49);">MAP_SHARED</font> | <font style="color:rgb(43, 45, 49);">你的修改必须让显示控制器看到才能刷新图像。</font> |
| **<font style="color:rgb(43, 45, 49);">进程间传递大数据量</font>** | <font style="color:rgb(43, 45, 49);">MAP_SHARED</font> | <font style="color:rgb(43, 45, 49);">物理上只有一份数据，效率最高。</font> |
| **<font style="color:rgb(43, 45, 49);">读取文件但不希望修改原文件</font>** | <font style="color:rgb(43, 45, 49);">MAP_PRIVATE</font> | <font style="color:rgb(43, 45, 49);">利用内核的写时复制，保护原始数据。</font> |
| **<font style="color:rgb(43, 45, 49);">只是单纯想申请几 MB 内存</font>** | <font style="color:rgb(43, 45, 49);">MAP_ANONYMOUS</font> | <font style="color:rgb(43, 45, 49);">不需要创建临时文件，直接向内核要 RAM。</font> |


#### 使用方法：
##### 驱动侧
1. 在驱动模块初始化阶段分配一块内核内存

```c
int __init phellp_drv_init(void)
{
    //...
    kernel_buf = kmalloc(bufsiz, GFP_KERNEL);
    //...
    return 0;
}

```

2. 在驱动的 `file_operations` 结构体中绑定 `.mmap` 接口

```c
static struct file_operations my_fops = {
    // ... 其他操作
    .mmap = my_drv_mmap,
};
```

3. 编写具体的my_drv_mmap函数

```c
static int my_drv_mmap(struct file *file, struct vm_area_struct *vma) {
    // 1. 获取物理地址
    unsigned long phys = virt_to_phys(kernel_buf);
    
    // 2. 设置缓存属性 (以writecombine为例)，不使用buffer和Cache
    vma->vm_page_prot = pgprot_writecombine(vma->vm_page_prot);
    
    // 3. 映射物理页帧到VMA
    if (remap_pfn_range(vma, 
                        vma->vm_start, 
                        phys >> PAGE_SHIFT, // 物理页帧号
                        vma->vm_end - vma->vm_start, 
                        vma->vm_page_prot)) {
        return -EAGAIN;
    }
    return 0;
}
```

##### 应用侧
1. 打开设备文件

```c
int fd = open("/dev/my_device", O_RDWR);
```

2. 调用mmap建立映射

```c
// mmap(映射起始地址[通常设为NULL由内核分配], 映射长度, 权限设置, 映射类型, 文件描述符, 偏移量)
char *user_buf = mmap(NULL, FILE_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
if (user_buf == MAP_FAILED) {
    perror("mmap failed");
}
```

3. 借助user_buf对内核内存进行读写

```c
// 写数据（直接写到内核内存里）
strcpy(user_buf, "Hello Driver");

// 读数据（直接从驱动内存里读）
printf("%s\n", user_buf);
```

4. 取消映射，关闭设备文件

```c
munmap(user_buf, FILE_SIZE);
close(fd);
```

