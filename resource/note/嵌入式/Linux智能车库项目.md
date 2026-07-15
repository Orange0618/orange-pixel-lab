# FrameBuffer部分
## 使用流程
1. **<font style="color:rgb(43, 45, 49);">打开设备</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">open("/dev/fb0", O_RDWR)</font><font style="color:rgb(43, 45, 49);">。</font>
2. **<font style="color:rgb(43, 45, 49);">获取参数</font>**<font style="color:rgb(43, 45, 49);">：使用</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">ioctl</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">获取</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">fb_fix_screeninfo</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">和</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">fb_var_screeninfo</font><font style="color:rgb(43, 45, 49);">。</font>
3. **<font style="color:rgb(43, 45, 49);">内存映射</font>**<font style="color:rgb(43, 45, 49);">：使用</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">mmap</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">将显存映射到用户空间，得到一个内存指针（比如</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">unsigned char *fb_ptr</font><font style="color:rgb(43, 45, 49);">）。</font>
4. **<font style="color:rgb(43, 45, 49);">操作像素</font>**<font style="color:rgb(43, 45, 49);">：计算像素位置，往指针里写颜色数据。</font>
5. **<font style="color:rgb(43, 45, 49);">释放资源</font>**<font style="color:rgb(43, 45, 49);">：munmap 和 close。</font>

## 如何操作像素
<font style="color:rgb(43, 45, 49);">你的屏幕是 32位色，意味着每个像素点由 4 个字节（32位）组成。在内存中，这 4 个字节通常按照 B-G-R-A 的顺序排列（小端模式）：</font>

+ **<font style="color:rgb(43, 45, 49);">Byte 0 (低位)</font>**<font style="color:rgb(43, 45, 49);">: Blue (蓝色分量)</font>
+ **<font style="color:rgb(43, 45, 49);">Byte 1</font>**<font style="color:rgb(43, 45, 49);">: Green (绿色分量)</font>
+ **<font style="color:rgb(43, 45, 49);">Byte 2</font>**<font style="color:rgb(43, 45, 49);">: Red (红色分量)</font>
+ **<font style="color:rgb(43, 45, 49);">Byte 3 (高位)</font>**<font style="color:rgb(43, 45, 49);">: Alpha (透明度，通常在 FrameBuffer 中不生效或填 0xFF)</font>

<font style="color:rgb(43, 45, 49);">在 C 语言中，我们通常用一个</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">unsigned int</font><font style="color:rgb(43, 45, 49);">（4字节整数）来表示一个颜色：</font>

+ **<font style="color:rgb(43, 45, 49);">红色</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">0x00FF0000</font>
+ **<font style="color:rgb(43, 45, 49);">绿色</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">0x0000FF00</font>
+ **<font style="color:rgb(43, 45, 49);">蓝色</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">0x000000FF</font>
+ **<font style="color:rgb(43, 45, 49);">白色</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">0x00FFFFFF</font>
+ **<font style="color:rgb(43, 45, 49);">黑色</font>**<font style="color:rgb(43, 45, 49);">：0x00000000</font>

像素偏移：

$ Offset=(y×LineLength)+(x×BytesPerPixel) $

<font style="color:rgb(43, 45, 49);">LineLength：屏幕每一行占用的字节数。对于你的 1024 宽、32位色的屏幕，通常是 1024×4=40961024×4=4096字节。</font>

<font style="color:rgb(43, 45, 49);">BytesPerPixelBytesPerPixel：每个像素占几字节。32位色就是 4 字节。</font>

```c
void lcd_put_pixel(int x, int y, unsigned int color) {
    // 1. 计算偏移量
    // 使用 finfo.line_length (一行字节数) 保证兼容性
    // 使用 vinfo.bits_per_pixel / 8 (每个像素字节数)
    unsigned long offset = y * finfo.line_length + x * (vinfo.bits_per_pixel / 8);

    // 2. 找到该像素的内存指针
    unsigned int *pixel_addr = (unsigned int *)(fb_base + offset);

    // 3. 写入颜色数据
    *pixel_addr = color;
}
```

# 多线程编程
## 互斥量&条件变量
### API
<font style="color:rgb(43, 45, 49);">一、 互斥量 (Mutex)</font>

**<font style="color:rgb(43, 45, 49);">全称：</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">Mutual Exclusion（互斥）。</font><font style="color:rgb(43, 45, 49);">  
</font>**<font style="color:rgb(43, 45, 49);">作用：</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">保护“临界资源”（如全局变量、内存缓冲区、硬件寄存器），防止多个线程同时修改导致数据崩溃。</font>

<font style="color:rgb(43, 45, 49);">1. 核心 API</font>

```c
pthread_mutex_t mutex; // 定义互斥锁变量

// 1. 初始化
pthread_mutex_init(&mutex, NULL);

// 2. 上锁（加锁）
// 如果别的线程已经锁住了，当前线程会在这里“死等”（阻塞）
pthread_mutex_lock(&mutex);

/* --- 临界区：操作共享资源的代码 --- */

// 3. 解锁
pthread_mutex_unlock(&mutex);

// 4. 销毁（退出程序前执行）
pthread_mutex_destroy(&mutex);
```

<font style="color:rgb(43, 45, 49);">二、 条件变量 (Condition Variable)</font>

**<font style="color:rgb(43, 45, 49);">作用：</font>**<font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">用于线程间的“通信”和“同步”。它让线程在满足某个条件之前一直处于</font>**<font style="color:rgb(43, 45, 49);">睡眠状态</font>**<font style="color:rgb(43, 45, 49);">，当条件满足时，由另一个线程唤醒它。</font>

**<font style="color:rgb(43, 45, 49);">为什么要它？</font>**<font style="color:rgb(43, 45, 49);">  
</font><font style="color:rgb(43, 45, 49);">如果没有条件变量，消费者线程（识别车牌）为了知道图片是否准备好，必须不停地写</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">while(has_image == 0);</font><font style="color:rgb(43, 45, 49);">。这叫“忙等”，会让 CPU 占用率飙升到 100%，你的开发板会瞬间发烫卡死。</font>

<font style="color:rgb(43, 45, 49);">核心 API</font>

```c
pthread_cond_t cond; // 定义条件变量

// 1. 初始化
pthread_cond_init(&cond, NULL);

// 2. 等待信号
// 此函数会自动做三件事：① 解锁互斥量 ② 睡觉等待信号 ③ 醒来后自动重新加锁
pthread_cond_wait(&cond, &mutex);

// 3. 发送信号（唤醒一个线程）
pthread_cond_signal(&cond);

// 4. 发送广播（唤醒所有正在等待该条件的线程）
pthread_cond_broadcast(&cond);

// 5. 销毁
pthread_cond_destroy(&cond);
```

### 生产者&消费者模型
<font style="color:rgb(43, 45, 49);">1</font>**<font style="color:rgb(43, 45, 49);">. 消费者线程（等待图片并识别）：</font>**

```plain
pthread_mutex_lock(&lock);           // 1. 先拿锁进入厨房
while (buffer_is_empty) {            // 2. 检查发现没菜（用while防止虚假唤醒）
    pthread_cond_wait(&cond, &lock); // 3. 没菜就解开锁、去睡觉；等有菜了醒来，自动重新拿锁
}
// --- 此时已醒来，且手中握着锁 ---
get_image_from_buffer();             // 4. 拿走图片
pthread_mutex_unlock(&lock);         // 5. 完事，解锁
```

**<font style="color:rgb(43, 45, 49);">2. 生产者线程（采集图片）：</font>**

```plain
pthread_mutex_lock(&lock);           // 1. 拿锁，准备放菜
put_image_to_buffer();               // 2. 放入新采集的图片
pthread_cond_signal(&cond);          // 3. 大喊一声：“有菜了！”（发信号）
pthread_mutex_unlock(&lock);         // 4. 完事，解锁
```

# ALSA音频
<font style="color:rgb(43, 45, 49);">ALSA（Advanced Linux Sound Architecture）是 Linux 内核的音频子系统，替代了老旧的 OSS。它由内核驱动（</font>`<font style="color:rgb(43, 45, 49);">/dev/snd/*</font>`<font style="color:rgb(43, 45, 49);">）+ 用户空间库（</font>`<font style="color:rgb(43, 45, 49);">libasound.so</font>`<font style="color:rgb(43, 45, 49);">）+ 命令行工具（</font>`<font style="color:rgb(43, 45, 49);">aplay</font>`<font style="color:rgb(43, 45, 49);">、</font>`<font style="color:rgb(43, 45, 49);">arecord</font>`<font style="color:rgb(43, 45, 49);">）三层组成。</font>

## <font style="color:rgb(43, 45, 49);">WAV文件</font>
<font style="color:rgb(43, 45, 49);">WAV 是微软和 IBM 共同定义的音频容器格式。文件头 44 字节包含 RIFF 标识、格式标记、采样率、位深、声道数、数据长度等元信息，后面紧跟 PCM 裸数据。</font>

+ <font style="color:rgb(43, 45, 49);">WAV 头的结构：</font>`<font style="color:rgb(43, 45, 49);">RIFF chunk</font>`<font style="color:rgb(43, 45, 49);"> → </font>`<font style="color:rgb(43, 45, 49);">fmt chunk</font>`<font style="color:rgb(43, 45, 49);">（包含音频参数）→ </font>`<font style="color:rgb(43, 45, 49);">data chunk</font>`<font style="color:rgb(43, 45, 49);">（PCM 数据）</font>
+ <font style="color:rgb(43, 45, 49);">解析顺序：读 </font>`<font style="color:rgb(43, 45, 49);">sample_rate</font>`<font style="color:rgb(43, 45, 49);">、</font>`<font style="color:rgb(43, 45, 49);">bits_per_sample</font>`<font style="color:rgb(43, 45, 49);">、</font>`<font style="color:rgb(43, 45, 49);">num_channels</font>`<font style="color:rgb(43, 45, 49);"> → 传给 ALSA 配置 → 跳过 44 字节头 → 循环写 PCM 数据</font>
+ <font style="color:rgb(43, 45, 49);">WAV文件使用小端序存储数据，所以需做解析转换</font>

| <font style="color:rgb(204, 204, 204);">字节偏移量</font> | <font style="color:rgb(204, 204, 204);">数据类型 (C语言)</font> | <font style="color:rgb(204, 204, 204);">字段名称</font> | <font style="color:rgb(204, 204, 204);">含义</font> | <font style="color:rgb(204, 204, 204);">代码对应 (</font>`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">buf[ ]</font>`<br/><font style="color:rgb(204, 204, 204);">)</font> |
| :--- | :--- | :--- | :--- | :--- |
| `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">0 ~ 1</font>` | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">uint16_t</font>` | **<font style="color:rgb(204, 204, 204);">AudioFormat</font>** | <font style="color:rgb(204, 204, 204);">音频格式编码（1 代表线性 PCM，无压缩）</font> | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">buf[0]~buf[1]</font>` |
| `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">2 ~ 3</font>` | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">uint16_t</font>` | **<font style="color:rgb(204, 204, 204);">NumChannels</font>** | <font style="color:rgb(204, 204, 204);">声道数（1=单声道，2=双声道立体声 等）</font> | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">buf[2]~buf[3]</font>` |
| `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">4 ~ 7</font>` | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">uint32_t</font>` | **<font style="color:rgb(204, 204, 204);">SampleRate</font>** | <font style="color:rgb(204, 204, 204);">采样率（例如 44100、48000 Hz）</font> | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">buf[4]~buf[7]</font>` |
| `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">8 ~ 11</font>` | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">uint32_t</font>` | **<font style="color:rgb(204, 204, 204);">ByteRate</font>** | <font style="color:rgb(204, 204, 204);">字节率 (每秒数据量 = 采样率 × BlockAlign)</font> | _<font style="color:rgb(204, 204, 204);">(代码中忽略未使用)</font>_ |
| `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">12 ~ 13</font>` | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">uint16_t</font>` | **<font style="color:rgb(204, 204, 204);">BlockAlign</font>** | <font style="color:rgb(204, 204, 204);">数据块对齐单位 (声道数 × 位深 / 8)</font> | _<font style="color:rgb(204, 204, 204);">(代码中忽略未使用)</font>_ |
| `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">14 ~ 15</font>` | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">uint16_t</font>` | **<font style="color:rgb(204, 204, 204);">BitsPerSample</font>** | <font style="color:rgb(204, 204, 204);">位深度 / 采样位数（如 8、16、24、32 位）</font> | `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">buf[14]~buf[15]</font>` |


```c
/* WAV 文件头中 fmt chunk 的关键参数 */
typedef struct {
    unsigned short num_channels;   /* 声道数: 1=单声道, 2=立体声       */
    unsigned int   sample_rate;    /* 采样率: 如 44100, 48000         */
    unsigned short bits_per_sample;/* 位深:   如 16                   */
    unsigned int   data_size;      /* PCM 数据长度（字节）            */
} WavHeader;
```

## libasound——ALSA编程接口
`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">alsa-lib</font>`<font style="color:rgb(43, 45, 49);"> 提供了一套 C API，让应用程序可以打开 PCM 设备、设置参数、写入/读取音频帧。</font>

<font style="color:rgb(43, 45, 49);">核心流程："打开设备 → 配置参数 → 循环写数据 → 关闭设备"</font>

<font style="color:rgb(43, 45, 49);">声卡会从底层缓冲区一直拿数据播放，所以循环写入snd_pcm_writei时要及时，否则会出现欠载错误，这时可以靠snd_pcm_recover来重置声卡。</font>

```c
snd_pcm_sframes_t written = snd_pcm_writei(handle, buffer, frames);
        if (written < 0) {  //
            written = snd_pcm_recover(handle, written, 0);
            if (written < 0) {
                fprintf(stderr, "Error: snd_pcm_writei failed: %s\n",
                        snd_strerror(written));
                goto cleanup;
            }
        }
```

> **<font style="color:rgb(43, 45, 49);">遇到到单声道音频文件无法播放的问题：</font>**
>
> <font style="color:rgb(43, 45, 49);">WM8960 和 i.MX6ULL 的 SAI（I2S 控制器）之间是立体声 I2S 协议——每个采样周期固定传输左+右两个声道的数据：</font>
>
> <font style="color:rgb(43, 45, 49);">I2S 帧结构: | L 声道数据 | R 声道数据 | L 声道数据 | R 声道数据 | ...</font>
>
> <font style="color:rgb(43, 45, 49);">当你播放立体声文件（test.wav, 2ch）时：</font>
>
> <font style="color:rgb(43, 45, 49);">L: [音频数据]  R: [音频数据]   →  两个声道都有内容  →  Mono Output Mixer 混合  →  喇叭有声</font>
>
> <font style="color:rgb(43, 45, 49);">当你播放单声道文件（hjm.wav, 1ch）时：</font>
>
> <font style="color:rgb(43, 45, 49);">L: [音频数据]  R: [空/未定义]  →  右声道可能是噪声或静音  →  混合后异常或极弱</font>
>
> `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">plughw</font>`<font style="color:rgb(43, 45, 49);"> 帮 hjm.wav 做了采样率转换（24000→48000），但没有自动复制声道——单声道进去，单声道出来，到硬件层面就出问题了。</font>
>
> ## <font style="color:rgb(43, 45, 49);">两种解决方案</font>
> <font style="color:rgb(43, 45, 49);">方案 1：用 ffmpeg 转换（一次性）</font>
>
> <font style="color:rgb(43, 45, 49);">ffmpeg -i hjm.wav -ac 2 -ar 44100 hjm_stereo.wav</font>
>
> <font style="color:rgb(43, 45, 49);">方案 2：用 ALSA route 插件自动扩声道（持久方案） 创建 </font>`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">/etc/asound.conf</font>`<font style="color:rgb(43, 45, 49);">：</font>
>
> <font style="color:rgb(43, 45, 49);">pcm.mono2stereo {</font>
>
> <font style="color:rgb(43, 45, 49);">    type route</font>
>
> <font style="color:rgb(43, 45, 49);">    slave.pcm "plughw:0,0"</font>
>
> <font style="color:rgb(43, 45, 49);">    slave.channels 2</font>
>
> <font style="color:rgb(43, 45, 49);">    ttable.0.0 1    # 左声道输入 → 左声道输出</font>
>
> <font style="color:rgb(43, 45, 49);">    ttable.0.1 1    # 左声道输入 → 右声道输出（复制）</font>
>
> <font style="color:rgb(43, 45, 49);">}</font>
>
> <font style="color:rgb(43, 45, 49);">之后 </font>`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">aplay -D mono2stereo hjm.wav</font>`<font style="color:rgb(43, 45, 49);"> 就能直接播单声道文件。</font>
>







# PC服务器架构
程序：

1. tcp_server.c：负责接收开发板发来的信息，然后发给tts_client.py程序进行语音合成
2. tts_client.py：负责将接收的文本调用百度云的API进行语音合成

整体架构

```plain
tcp_server.c (父进程)
│
├── pipe(p2c) + pipe(c2p) + fork() → Python 子进程 (常驻，token 复用)
│
├── 主线程: accept() 循环
│     │
│     ├── 线程1: 收文字 → lock → 写管道/读路径 → unlock → 读WAV → send回板子
│     ├── 线程2: 收文字 → lock → 写管道/读路径 → unlock → 读WAV → send回板子
│     └── ...
│
└── Python 子进程: 循环 input() → TTS → print(路径)
```

`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">fork()</font>` 就像是孙悟空拔了一根猴毛，变出了一个完全一样的“分身”（子进程）。  
现在系统里有两个程序在同时运行：

+ 如果 `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">pid == 0</font>`：说明当前是子进程（也就是“分身”）。
+ 如果 `<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">pid > 0</font>`：说明当前是父进程（也就是原来的 C 程序），`<font style="color:rgb(215, 186, 125);background-color:rgba(255, 255, 255, 0.1);">pid</font>` 是那个分身的 ID。



# 服务器（PC）回传音频给客户端（开发板）
```c
/* ── 发送音频文件给客户端：4字节大小 + 数据 ──────────────── */
static int send_audio_file(int client_fd, const char *path)
{
    FILE *fp = fopen(path, "rb");
    if (!fp) {
        perror("fopen wav");
        return -1;
    }

    fseek(fp, 0, SEEK_END);
    uint32_t size = ftell(fp);
    fseek(fp, 0, SEEK_SET);

    /* 先发 4 字节大小（网络字节序） */
    uint32_t size_net = htonl(size);
    if (send(client_fd, &size_net, 4, 0) != 4) {
        fclose(fp);
        return -1;
    }

    /* 分块发送音频数据 */
    char buf[4096];
    uint32_t sent = 0;
    while (sent < size) {
        size_t to_read = (size - sent) < sizeof(buf) ? (size - sent) : sizeof(buf);
        size_t r = fread(buf, 1, to_read, fp);
        if (r == 0) break;

        ssize_t s = send(client_fd, buf, r, 0);
        if (s <= 0) { fclose(fp); return -1; }
        sent += s;
    }

    fclose(fp);
    printf("[server] sent %u bytes audio to client\n", size);
    return 0;
}
```

```c
/* ── 接收完整数据（处理分包） ─────────────────────────────── */
static int recv_all(int fd, void *buf, size_t len)
{
    size_t received = 0;
    while (received < len) {
        ssize_t n = recv(fd, (char *)buf + received, len - received, 0);
        if (n <= 0)
            return -1;
        received += n;
    }
    return 0;
}

/* ── 接收音频文件：4字节大小 + 数据 → 保存 → 播放 ──────── */
static int recv_and_play_audio(int fd)
{
    uint32_t size_net;  /* 网络字节序的音频大小 */
    if (recv_all(fd, &size_net, 4) < 0) {   // 先接收 4 字节音频大小
        fprintf(stderr, "[client] recv size failed\n");
        return -1;
    }

    uint32_t size = ntohl(size_net);   
    if (size == 0) {
        printf("[client] TTS 合成失败（服务器返回 0）\n");
        return -1;
    }

    printf("[client] receiving audio: %u bytes ...\n", size);

    /* 接收音频数据 */
    char *audio = malloc(size);
    if (!audio) {
        perror("malloc");
        return -1;
    }

    if (recv_all(fd, audio, size) < 0) {
        fprintf(stderr, "[client] recv audio data failed\n");
        free(audio);
        return -1;
    }

    /* 保存到临时文件 */
    FILE *fp = fopen(RECV_WAV, "wb");
    if (!fp) {
        perror("fopen");
        free(audio);
        return -1;
    }
    fwrite(audio, 1, size, fp);
    fclose(fp);
    free(audio);

    printf("[client] saved to %s, playing ...\n", RECV_WAV);

    /* 调用 ALSA 播放 */
    int ret = play_wav(RECV_WAV);
    if (ret < 0)
        fprintf(stderr, "[client] play_wav failed\n");
    else
        printf("[client] playback done\n");

    return ret;
}
```

因为 TCP 是一个“流（Stream）”协议，它本身是没有“数据包边界”概念的。如果不告诉接收方要收多少数据，接收方就不知道什么时候该停止接收。因此，这套代码的核心思想就是：先发一个名片（大小），再发货物（数据）。



# V4L2子系统
## 流程
<font style="color:rgb(43, 45, 49);">4L2 的操作不像普通文件</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">read/write</font><font style="color:rgb(43, 45, 49);"> </font><font style="color:rgb(43, 45, 49);">那么简单，它采用的是</font>**<font style="color:rgb(43, 45, 49);">视频缓冲队列</font>**<font style="color:rgb(43, 45, 49);">机制。你可以把它想象成一个</font>**<font style="color:rgb(43, 45, 49);">生产流水线</font>**<font style="color:rgb(43, 45, 49);">：</font>

+ **<font style="color:rgb(43, 45, 49);">打开设备</font>**<font style="color:rgb(43, 45, 49);">：</font><font style="color:rgb(43, 45, 49);">open("/dev/video0", ...)</font><font style="color:rgb(43, 45, 49);">。</font>
+ **<font style="color:rgb(43, 45, 49);">设置格式</font>**<font style="color:rgb(43, 45, 49);">：告诉摄像头你要的分辨率（比如 640x480）和像素格式（YUYV）。</font>
+ **<font style="color:rgb(43, 45, 49);">申请缓冲区</font>**<font style="color:rgb(43, 45, 49);">：向内核申请几块内存（通常是 4 块），用于存放摄像头拍到的图像。</font>
+ **<font style="color:rgb(43, 45, 49);">投放与启动</font>**<font style="color:rgb(43, 45, 49);">：把这几块空内存“喂”给摄像头（入队），然后下令开始拍照。</font>
+ **<font style="color:rgb(43, 45, 49);">循环抓取</font>**<font style="color:rgb(43, 45, 49);">：</font>
    - **<font style="color:rgb(43, 45, 49);">取出（Dequeue）</font>**<font style="color:rgb(43, 45, 49);">：从队列里拿出一块填满图像数据的内存。</font>
    - **<font style="color:rgb(43, 45, 49);">处理（Process）</font>**<font style="color:rgb(43, 45, 49);">：把图像转码并显示到 LCD 上。</font>
    - **<font style="color:rgb(43, 45, 49);">放回（Queue）</font>**<font style="color:rgb(43, 45, 49);">：把处理完的空内存放回队列，让摄像头继续填。</font>

## YUVV转RGB
```c
// 简单的线性转换公式（浮点运算较慢，实际建议用整型查找表优化）
R = Y + 1.402 * (V - 128);
G = Y - 0.34414 * (U - 128) - 0.71414 * (V - 128);
B = Y + 1.772 * (U - 128);
```

:::info
性能优化：

查表法，因为浮点计算较慢，提前计算好映射值

:::

```c
struct v4l2_capability {
    __u8    driver[16];      // 驱动程序的名字 (比如 "uvcvideo")
    __u8    card[32];        // 设备的名称 (比如 "USB WebCam")
    __u8    bus_info[32];    // 设备所在总线的信息 (比如 "usb-0000:00:1d.7-1")
    __u4    version;         // 驱动的版本号
    __u3    capabilities;    // 物理设备的整体能力掩码 (按位或)
    __u3    device_caps;     // 当前设备节点的能力掩码
    __u3    reserved[3];     // 保留字段
};
```

```c
    if (!(cap.capabilities & V4L2_CAP_VIDEO_CAPTURE)) { ... }
```

```c
    if (!(cap.capabilities & V4L2_CAP_STREAMING)) { ... }
```



# 车牌识别
V4L2 采集的原始帧 (640x480, YUYV 彩色)  
         │  
         ▼  
    OpenCV 做预处理  
    - 转灰度图（去掉颜色，车牌识别只需要明暗轮廓）  
    - 调整大小（太大会拖慢识别速度）  
         │  
         ▼  
    HyperLPR 做识别  
    - 第一步"检测"：在画面里找到车牌在哪  
    - 第二步"识别"：读出车牌上的字符  
         │  
         ▼  
    "京A12345"

