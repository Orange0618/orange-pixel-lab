### 2-1 安装软件
1. 安装Keil5 MDK
2. 安装器件支持包
    1. 在线安装
3. 软件注册
4. 安装STLINK驱动
    1. 去设备管理器看是否STLINK有感叹号
    2. 安装可以去Keil5/ARM/里面找，双击安装即可
5. 安装USB转串口驱动



### 2-2 新建工程
#### 新建工程步骤
1. Keil5点击<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765259193943-8a52f6ba-87bd-484d-9692-6b46c3bbd8e1.png)找到集中存放代码的文件夹并新建一个当前工程的文件夹，并点进去
2. 在文件名部分输入当前工程文件名 -> 点击保存
3. 选择器件型号，这里是STM32F103C8，点击OK
4. 添加工程相关必要文件：
    1. 从D:\BaiduNetdiskDownload\STM32入门教程资料\固件库\固件库\STM32F10x_StdPeriph_Lib_V3.5.0\STM32F10x_StdPeriph_Lib_V3.5.0\Libraries\CMSIS\CM3\DeviceSupport\ST\STM32F10x\startup\arm 找到一堆启动相关文件<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765259774074-0e577415-d372-4582-8bba-ae80c23fd354.png)
    2. 全部复制下来，在原来工程目录下新建一个Start目录存放
    3. 在D:\BaiduNetdiskDownload\STM32入门教程资料\固件库\固件库\STM32F10x_StdPeriph_Lib_V3.5.0\STM32F10x_StdPeriph_Lib_V3.5.0\Libraries\CMSIS\CM3\DeviceSupport\ST\STM32F10x 找到如下三个文件，也复制到Start目录下<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765260017849-cfa8c902-2478-462f-8489-b759f64af06d.png)
    4. 在D:\BaiduNetdiskDownload\STM32入门教程资料\固件库\固件库\STM32F10x_StdPeriph_Lib_V3.5.0\STM32F10x_StdPeriph_Lib_V3.5.0\Libraries\CMSIS\CM3\CoreSupport 找到内核寄存器的描述文件，也复制到Start目录下<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765260334802-1b779729-df05-4018-9631-ef9be03c0dd3.png)

> stm32f10x.h 是 外设寄存器描述文件，有哪些寄存器和它对应地址
>
> 下面两个system文件适用于配置时钟
>

5. 在Keil里弄一个Start的组，里面添加刚才所有的.c和.h文件，还有合适的启动文件（这里是md.s）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765260518738-7365990a-92c2-4e06-bd8e-0ef547da8b2e.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765260771691-9cc41943-db46-4b54-84f4-1d49d0fe1dcf.png)

6. 魔术棒里面添加包含Start目录

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765260904987-b32a897b-d219-478d-a08c-cd7a5f682a40.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765260978473-c9d38c01-c6a1-4dca-b00c-17e23d2eed98.png)

7. 创建main文件：工程目录下创一个User目录，Keil中添加新建组，并创建main.c到User目录下

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765261354877-df3d3893-3055-41e7-802d-f6e0e553c43b.png)到此，如果是用寄存器方式开发，新建工程就已经完毕了

8. stm32板子连上stlink，配置调试器

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765263648299-416aa477-51ea-4eed-979a-cd466dca25ac.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765263712589-113aa751-0ce5-43b8-a4b5-8a9422467787.png)

配置好后，写好程序，就可以先点build，如果没问题再点download下载到板子上

9. 配置库函数：工程目录中新建一个Library目录，并在D:\BaiduNetdiskDownload\STM32入门教程资料\固件库\固件\STM32F10x_StdPeriph_Lib_V3.5.0\STM32F10x_StdPeriph_Lib_V3.5.0\Libraries\STM32F10x_StdPeriph_Driver\src 和 inc 找到所有的库函数文件，复制到Library目录下

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765265266897-89f4a47d-78dd-4056-a91a-b89e5a49fd58.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765265554346-a904b737-f731-4ffe-a9f8-4502b83a4b4d.png)

10. Keil里面新建Library组，把库函数文件全部加进来
11. 从D:\BaiduNetdiskDownload\STM32入门教程资料\固件库\固件库\STM32F10x_StdPeriph_Lib_V3.5.0\STM32F10x_StdPeriph_Lib_V3.5.0\Project\STM32F10x_StdPeriph_Template找到以下三个文件

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765266078621-252d5c70-43e0-4698-bf81-91efee1e8014.png)放到User目录下，并在Keil里添加到User组里

12. 配置条件编译

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765266441950-29c880a3-9d9c-4259-8c30-3bfe2efd92e6.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765266542382-db111c7d-8e07-4cdb-a9b1-ed4f340dcb81.png)

至此库函数的新建工程就配置好了

#### 关于启动文件
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765267626321-929ed321-f7b3-4bf4-babf-d68d9cbbfeb7.png)

#### 程序执行逻辑
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765272140124-9bfa7ed1-924c-41b7-bc33-b5c79f209741.png)



### GPIO
#### 简介
GPIO (General Purpose Input Output) 通用输入输出口

+ 可配置为8种输入输出模式
+ 引脚电平：0V-3.3V,部分引脚可容忍5V

> FT的表示可以容忍
>

+ 输出模式下可控制端口输出高低电平，用以驱动LED、控制蜂鸣器、模拟通信协议输出时序等
+ 输入模式下可读取端口的高低电平或电压，用于读取按键输入、外接模块电平信号输入、ADC电压采集、模拟通信协议接收数据等

#### 基本结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765273209296-87bfc9ca-3c31-41d8-be45-961879581d85.png)

 内核通过APB2对寄存器进行读写,实现输出电平和读取电平

+ 寄存器每一位对应一个引脚,1高电平;0低电平

#### 结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765345146959-f1dc3915-6c1d-42d9-9497-3800b2a19839.png)

##### 输入部分
1. <font style="color:rgb(47, 50, 56);">从右往左看，首先是电压限幅装置：</font>

<font style="color:rgb(47, 50, 56);">电压大于3.3V：上方二极管导通，电流不会流入内部电路</font>

<font style="color:rgb(47, 50, 56);">0~3.3V：电流流入内部</font>

<font style="color:rgb(47, 50, 56);">小于0V（相对于VSS而言，所以电压可以是负的）：电流从VSS流出</font>

2. <font style="color:rgb(47, 50, 56);">接着到上拉下拉电阻部分：</font>

<font style="color:rgb(47, 50, 56);">开关可通过程序配置，给输入提供一个默认的输入电平（因为不给输入电平，它就会处于一种浮空状态，极不稳定很容易受外界环境改变电平）</font>

<font style="color:rgb(47, 50, 56);">接入上拉：默认高电平的输入模式</font>

<font style="color:rgb(47, 50, 56);">接入下拉：默认低电平的输入模式</font>

<font style="color:rgb(47, 50, 56);">注：上下拉电阻的阻值很大，是弱上下拉模式，目的是不妨碍正常输入操作</font>

3. <font style="color:rgb(47, 50, 56);">接着是一个施密特触发器（图中翻译错误）：</font>

<font style="color:rgb(47, 50, 56);">对输入电压进行整形。执行逻辑是：输入电压大于某一阈值，输出就会瞬间升为高电平；输入电压小于某一阈值，输出就会瞬间降为低电平</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/jpeg/62618266/1765345867909-9595a7c9-aeb4-4017-9193-6e03d507c278.jpeg)

<font style="color:rgb(47, 50, 56);">注：红线为外界输入的一段电压，绿线为设置的两个阈值（中间有一定范围，可以有效避免因信号波动而造成的输出抖动现象），蓝线为经过施密特触发器整形后的波形</font>

4. <font style="color:rgb(47, 50, 56);">整形后的波形就可以写入输入数据寄存器，接下来用程序读取寄存器某一位数据，就可以知道端口的输入电平了</font>
5. <font style="color:rgb(47, 50, 56);">连接到片上外设部分：</font>

<font style="color:rgb(47, 50, 56);">模拟输入：连接到ADC（模拟/数字转化）上，它需接受模拟量，要接在触发器前</font>

<font style="color:rgb(47, 50, 56);">复用功能输入：连接到其他需要读取端口的外设上的，接受数字量，接在触发器后</font>

##### <font style="color:rgb(47, 50, 56);">输出模式</font>
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/jpeg/62618266/1765345959163-410ef7e9-1b4c-416f-8372-686d115315fe.jpeg)

1. <font style="color:rgb(47, 50, 56);">从左往右看，数字部分可以由输出数据寄存器或片上外设控制，2种控制方式通过数据选择器接到输出控制部分</font>

<font style="color:rgb(47, 50, 56);">输出数据寄存器控制：本课程使用位设置/位清除寄存器配置（因为输出数据寄存器只能整体配置，故还可以用按位与，按位或方式；还有配置位带方式，本课程不用），要对某一位置1，在位设置寄存器的对应位写1，剩下不需要操作的位写0，使得输出数据寄存器写1的位置1，写0的位不变；若对某一位清0，就在位清除寄存器对应位置1即可</font>

2. <font style="color:rgb(47, 50, 56);">接下来接到两个MOS管（PMOS和NMOS），MOS管就是一种电子开关，信号控制开关的导通与关闭，开关负责将IO口接到VDD或VSS</font>

<font style="color:rgb(47, 50, 56);">有三种输出方式：</font>

<font style="color:rgb(47, 50, 56);">推挽模式：两个寄存器都有效，数据寄存器为1时，上管导通，下管断开，输出直接接到VDD，输出高电平；反之低电平（此模式下高低电平都有较强驱动能力，故也叫强推输出模式）</font>

<font style="color:rgb(47, 50, 56);">开漏模式：PMOS无效，NMOS工作。数据寄存器为1时，下管断开，此时输出相当于断开，也就是高阻模式；数据寄存器为0时，下管导通，IO口接VSS，输出低电平。</font>

<font style="color:rgb(47, 50, 56);">注：这种模式下，只有低电平有驱动能力，高电平没有，它可以作为通信协议的驱动方式（eg。I2C通信协议的引脚），还可以在多机通信的情况下避免各个设备的互相干扰，另外还可输出5V的电平信号（在IO口借一个5V的上拉电阻，输出低电平时，NMOS将IO连接VSS，输出低电平；输出高电平时，由外部上拉电阻拉告知5V，这样就能输出5V电平信号，用于兼容5V的电平设备）</font>

<font style="color:rgb(47, 50, 56);">关闭模式：是当端口为输入模式时，PMOS和NMOS都关闭，端口的信号由外部控制</font>

#### <font style="color:rgb(47, 50, 56);">GPIO模式</font>
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765346014763-a68a0ace-4d60-45ee-929b-e3c2d80fc78a.png)

#### <font style="color:rgb(47, 50, 56);">GPIO寄存器</font>
1. 因为 **一个 GPIO 端口有 16 个引脚（0~15）**，而每个引脚需要 **4 bit** 来配置（MODE[1:0] + CNF[1:0]）。  

| MODE | 意义 |
| --- | --- |
| 00 | 输入模式 |
| 01 | 输出 10MHz |
| 10 | 输出 2MHz |
| 11 | 输出 50MHz |


| CNF | 输入模式 | 输出模式 |
| --- | --- | --- |
| 00 | 模拟输入 | 通用推挽输出 |
| 01 | 浮空输入 | 通用开漏输出 |
| 10 | 上拉/下拉输入 | 复用推挽输出 |
| 11 | 保留 | 复用开漏输出 |


2. **端口输入数据寄存器（GPIOx_IDR）** 是 STM32 中用于**读取某个 GPIO 端口当前引脚电平状态**的寄存器。  
3. **端口输出数据寄存器（GPIOx_ODR）** 是 STM32 中用于 **控制 GPIO 引脚输出电平** 的寄存器，同时也可读取当前输出锁存值。  
4. BSRR = **Bit Set/Reset Register位设置/位复位寄存器**是一个 **32 位寄存器**，但其内部是：上 16 位：复位（清零）下 16 位：设置（置 1）

#### GPIO外设
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765346924073-b9fe5f06-2cb4-453e-8cce-c21cba8103b6.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765356944563-ff0d6179-0021-4708-8916-082dfc20c42c.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/jpeg/62618266/1765356960308-2395b5ce-7248-4bb7-a094-d38a1c881031.jpeg)

<font style="color:rgb(47, 50, 56);">工作原理：利用传感器元件的电阻会随外界模拟量的变化而变化，由于电阻变化不容易直接被观察，所以通常将传感器元件与定值电阻串联分压，就可以得到模拟电压的输出了（对电路来说，检测电压会非常容易）；另外此模块还可通过电压比较器来对模拟电压进行二值化，这样就得到了数字电压输出</font>

#### 代码
```c
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA,ENABLE);
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);


    GPIO_InitTypeDef GPIO_InitStructure;
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE); // Enable GPIOB clock
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_1 | GPIO_Pin_11; // Configure PB1 and PB11
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;          // Input with pull-up
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;      // Speed 50MHz
    GPIO_Init(GPIOB, &GPIO_InitStructure);                 // Initialize GPIOB with the settings
```

```c
GPIO_ResetBits(GPIOA,GPIO_Pin_0);
GPIO_SetBits(GPIOA,GPIO_Pin_0);
```

```c
GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_1)
GPIO_ReadOutputDataBit(GPIOA,GPIO_Pin_0)
```

### OELD
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765435480635-df246008-58b8-466a-be91-5ea4852ccae5.png)



### EXTI外部中断
#### 中断相关概念
+ 中断：在主程序运行过程中，出现了特定的中断触发条件(中断源),使得CPU暂停当前正在运行的程序，转而去处理中断程序，处理完成后又返回原来被暂停的位置继续运行
+ 中断优先级：当有多个中断源同时申请中断时，CPU会根据中断源的轻重缓急进行裁决，优先响应更加紧急的中断源
+ 中断嵌套：当一个中断程序正在运行时，又有新的更高优先级的中断源申请中断，CPU再次暂停当前中断程序，转而去处理新的中断程序，处理完成后依次进行返回

#### 中断执行流程
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765512718910-e0845b66-ed32-4b33-b8dd-6eb8fa8b0011.png)

#### STM32中断
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765512913175-bdae529f-4896-497b-9157-3e9d048182dc.png)

#### NVIC基本结构
<font style="color:rgb(47, 50, 56);">嵌套中断向量控制器。</font>

<font style="color:rgb(47, 50, 56);">优先级：</font>

1. <font style="color:rgb(47, 50, 56);">NVIC可以对优先级进行分组，分为抢占优先级和响应优先级</font>
2. <font style="color:rgb(47, 50, 56);">优先级由寄存器的四位（0·15）来决定，优先级的数是值越小，优先级越高，0就是最高优先级。</font>
3. <font style="color:rgb(47, 50, 56);">NVIC的中断优先级由优先级寄存器的4位(0-15)决定，这4位可以进行切分，分为高n位的抢占优先级和低4-n位的响应优先级</font>
4. <font style="color:rgb(47, 50, 56);">抢占优先级高的可以中断嵌套，响应优先级高的可以优先排队，抢占优先级和响应优先级均相同的按中断号排队</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765513593722-db1028e0-b0f6-4dc5-8767-83f4b38e6483.png)

> 分组方式由我们自己配置，配置后要注意各优先级取值范围
>

#### EXTI简介
1. EXTI可以监测指定GPIO口的电平信号，当其指定的GPIO口产生电平变化时，EXTI将立即向NVIC发出中断申请，经过NVIC裁决后即可中断CPU主程序，使CPU执行EXTI对应的中断程序
2. 支持的触发方式:上升沿/下降沿/双边沿/软件触发
3. 支持的GPIO口：所有GPIO口，但相同的Pin不能同时触发中断
4. 通道数：16个GPIO_Pin,外加PVD输出、RTC闹钟、USB唤醒、以太网唤醒
5. 触发响应方式：中断响应/事件响应

> <font style="color:rgb(47, 50, 56);">中断响应：申请中断，让CPU执行中断函数</font>
>
> <font style="color:rgb(47, 50, 56);">事件响应：当引脚电平变化时，中断申请信号发送到其他外设，使其他外设完成一些功能</font>
>

#### EXTI基本结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765514133877-5d373a8c-b7e4-453a-8b5a-2543666107a6.png)

1. <font style="color:rgb(47, 50, 56);">AFIO是一个数据选择器。由于每个GPIO都有16个引脚，而EXTI只有16个GPIO通道，加上下面4个，共有20个信号通道。PA0，PB0，经过AFIO选择之后，只有一个能接到通道0上。这就是为什么所有GPIO口都能触发中断，但相同的Pin不能同时触发</font>
2. <font style="color:rgb(47, 50, 56);">EXTI5~9和EXTI15~10被分配到了一个通道里，两者触发同一个中断函数，在中断函数里，我们要根据标志位区分到底是哪个中断进来的。</font>
3. <font style="color:rgb(47, 50, 56);">下面20个接口连接其他外设，用来触发事件响应</font>

#### AFIO复用IO口
1. AFIO主要用于引脚复用功能的选择和重定义
2. 在STM32中，AFIO主要完成两个任务：复用功能引脚重映射、中断引脚选择

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765514477569-3c51f522-be42-43c3-b563-fe3bb20f2efb.png)

#### EXTI框图
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765516005362-ebc281f9-892e-482f-a61c-d27d8effeaee.png)

#### 代码
```c
void CountSensor_Init(void)
{
    //1. 配置RCC
    //把使用到的外设时钟打开
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB | RCC_APB2Periph_AFIO, ENABLE);
    //因为EXTI和NVIC不需要单独打开时钟，所以这里不需要配置它们的时钟
    

    //2. 配置GPIO
    //配置PB14为上拉输入
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_14; //PB14
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU; //上拉输入
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; //速度50MHz
    GPIO_Init(GPIOB, &GPIO_InitStructure);

    //3. 配置AFIO
    GPIO_EXTILineConfig(GPIO_PortSourceGPIOB, GPIO_PinSource14); //PB14连接到EXTI14线


    //4. 配置EXTI
    //启用EXTI14，下降沿触发
    EXTI_InitTypeDef EXTI_InitStructure;
    EXTI_InitStructure.EXTI_Line = EXTI_Line14; //EXTI14
    EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt; //中断模式
    EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Falling; //下降沿触发
    EXTI_InitStructure.EXTI_LineCmd = ENABLE; //使能
    EXTI_Init(&EXTI_InitStructure);


    //5. 配置NVIC
    //配置EXTI14中断优先级分组为2，打开对应IRQ通道，并配置优先级
    NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2); //优先级分组2
    NVIC_InitTypeDef NVIC_InitStructure;
    NVIC_InitStructure.NVIC_IRQChannel = EXTI15_10_IRQn; //EXTI10~15中断
    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 1; //抢占优先级1
    NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1; //响应优先级1
    NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE; //使能
    NVIC_Init(&NVIC_InitStructure);
    
}

```

接着去启动文件找对应通道的中断函数名字，并声明定义该中断函数

```c
void EXTI15_10_IRQHandler(void)
{
    //由于该通道包含EXTI10~15，所以需要判断具体是哪个引脚触发的中断
    if(EXTI_GetITStatus(EXTI_Line14) == SET) //判断是否是EXTI14触发的中断
    {
        //在这里添加中断处理代码
        count++; //计数加1
        Delay_ms(300); //简单消抖

        //清除中断标志位,否则会一直进入中断
        EXTI_ClearITPendingBit(EXTI_Line14);
    }
}
```

### TIM定时器中断
<font style="color:rgb(47, 50, 56);">计数器（16位）：计数定时的寄存器，每来一个时钟，计数器加一 CNT</font>

<font style="color:rgb(47, 50, 56);">预分频器：对计数器的时钟进行分频，让这个计数更加灵活 PSC</font>

<font style="color:rgb(47, 50, 56);">分频：让输入信号高频率变为低频率</font>

<font style="color:rgb(47, 50, 56);">自动重装寄存器：设置来多少个时钟申请中断 ARR</font>

<font style="color:rgb(47, 50, 56);">这些寄存器构成的电路称为</font><font style="color:rgb(47, 50, 56);">时基单元</font><font style="color:rgb(47, 50, 56);">，每个寄存器都是16位的，基准时钟为72MHz。在72MHz计数时钟下可以实现最大计时：</font>

<font style="color:rgb(47, 50, 56);">计数器和自动重装寄存器共能计2的16次*2的16次个数，再除以72MHz就是中断一次的时间，为59.65s</font>

#### <font style="color:rgb(47, 50, 56);">定时器类型</font>
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765769907925-4fffe5b3-8898-4391-8d16-3da5e56ae121.png)

#### 定时器结构图
1. 基本定时器

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765770284614-e0b95084-3729-4801-8055-e4053ccb4a0a.png)

    - **<font style="color:rgb(47, 50, 56);">实际分频系数=预分频数+1</font>**
    - <font style="color:rgb(47, 50, 56);">自动重载寄存器，存放目标值，当计数器到达目标值时，产生中断，计时结束，清零计数器。</font>
    - <font style="color:rgb(47, 50, 56);">上面的箭头为更新中断，计数值等于目标值产生的中断，叫做“更新中断”，计数器不断自增，同时与自动重载目标值不断比较，相等时触发中断，更新中断到NVIC，配置相应的通道，定时器的中断就能够得到CPU响应。</font>
    - <font style="color:rgb(47, 50, 56);">下面是更新事件，对其他外设产生作用</font>
    - **<font style="color:rgb(47, 50, 56);">主模式触发DAC功能</font>**<font style="color:rgb(47, 50, 56);">：在使用DAC（数模转换器）时，如果要输出一段波形，正常方法是在程序里隔一段时间进入中断，进行DAC响应，但这样会影响其他中断响应，占用cpu。所以定时器设计了一个主模式，这个模式可以将更新事件通过触发控制器映射到DAC的响应引脚上，不需要主模式参与，实现了硬件的自动化</font>
    - <font style="color:rgb(47, 50, 56);">基本定时器仅支持向上计数，通用和高级定时器还支持向下计数和中央对齐模式</font>
2. 通用定时器

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765773134378-2ea747c8-8a95-4465-a199-ce91d7e561b7.png)

3. 高级定时器

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765773349156-79bac1a2-159f-40e4-b5a0-3be786e80ba9.png)

<font style="color:rgb(47, 50, 56);">加的内容：</font>

1. <font style="color:rgb(47, 50, 56);">重复计数计次器：可以进行多个更新中断后触发响应，相当于再次进行分频</font>
2. <font style="color:rgb(47, 50, 56);">在输出比较电路中进行升级，DTG死区生成电路；又加了三个引脚，变为两个互补的输出，可以输出一对互补的PWM波，这些电路用于驱动三相无刷电机，可应用于电钻，四轴飞行器，电动车后轮等</font>
3. <font style="color:rgb(47, 50, 56);">三相驱动电机的驱动电路有三个桥臂，每个桥臂受两个大功率开关管控制，所以输出PWM引脚的前三路就变为互补的输出。另外，为了防止互补输出的PWM驱动桥臂时，在开关切换的瞬间，由于器件不理想，造成短暂的直通现象，加入死区生成电路，让桥臂上下管都关闭，防止直通现象</font>

####   
 定时中断配置基本结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765773486773-ebd756a5-09e1-46d8-a4f7-fe934d1545f8.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765773795984-9f09c394-f619-4f7c-9187-f953bcd785bf.png)

1. <font style="color:rgb(47, 50, 56);">CK_PSC 预分频器的输入时钟，选内部时钟是72MHZ,一直运行</font>
2. <font style="color:rgb(47, 50, 56);">CNT_EN计数器使能，低电平停止，高电平正常运行</font>
3. <font style="color:rgb(47, 50, 56);">计数器计数频率：CK_CNT = CK_PSC / (PSC+1)</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765774148595-3f821ad0-cd54-40d8-8d1a-8a67f1465523.png)

计数器溢出频率：CK_CNT_OV = CK_CNT / (ARR+1) =CK_PSC/(PSC+1)/(ARR+1)

#### RCC时钟树
#### <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765774567645-24415229-f507-41ad-83aa-e362ad84cbf6.png)  
 代码
根据中断配置基本结构从左网页依次配置

```c
void Timer_Init(void){
    //1、使能对应定时器的时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); // 使能 TIM2 时钟

    //2. 配置时钟源
    TIM_InternalClockConfig(TIM2); // 使用内部时钟源


    //3. 配置时基单元
    TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;
    TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1; // 不分频
    TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up; // 向上计数模式
    TIM_TimeBaseInitStructure.TIM_Period = 10000 - 1; // 自动重装载值ARR
    TIM_TimeBaseInitStructure.TIM_Prescaler = 7200 - 1; // 预分频值PSC
    TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0; // 重复计数，因为TIM2不是高级定时器，所以该值无效
    TIM_TimeBaseInit(TIM2, &TIM_TimeBaseInitStructure);

    //4. 使能定时器中断
    TIM_ITConfig(TIM2, TIM_IT_Update, ENABLE); // 使能TIM2更新中断

    //5. 配置NVIC
    NVIC_InitTypeDef NVIC_InitStructure;
    NVIC_InitStructure.NVIC_IRQChannel = TIM2_IRQn; // TIM2中断
    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0; // 抢占优先级0
    NVIC_InitStructure.NVIC_IRQChannelSubPriority = 0; // 响应优先级0
    NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE; // 使能中断通道
    NVIC_Init(&NVIC_InitStructure);

    //6. 启动定时器
    TIM_Cmd(TIM2, ENABLE); // 使能TIM2
}
```

```c
void TIM2_IRQHandler(void){
    // 检查TIM2更新中断是否发生
    if (TIM_GetITStatus(TIM2, TIM_IT_Update) != RESET){
        // 清除TIM2更新中断标志
        TIM_ClearITPendingBit(TIM2, TIM_IT_Update);
        
        // 在这里添加定时器中断处理代码
        counter++; // 增加计数器
    }
}
```

```c
//因为外部时钟接到的是PA0引脚，所以需要初始化PA0引脚为浮空输入模式
void GPIOA_Init(void){ 
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE); // 使能 GPIOA 时钟

    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0; // PA0
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING; // 浮空输入模式
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; // 速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure); // 初始化GPIOA
}

void Timer_Init(void){
    //1、使能对应定时器的时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); // 使能 TIM2 时钟

    //2. 配置时钟源
    TIM_ETRClockMode2Config(
        TIM2,  //定时器：TIM2
        TIM_ExtTRGPSC_OFF,  // 不分频
        TIM_ExtTRGPolarity_Inverted, // 下降沿触发
        0 //滤波器0
    ); // 外部时钟模式2，下降沿触发

    GPIOA_Init();

    //3. 配置时基单元
    TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;
    TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1; // 不分频
    TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up; // 向上计数模式
    TIM_TimeBaseInitStructure.TIM_Period = 10-1; // 自动重装载值ARR
    TIM_TimeBaseInitStructure.TIM_Prescaler = 0; // 预分频值PSC
    TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0; // 重复计数，因为TIM2不是高级定时器，所以该值无效
    TIM_TimeBaseInit(TIM2, &TIM_TimeBaseInitStructure);

    TIM_ClearFlag(TIM2, TIM_FLAG_Update); // 清除更新中断标志
    //4. 使能定时器中断
    TIM_ITConfig(TIM2, TIM_IT_Update, ENABLE); // 使能TIM2更新中断


    //5. 配置NVIC
    NVIC_InitTypeDef NVIC_InitStructure;
    NVIC_InitStructure.NVIC_IRQChannel = TIM2_IRQn; // TIM2中断
    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0; // 抢占优先级0
    NVIC_InitStructure.NVIC_IRQChannelSubPriority = 0; // 响应优先级0
    NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE; // 使能中断通道
    NVIC_Init(&NVIC_InitStructure);

    //6. 启动定时器
    TIM_Cmd(TIM2, ENABLE); // 使能TIM2
}
```

### TIM输出比较
#### 概念
<font style="color:rgb(47, 50, 56);">CCR捕获/比较寄存器。CNT>,<,=CCR对输出电平进行置1，置0，翻转操作</font>

<font style="color:rgb(47, 50, 56);">pwm用于惯性系统，对脉冲宽度进行调制，将数字参量来等效获得模拟参量</font>

<font style="color:rgb(47, 50, 56);">占空比：高电平占周期的比例：做一个电压等效</font>

<font style="color:rgb(47, 50, 56);">分辨率:比如有的占空比只能以1%进行步距跳变，分辨率就是1%。实质上是占空比的精度</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765860442147-5cb8fa9a-8998-4b81-b3d3-24023a1af998.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765860826417-6d4a1708-d325-4b14-8766-bc9b6ccf99fd.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765861026808-031737cc-27df-49ac-8895-ad20a7140e1c.png)

所以设置为PWM1模式时:

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765861138418-a2e4fd64-09c0-426f-ac75-c5eee23b9846.png)

#### 相关库函数
<font style="color:rgb(47, 50, 56);">第一步，配置RCC，将GPIO，TIM外设的时钟都打开；第二步，配置时基单元，包括前面的时钟源选择；第三步，配置输出比较单元，统一用结构体；第四步，配置GPIO，把PWM对应的GPIO口，初始化为复用推挽输出的配置；第五步，运行控制，启动计数器，就能控制PWM了</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/webp/62618266/1765864778226-96e52480-d8ce-4353-b361-9443f2b8c1e8.webp)

<font style="color:rgb(47, 50, 56);">这四个函数用于配置输出比较模块，OC（Output Compare），初始化输出比较单元（通道），不同通道对应的GPIO口不同，根据自己需要配置。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/webp/62618266/1765864778317-9c52d514-e18a-4090-b827-f84b6bf4177a.webp)

<font style="color:rgb(47, 50, 56);">单独设置输出比较极性。带N的是高级定时器里互补通道的设置，4没有。这里和结构体初始化作用是一样的，只不过结构体是整体初始化，这里可以单独修改极性。</font>

<font style="color:rgb(47, 50, 56);">一般来说，有结构体的配置函数都会对应一个单独配置的函数</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/webp/62618266/1765864778399-68a94a73-caa6-4e62-a152-6232727c8b20.webp)

<font style="color:rgb(47, 50, 56);">上面是单独修改输出使能参数的；SelectOC，单独修改输出比较模式的函数；下面单独修改CCR寄存器的值的函数，更改占空比</font>

#### 代码
```c
void PWM_Init(void)
{
    //1、开启TIMx和GPIOx的时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); //开启TIM2时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);//开启GPIOA时钟

    //2、配置GPIOx的引脚为复用推挽输出
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0; //PA0,因为TIM2_CH1对应PA0
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP; //复用推挽输出
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //3、配置TIMx的相关参数
    TIM_InternalClockConfig(TIM2); //选择内部时钟作为计数器时钟源
    TIM_TimeBaseInitTypeDef TIM_TimeBaseStructure;
    TIM_TimeBaseStructure.TIM_Period = 100-1; //自动重装载寄存ARR的值
    TIM_TimeBaseStructure.TIM_Prescaler = 720-1; //预分频器PSC的值
    TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1; //时钟分割
    TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up; //向上计数模式
    TIM_TimeBaseStructure.TIM_RepetitionCounter = 0; //重复计数器
    TIM_TimeBaseInit(TIM2, &TIM_TimeBaseStructure);

    //4 配置OC输出比较单元
    TIM_OCInitTypeDef TIM_OCInitStructure;
    TIM_OCStructInit(&TIM_OCInitStructure); //初始化结构体，给默认值
    TIM_OCInitStructure.TIM_OCMode = TIM_OCMode_PWM1; //PWM模式1
    TIM_OCInitStructure.TIM_OutputState = TIM_OutputState_Enable; //比较输出使能
    TIM_OCInitStructure.TIM_Pulse =0; //比较寄存器CCR的值
    TIM_OCInitStructure.TIM_OCPolarity = TIM_OCPolarity_High; //极性选择:高电平有效
    TIM_OC1Init(TIM2, &TIM_OCInitStructure); //初始化OC1

    //5、使能定时器
    TIM_Cmd(TIM2, ENABLE);
}

```

```c
void PWM_SetCompare1(uint16_t Compare)
{
    TIM_SetCompare1(TIM2, Compare);//通过设置比较寄存器CCR的值来改变占空比
}
```

```c
//不想用PA0作为PWM输出，可以用AFIO重映射功能把TIM2_CH1映射到其他引脚（看数据手册）
void PWM_AFIO_Init(void) 
{
    //1.、开启TIMx、GPIOx的时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); //开启TIM2时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);//开启GPIOA时钟
    
    //2. 配置AFIO的重映射功能
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);//开启AFIO时钟
    GPIO_PinRemapConfig(GPIO_PartialRemap1_TIM2, ENABLE); //使用部分重映射1的方式，把TIM2_CH1映射到PA15
    GPIO_PinRemapConfig(GPIO_Remap_SWJ_JTAGDisable, ENABLE); //禁用JTAG，释放PA15

    //3、配置GPIOx的引脚为复用推挽输出
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_15; //PA15,因为TIM2_CH1对应PA15（部分重映射1）
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP; //复用推挽输出
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //4、配置TIMx的相关参数
    TIM_InternalClockConfig(TIM2); //选择内部时钟作为计数器时
    TIM_TimeBaseInitTypeDef TIM_TimeBaseStructure;
    TIM_TimeBaseStructure.TIM_Period = 100-1; //自动重装载
    TIM_TimeBaseStructure.TIM_Prescaler = 720-1; //预分频器PSC的值
    TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1; //时钟
    TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up; //向上计数模式
    TIM_TimeBaseStructure.TIM_RepetitionCounter = 0; //重复计数器
    TIM_TimeBaseInit(TIM2, &TIM_TimeBaseStructure);

    //5 配置OC输出比较单元
    TIM_OCInitTypeDef TIM_OCInitStructure;
    TIM_OCStructInit(&TIM_OCInitStructure); //初始化结构体，给默认值
    TIM_OCInitStructure.TIM_OCMode = TIM_OCMode_PWM1; //PWM模式1
    TIM_OCInitStructure.TIM_OutputState = TIM_OutputState_Enable; //比较输出使能
    TIM_OCInitStructure.TIM_Pulse =0; //比较寄存器CCR的值
    TIM_OCInitStructure.TIM_OCPolarity = TIM_OCPolarity_High; //极性选择:高电平有效
    TIM_OC1Init(TIM2, &TIM_OCInitStructure); //初始化OC1

    //6、使能定时器
    TIM_Cmd(TIM2, ENABLE);
}
```

### TIM输入捕获
#### 概念
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765869184608-a8074ac7-ba5e-477b-93a7-2a1b871ac01b.png)

**输入电平跳变时，把CNT的值读出来写入CCR中**

#### <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765869249504-963918ae-efe8-43b4-9036-df5c955791cb.png)
同一个通道不能既做输入捕获又做输出比较

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765869772828-da0985f9-f943-4357-9875-3d1b329e5a7a.png)

<font style="color:rgb(47, 50, 56);">测频法：适合测量频率高的。自带均值滤波，闸门时间自己设置，时间到了最后才得到的是这一段时间的平均频率，更新慢，值比较平滑</font>

<font style="color:rgb(47, 50, 56);">测周法：适合测量频率较低的。只测量一个周期，一般波的频率都是几千Hz，所以测周法更新快</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765870338165-ed5bb1d2-2dfc-4c2b-9b14-9ec06f01ce4d.png)  
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765870348723-9addd954-ad5c-4ad5-bfcc-07ac0a090766.png)

主模式通过TRGO输出信号去给其他外设（也包括自己，级联），从模式需要选择一个触发源作为信号输入来执行相应操作

#### 输入捕获基本结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765870667089-1e011359-97b3-4db8-8f85-0e13bdce8656.png)

通过CCR的值就可以算出频率了

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765870883130-1be43f7f-0b8c-4c6c-94a2-13db62f83391.png)

通过CCR2/CCR1就可以知道占空比了

#### 代码
```c
void IC_Init(void)
{
    //1. 开启TIMx和GPIOx的时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE); //开启TIM3时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);//开启GPIOA时钟

    //2. 配置GPIOx的引脚为浮空输入
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6; //PA6,因为TIM3_CH1对应PA6
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING; //浮空输入
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //3. 配置TIMx的相关参数：时基单元
    TIM_InternalClockConfig(TIM3); //选择内部时钟作为计数器时钟源
    TIM_TimeBaseInitTypeDef TIM_TimeBaseStructure;
    TIM_TimeBaseStructure.TIM_Period = 0xFFFF; //自动重装载寄存器ARR的值,最大值
    TIM_TimeBaseStructure.TIM_Prescaler = 72-1; //预分频器PSC的值，假设系统时钟为72MHz，则计数器时钟为1MHz
    TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1; //1分频
    TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up; //向上计数模式
    TIM_TimeBaseStructure.TIM_RepetitionCounter = 0; //重复计数器
    TIM_TimeBaseInit(TIM3, &TIM_TimeBaseStructure);

    //4. 配置输入捕获参数
    TIM_ICInitTypeDef TIM_ICInitStructure;
    TIM_ICStructInit(&TIM_ICInitStructure); //初始化结构体，给默认值
    TIM_ICInitStructure.TIM_Channel = TIM_Channel_1; //通道1
    TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿捕获
    TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //直连通道，InDirectTI为交叉连接通道
    TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1; //不分频,即每个捕获事件都计入，若设置为DIV2，则每2个捕获事件计入1次
    TIM_ICInitStructure.TIM_ICFilter = 0xF; //输入捕获滤波器，0x0~0xF，滤波器越大，抗干扰能力越强，但响应时间越慢
    TIM_ICInit(TIM3, &TIM_ICInitStructure);

    //5、配置TRGIG输入触发源为TI1FP1
    TIM_SelectInputTrigger(TIM3, TIM_TS_TI1FP1);

    //6、配置从模式为复位模式
    TIM_SelectSlaveMode(TIM3, TIM_SlaveMode_Reset);

    //7、使能定时器
    TIM_Cmd(TIM3, ENABLE);
}
```

```c
uint32_t IC_GetFreq(void)
{
    uint32_t fx = 72000000/72; //假设系统时钟为72MHz，预分频器PSC设置为72-1，则计数器时钟为1MHz，即每个计数周期为1微秒
    uint32_t capture1 = TIM_GetCapture1(TIM3); //读取第一次捕获的值
    return fx / (capture1+1); //计算频率，单位Hz
}
```



```c
void IC_Init(void)
{
    //1. 开启TIMx和GPIOx的时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE); //开启TIM3时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);//开启GPIOA时钟

    //2. 配置GPIOx的引脚为浮空输入
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6; //PA6,因为TIM3_CH1对应PA6
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING; //浮空输入
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //3. 配置TIMx的相关参数：时基单元
    TIM_InternalClockConfig(TIM3); //选择内部时钟作为计数器时钟源
    TIM_TimeBaseInitTypeDef TIM_TimeBaseStructure;
    TIM_TimeBaseStructure.TIM_Period = 0xFFFF; //自动重装载寄存器ARR的值,最大值
    TIM_TimeBaseStructure.TIM_Prescaler = 72-1; //预分频器PSC的值，假设系统时钟为72MHz，则计数器时钟为1MHz
    TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1; //1分频
    TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up; //向上计数模式
    TIM_TimeBaseStructure.TIM_RepetitionCounter = 0; //重复计数器
    TIM_TimeBaseInit(TIM3, &TIM_TimeBaseStructure);

    //4. 配置输入捕获1
    TIM_ICInitTypeDef TIM_ICInitStructure;
    TIM_ICStructInit(&TIM_ICInitStructure); //初始化结构体，给默认值
    TIM_ICInitStructure.TIM_Channel = TIM_Channel_1; //通道1
    TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿捕获
    TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //直连通道，InDirectTI为交叉连接通道
    TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1; //不分频,即每个捕获事件都计入，若设置为DIV2，则每2个捕获事件计入1次
    TIM_ICInitStructure.TIM_ICFilter = 0xF; //输入捕获滤波器，0x0~0xF，滤波器越大，抗干扰能力越强，但响应时间越慢
    TIM_ICInit(TIM3, &TIM_ICInitStructure); //初始化TIM3的输入捕获1

    //5. 配置输入捕获2
    TIM_ICInitStructure.TIM_Channel = TIM_Channel_2; //通道2
    TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Falling; //下降沿捕获
    TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_IndirectTI; //直连通道，InDirectTI为交叉连接通道
    TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1; //不分频,即每个捕获事件都计入，若设置为DIV2，则每2个捕获事件计入1次
    TIM_ICInitStructure.TIM_ICFilter = 0xF; //输入捕获滤波器，0x0~0xF，滤波器越大，抗干扰能力越强，但响应时间越慢
    TIM_ICInit(TIM3, &TIM_ICInitStructure); //初始化TIM3的输入捕获2
	//等价于下面这句
    //TIM_PWMIConfig(TIM3, &TIM_ICInitStructure); //配置TIM3为PWM输入模式,他会自动配置另一个通道为相反的边沿捕获，即上述代码
    
    //6、配置TRGIG输入触发源为TI1FP1
    TIM_SelectInputTrigger(TIM3, TIM_TS_TI1FP1);

    //7、配置从模式为复位模式
    TIM_SelectSlaveMode(TIM3, TIM_SlaveMode_Reset);

    //8、使能定时器
    TIM_Cmd(TIM3, ENABLE);
}
```

```c
//获取占空比函数，返回值为百分比，范围0~100
uint32_t IC_GetDutyCycle(void)
{
    uint32_t capture1 = TIM_GetCapture1(TIM3); //读取第一次捕获的值
    uint32_t capture2 = TIM_GetCapture2(TIM3); //读取第二次捕获的值
    if(capture1 == 0) return 0; //防止除以0
    return ((capture2+1) * 100) / (capture1+1); //计算占空比，单位%
}
```

### TIM编码器
#### 概念
+ Encoder Interface 编码器接口
+ 编码器接口可接收增量（正交）编码器的信号，根据编码器旋转产生的正交信号脉冲，自动控制CNT自增或自减，从而指示编码器的位置、旋转方向和旋转速度
+ 每个高级定时器和通用定时器都拥有1个编码器接口
+ 两个输入引脚借用了输入捕获的通道1和通道2

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765877487240-ac6f91cb-580e-4028-9cdd-faa55e0a27fc.png)

<font style="color:rgb(47, 50, 56);">如何判断正转反转：按照某一相在边沿对应另一相的电平判断即可</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765877462235-b1917b0b-0643-498c-af69-621ee4ba787e.png)  
 <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765877631004-4c73a22c-1a5b-4105-8a8a-86eb3115f8a7.png)

> <font style="color:#DF2A3F;">在编码器的模式下，这个极性选择不再是设置捕获高低电平了，而是是否将输入信号反相</font>
>

#### 代码
```c
void Encoder_Init(void)
{
    //1.开启TIMx和GPIO时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

    //2.配置GPIO
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6 | GPIO_Pin_7; //PA6->TIM3_CH1 PA7->TIM3_CH2
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING; //浮空输入
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //3.配置时基单元
    TIM_TimeBaseInitTypeDef TIM_TimeBaseStructure;
    TIM_TimeBaseStructure.TIM_Period = 0xFFFF; //ARR为0xFFFF
    TIM_TimeBaseStructure.TIM_Prescaler = 0; //PSC为0
    TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1; //时钟分频因子为1
    TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up; //向上计数模式
    TIM_TimeBaseStructure.TIM_RepetitionCounter = 0; //重复计数器不使用
    TIM_TimeBaseInit(TIM3, &TIM_TimeBaseStructure);

    //4.输入捕获单元的滤波器和极性配置
    TIM_ICInitTypeDef TIM_ICInitStructure;
    TIM_ICStructInit(&TIM_ICInitStructure); //初始化结构体
    //TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //极性不反转，并不代表上升沿捕获
    TIM_ICInitStructure.TIM_Channel = TIM_Channel_1; //通道1
    TIM_ICInitStructure.TIM_ICFilter = 0xF; //滤波器最大值
    TIM_ICInit(TIM3, &TIM_ICInitStructure); //初始化通道1

    TIM_ICInitStructure.TIM_Channel = TIM_Channel_2; //通道2
    TIM_ICInitStructure.TIM_ICFilter = 0xF; //滤波器最大值
    //TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //极性不反转，并不代表上升沿捕获
    TIM_ICInit(TIM3, &TIM_ICInitStructure); //初始化通道2

    //5.配置编码器接口
    TIM_EncoderInterfaceConfig(TIM3, TIM_EncoderMode_TI12, TIM_ICPolarity_Rising, TIM_ICPolarity_Rising);
    //表示TI1和TI2都计数，且极性不反转（这里也可以配置极性哦）

    //6.使能定时器
   
```

```c
uint16_t Encoder_Get(void)
{
    int16_t Temp = TIM_GetCounter(TIM3);
    TIM_SetCounter(TIM3, 0); //读完清零
    return Temp;
}

void TIM2_IRQHandler(void)
{
    if (TIM_GetITStatus(TIM2, TIM_IT_Update) != RESET) //溢出中断
    {
        //在这里处理定时器2的溢出中断事件
        Speed = Encoder_Get(); //获取编码器计数值作为速度值
    
        TIM_ClearITPendingBit(TIM2, TIM_IT_Update); //清除中断标志位
    }
}
```

### ADC
#### 概念
1. ADC（Analog-Digital Converter）模拟-数字转换器
2. ADC可以将引脚上连续变化的模拟电压转换为内存中存储的数字变量，建立模拟电路到数字电路的桥梁12位逐次逼近型ADC，1us转换时间
3. **输入电压范围：0~3.3V，转换结果范围：0~4095**
4. 18个输入通道，可测量16个外部和2个内部信号源
5. 规则组和注入组两个转换单元：<font style="color:rgb(47, 50, 56);">规则组和注入组：是stm32的高级功能，一般的AD是读取一个，转化一个。而stm32是列了一个组，读取时可以读一个组的数据并进行转化。规则组用于常规转化，注入组用于突发事件</font>
6. 模拟看门狗自动监测输入电压范围
7.   STM32F103C8T6 ADC资源：ADC1、ADC2，10个外部输入通道
8. <font style="color:rgb(47, 50, 56);">Vref：DAC的参考电压，也决定了ADC的输入范围。 它和VCCGND通常接在一起，所以ADC输入范围就和外部供电电压相同</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765938773550-6d3cc201-83d9-4652-a60d-1eaa1f8f5b29.png)

<font style="color:rgb(47, 50, 56);">地址锁存和译码给三个数据选择通道输入数据，通过比较二分逼近求出对应通道电压值对应的ADC数据</font>

#### <font style="color:rgb(47, 50, 56);">STM32的ADC结构</font>
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765939795318-3626dddd-1f89-4383-b1fb-6252f3e8b877.png)

**注入组：可以一次性选择4个通道**

**<font style="color:rgb(47, 50, 56);">规则组：可以一次性选择16个通道</font>**<font style="color:rgb(47, 50, 56);">，但</font>**<font style="color:rgb(47, 50, 56);">只有1个数据寄存器</font>**<font style="color:rgb(47, 50, 56);">，那么你虽然点了16个菜，但是前15个都会被挤掉，只剩第16个菜。所以如果是用这个菜单，最好</font>**<font style="color:rgb(47, 50, 56);">配合DMA来转运数据</font>**

<font style="color:rgb(47, 50, 56);">ADCCLK：来自于RCC的时钟，这个时钟预分频器比较难受，他有2，4，6，8分频，但是2和4分频后都超出了ADC的14MHz。所以预分频器只能用6和8分频</font>

<font style="color:rgb(47, 50, 56);">EOC是规则组转换完成的信号，转换完成后会在寄存器里置一个标志位，读取标志位，就知道转换是否结束</font>

<font style="color:rgb(47, 50, 56);">触发控制：软件触发（给命令）or硬件触发（触发源主要是定时器，还有定时器的主模式输出）</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765939735597-faae7b45-91b8-412e-a3e2-65e43257d7f2.png)<font style="color:rgb(47, 50, 56);">模拟看门狗：如果电压超出了看门狗中设置的阈值电压范围，那么看门狗就会乱叫，并申请到NVIC更新中断，如果去NVIC的通道，那就会触发中断</font>  
 <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765939972366-e921ffd4-a1c0-45aa-80ba-90361ee173db.png)

#### 转换模式
单次/连续转换：转换完一次后，是否自动进行下一次转换

非扫描/扫描模式：是否可以选择一系列通道（初始化要给出通道数目，为了防止转换结果被覆盖，需配合DMA使用）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765940970876-4fe2a85b-1d97-48e9-a602-d491ae7b025d.png)

触发源：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765941025726-6db614dd-e72f-4747-b71d-8c319e1bcac0.png)

数据对齐：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765941133122-4b938acf-e87b-4b1f-b740-7bc0fc54eed2.png)

#### 代码
1. AD单通道

```c
void AD_Init(void)  //使用PA0作为模拟输入通道进行单次非扫描转换
{
    //1. 开启ADC和GPIOA的时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1 | RCC_APB2Periph_GPIOA, ENABLE);

    //2. 配置ADDCLK
    RCC_ADCCLKConfig(RCC_PCLK2_Div6); // 72MHz/6 = 12MHz < 14MHz

    //3. 配置GPIOA的引脚为模拟输入模式
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0; // PA0
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AIN; // 模拟输入模式   
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; // 速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //4. 配置规则转换通道
    ADC_RegularChannelConfig(ADC1, ADC_Channel_0, 1, ADC_SampleTime_55Cycles5); // 在序列1接入通道0，采样时间55.5周期


    //5. 配置ADC工作模式
    ADC_InitTypeDef ADC_InitStructure;
    ADC_InitStructure.ADC_Mode = ADC_Mode_Independent; // 独立模式
    ADC_InitStructure.ADC_DataAlign = ADC_DataAlign_Right; // 右对齐
    ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None; //不使用外部触发源，即软件触发
    ADC_InitStructure.ADC_ContinuousConvMode = DISABLE; // 单次模式
    ADC_InitStructure.ADC_ScanConvMode = DISABLE; // 非扫描模式
    ADC_InitStructure.ADC_NbrOfChannel = 1; // 转换1个通道
    ADC_Init(ADC1, &ADC_InitStructure);

    //6. 使能ADC
    ADC_Cmd(ADC1, ENABLE);

    //7. 校准
    ADC_ResetCalibration(ADC1);//复位校准寄存器
    while(ADC_GetResetCalibrationStatus(ADC1)); //等待校准复位完成
    ADC_StartCalibration(ADC1); //开始校准
    while(ADC_GetCalibrationStatus(ADC1));
}
```

```c
uint16_t AD_Read(void)
{
    uint16_t value = 0;
    //1. 软件触发转换
    ADC_SoftwareStartConvCmd(ADC1, ENABLE);

    //2. 查看EOC标志位，来看转换是否完成
    while(ADC_GetFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);

    //3. 读取转换结果
    value = ADC_GetConversionValue(ADC1);

    return value;
}

```

```c
void AD_Init_Continuous(void)  //使用PA0作为模拟输入通道进行连续非扫描转换
{
    //1. 开启ADC和GPIOA的时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1 | RCC_APB2Periph_GPIOA, ENABLE);

    //2. 配置ADDCLK
    RCC_ADCCLKConfig(RCC_PCLK2_Div6); // 72MHz/6 = 12MHz < 14MHz

    //3. 配置GPIOA的引脚为模拟输入模式
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0; // PA0
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AIN; // 模拟输入模式   
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; // 速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //4. 配置规则转换通道
    ADC_RegularChannelConfig(ADC1, ADC_Channel_0, 1, ADC_SampleTime_55Cycles5); // 在序列1接入通道0，采样时间55.5周期


    //5. 配置ADC工作模式
    ADC_InitTypeDef ADC_InitStructure;
    ADC_InitStructure.ADC_Mode = ADC_Mode_Independent; // 独立模式
    ADC_InitStructure.ADC_DataAlign = ADC_DataAlign_Right; // 右对齐
    ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None; //不使用外部触发源，即软件触发
    ADC_InitStructure.ADC_ContinuousConvMode = ENABLE; // 连续模式
    ADC_InitStructure.ADC_ScanConvMode = DISABLE; // 非扫描模式
    ADC_InitStructure.ADC_NbrOfChannel = 1; // 转换1个通道
    ADC_Init(ADC1, &ADC_InitStructure);

    //6. 使能ADC
    ADC_Cmd(ADC1, ENABLE);

    //7. 校准
    ADC_ResetCalibration(ADC1);//复位校准寄存器
    while(ADC_GetResetCalibrationStatus(ADC1)); //等待校准复位完成
    ADC_StartCalibration(ADC1); //开始校准
    while(ADC_GetCalibrationStatus(ADC1));

    //8. 软件触发第一次转换
    ADC_SoftwareStartConvCmd(ADC1, ENABLE);

}
```

```c
uint16_t AD_Read_Continuous(void)
{
    uint16_t value = 0;

    //查看EOC标志位，来看转换是否完成
    while(ADC_GetFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);

    //读取转换结果
    value = ADC_GetConversionValue(ADC1);

    return value;
}
```

### DMA
#### 概念
+ DMA（Direct Memory Access）直接存储器存取
+ DMA可以提供外设和存储器或者存储器和存储器之间的高速数据传输，无须CPU干预，节省了CPU的资源
+ 12个独立可配置的通道： DMA1（7个通道）， DMA2（5个通道）
+ 每个通道都支持软件触发和特定的硬件触发

> 存储器->存储器：一般使用软件触发 
>
> 外设->存储器：一般使用硬件触发
>

+ STM32F103C8T6 DMA资源：DMA1（7个通道）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765954778136-296aa060-05c5-4c3d-919a-b72fb3d10d0d.png)

#### DMA基本结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765955203885-fe39a828-0552-42ad-8f34-3b506ee015c4.png)

<font style="color:rgb(47, 50, 56);">DMA：有多个通道，需要通过仲裁器配置通道转运数据的优先级 DMA是其他外设的主动单元，同时由于AHB是DMA的寄存器，所以DMA是AHB的被动单元 </font>

<font style="color:rgb(47, 50, 56);">DMA请求是其他外设需要转运数据时发出的，相当于硬件的转运信号</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1765955622247-a2ab5da7-61c6-47af-98f1-c61f925614bd.png)

> 在设置源、目的端的数据宽度时：
>
> 1. 源=目的，那就正常写过去
> 2. 源<目的，目的对应的高位补0
> 3. 源>目的，源的高位舍弃
>

#### 代码
1. 内存到内存传输

```c
void M2M_DMA_Init(uint32_t periph_addr, uint32_t mem_addr, uint16_t data_length)  //内存到内存DMA
{ 

    // 1、 开启DMA1时钟
    RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);

    // 2、 复位DMA1通道1
    DMA_DeInit(DMA1_Channel1);


    // 3、 配置DMA1通道1
    DMA_InitTypeDef DMA_InitStructure;
    // Configure DMA1 Channel1
    DMA_InitStructure.DMA_PeripheralBaseAddr = periph_addr; //设置外设地址
    DMA_InitStructure.DMA_MemoryBaseAddr = mem_addr;        // 设置内存地址
    DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralSRC;      // 设置传输方向：外设到内存
    DMA_InitStructure.DMA_BufferSize = data_length;         // 数据长度
    DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Enable; // 外设地址递增使能
    DMA_InitStructure.DMA_MemoryInc = DMA_MemoryInc_Enable;          // 内存地址递增使能
    DMA_InitStructure.DMA_PeripheralDataSize = DMA_PeripheralDataSize_HalfWord; // 外设数据大小：半字
    DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_HalfWord;           // 内存数据大小：半字
    DMA_InitStructure.DMA_Mode = DMA_Mode_Normal;            // 普通模式
    DMA_InitStructure.DMA_Priority = DMA_Priority_High;      // 高优先级
    DMA_InitStructure.DMA_M2M = DMA_M2M_Enable;            // 内存到内存传输模式，即软件触发模式
    DMA_Init(DMA1_Channel1, &DMA_InitStructure);

    // 4、 使能DMA1通道1
    DMA_Cmd(DMA1_Channel1, ENABLE);
}
```

2. ADC作为外设来讲转换结果通过DMA传输

```c
#include "stm32f10x.h"                  // Device header
uint16_t AD_Value[4] = {0}; // 用于存放ADC转换结果的数组（全局定义）
void AD_Init(void)  //使用PA0、1、2、3作为模拟输入通道进行依次的单次非扫描转换
{
    //1. 开启ADC和GPIOA、DMA的时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1 | RCC_APB2Periph_GPIOA, ENABLE);
    RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);

    //2. 配置ADDCLK
    RCC_ADCCLKConfig(RCC_PCLK2_Div6); // 72MHz/6 = 12MHz < 14MHz

    //3. 配置GPIOA的引脚为模拟输入模式
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1 | GPIO_Pin_2 | GPIO_Pin_3; // PA0, PA1, PA2, PA3
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AIN; // 模拟输入模式   
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; // 速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //4. 配置规则组ADC通道
    ADC_RegularChannelConfig(ADC1, ADC_Channel_0, 1, ADC_SampleTime_55Cycles5); // 通道，序列号，采样时间
    ADC_RegularChannelConfig(ADC1, ADC_Channel_1, 2, ADC_SampleTime_55Cycles5); // 通道，序列号，采样时间
    ADC_RegularChannelConfig(ADC1, ADC_Channel_2, 3, ADC_SampleTime_55Cycles5); // 通道，序列号，采样时间
    ADC_RegularChannelConfig(ADC1, ADC_Channel_3, 4, ADC_SampleTime_55Cycles5); // 通道，序列号，采样时间


    //4. 配置ADC工作模式
    ADC_InitTypeDef ADC_InitStructure;
    ADC_InitStructure.ADC_Mode = ADC_Mode_Independent; // 独立模式
    ADC_InitStructure.ADC_DataAlign = ADC_DataAlign_Right; // 右对齐
    ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None; //不使用外部触发源，即软件触发
    ADC_InitStructure.ADC_ContinuousConvMode = ENABLE; // 连续模式
    ADC_InitStructure.ADC_ScanConvMode = ENABLE; // 扫描模式
    ADC_InitStructure.ADC_NbrOfChannel = 4; // 转换4个通道
    ADC_Init(ADC1, &ADC_InitStructure);

    //5. 配置DMA
    DMA_InitTypeDef DMA_InitStructure;
    DMA_InitStructure.DMA_PeripheralBaseAddr = (uint32_t)&ADC1->DR; // 外设地址，ADC数据寄存器地址
    DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Disable; // 外设地址不变
    DMA_InitStructure.DMA_PeripheralDataSize = DMA_PeripheralDataSize_HalfWord; // 外设数据宽度16位 
    DMA_InitStructure.DMA_MemoryBaseAddr = (uint32_t)AD_Value; // 存放数据的数组地址
    DMA_InitStructure.DMA_MemoryInc = DMA_MemoryInc_Enable; // 存放数据的数组地址递增
    DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_HalfWord; // 存放数据的数组数据宽度16位
    DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralSRC; // 外设到内存
    DMA_InitStructure.DMA_BufferSize = 4; // 存放4个数据
    DMA_InitStructure.DMA_Mode = DMA_Mode_Circular; // 非循环模式
    DMA_InitStructure.DMA_Priority = DMA_Priority_Medium; // 中优先级
    DMA_InitStructure.DMA_M2M = DMA_M2M_Disable; // 非内存到内存传输
    DMA_Init(DMA1_Channel1, &DMA_InitStructure);  //因为ADC1对应DMA1的通道1

    //5. 使能ADC、DMA和ADC的DMA请求
    DMA_Cmd(DMA1_Channel1, ENABLE); //使能DMA通道
    ADC_Cmd(ADC1, ENABLE); //使能ADC1
    ADC_DMACmd(ADC1, ENABLE); //使能ADC1的DMA请求

    //6. 校准
    ADC_ResetCalibration(ADC1);//复位校准寄存器
    while(ADC_GetResetCalibrationStatus(ADC1)); //等待校准复位完成
    ADC_StartCalibration(ADC1); //开始校准
    while(ADC_GetCalibrationStatus(ADC1));

}


void AD_Start(void) //触发ADC转换，使用DMA传输数据
{
    DMA_Cmd(DMA1_Channel1, DISABLE); //先关闭DMA通道
    DMA_SetCurrDataCounter(DMA1_Channel1, 4); //设置DMA传输数据个数
    DMA_Cmd(DMA1_Channel1, ENABLE); //使能DMA通道

    ADC_SoftwareStartConvCmd(ADC1, ENABLE); //启动ADC转换

    while(DMA_GetFlagStatus(DMA1_FLAG_TC1) == RESET); //等待DMA传输完成
    DMA_ClearFlag(DMA1_FLAG_TC1); //清除DMA传输完成标志
}
```

若为ADC单次模式+DMA普通模式，则主程序需在While中频繁软件启动整个工作流程。

若ADC连续模式+DMA循环模式，则只需要启动一次，硬件电路就自动循环的把最新转换结果送出来了。



### USART
#### 概念
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766025218132-486ac8ea-aae5-4a12-992b-6defda64cf13.png)

**同步通信**：通信双方通过**共享时钟或固定时序**来对齐数据收发。  
**异步通信**：通信双方**不共享时钟**，通过**起始位/停止位等标志**来识别数据。  



**单端信号**：用**一根信号线对地**来表示信号电平。因此需要共地  
**差分信号**：用**两根互为反相的信号线**，通过它们的**电压差**来表示信号。   

#### 硬件电路
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766025655882-54dfa7e3-ed34-4b16-9f7d-df567d9e462e.png)

+ 简单双向串口通信有两根通信线（发送端TX和接收端RX）
+ TX与RX要交叉连接
+ 当只需单向的数据传输时，可以只接一根通信线
+ 当电平标准不一致时，需要加电平转换芯片
+ <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766025748858-3cb17dcb-f828-4424-b2f2-6fad38e7dc56.png)



<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766026083437-e98813f4-8bd8-47a7-9b14-58811daf36b7.png)

+ 波特率：串口通信的速率
+ 起始位：标志一个数据帧的开始，固定为低电平
+ 数据位：数据帧的有效载荷，1为高电平，0为低电平，低位先行
+ 校验位：用于数据验证，根据数据位计算得来
+ 停止位：用于数据帧间隔，固定为高电平

发送端TX引脚输出定时翻转的高低电平，接收端RX引脚定时接收高低电平，

每个字节加上起始位、停止位和选择校验位，打包成数据帧，依次输出在TX引脚，另一端RX引脚依次接收

#### STM32 USART外设
+ USART（Universal Synchronous/Asynchronous Receiver/Transmitter）通用同步/异步收发器
+ USART是STM32内部集成的硬件外设，可根据数据寄存器的一个字节数据自动生成数据帧时序，从TX引脚发送出去，也可自动接收RX引脚的数据帧时序，拼接为一个字节数据，存放在数据寄存器里
+ 自带波特率发生器，最高达4.5Mbits/s
+ 可配置数据位长度（8/9）、停止位长度（0.5/1/1.5/2）
+ 可选校验位（无校验/奇校验/偶校验）
+ 支持同步模式、硬件流控制、DMA、智能卡、IrDA、LIN
+ STM32F103C8T6 USART资源： USART1、 USART2、 USART3

>  硬件流控制通过 RTS / CTS 硬件信号线，自动控制发送节奏，防止接收方缓冲区溢出。  
>

#### USART框图
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766027158890-3932e4ea-5034-43e0-afd4-3436d23790a9.png)

TX接发送数据寄存器TDR（只写）

RX接接收数据寄存器RDR（只读）

**USART 发送时**：CPU/DMA 先把并行数据写入发送数据寄存器（TDR），当移位寄存器空闲时硬件会自动把数据搬入移位寄存器并按起始位、数据位、校验位、停止位逐位从 TX 引脚发送；此时 DR 立刻变空并置位 TXE为1 允许写下一个字节，而只有当移位寄存器也完全发送结束时才置位 TC为1，表示真正的发送完成  

**USART 接收时**：RX 引脚上的串行比特流先由接收移位寄存器按时钟逐位移入并重组为并行数据，当一整帧（起始位、数据位、校验位、停止位）接收完成后，硬件自动把数据转存到接收数据寄存器（RDR），同时置位 RXNE 表示“有新数据可读”，若在 DR 未被及时读取前又收到新数据则会产生溢出错误（ORE）。  

**RTS/CTS **通过两根硬件信号线实现“接收端说能不能接、发送端听能不能发”，由 USART 硬件自动根据接收缓冲状态暂停或恢复发送。 

#### USART基本结构 
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766027997879-f6260da0-e8ba-4bd2-a795-77b9eaebdf8d.png)

波特率发生器：发送器和接收器的波特率由波特率寄存器BRR里的DIV确定

计算公式：波特率 = fPCLK2/1 / (16 * DIV)

#### 代码
1. 发送

```c
void Serial_Init(void)
{
    //1. 开启USART和GPIOA的时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1 | RCC_APB2Periph_GPIOA, ENABLE);


    //2. 配置GPIOA的9和10引脚
    //PA9 -> USART1_TX
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9; // USART1_TX
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;   
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP; // 复用推挽输出
    GPIO_Init(GPIOA, &GPIO_InitStructure);
    //PA10 -> USART1_RX
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10; // USART1_RX
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING; // 浮空输入   
    GPIO_Init(GPIOA, &GPIO_InitStructure);


    //3. 配置USART1
    USART_InitTypeDef USART_InitStructure;
    USART_InitStructure.USART_BaudRate = 9600; // 波特率9600
    USART_InitStructure.USART_WordLength = USART_WordLength_8b; // 8数据位
    USART_InitStructure.USART_StopBits = USART_StopBits_1; // 1停止位
    USART_InitStructure.USART_Parity = USART_Parity_No; // 无奇偶校验
    USART_InitStructure.USART_Mode = USART_Mode_Tx; // 发送模式
    USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None; // 无硬件流控制
    USART_Init(USART1, &USART_InitStructure);

    //4. 使能USART1
    USART_Cmd(USART1, ENABLE);

}  
```

```c
void Serial_SendByte(uint8_t byte)
{
    //发送一个字节,其实是将数据写入到USART的数据寄存器TDR
    USART_SendData(USART1, byte);
    //等待数据从TDR搬入到移位寄存器SR，以防止数据覆盖
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
}
```

2. 中断方式接收数据

```c
void Serial_Init(void)
{
    //1. 开启USART和GPIOA的时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1 | RCC_APB2Periph_GPIOA, ENABLE);


    //2. 配置GPIOA的9和10引脚
    //PA9 -> USART1_TX
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9; // USART1_TX
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;   
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP; // 复用推挽输出
    GPIO_Init(GPIOA, &GPIO_InitStructure);
    //PA10 -> USART1_RX
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10; // USART1_RX
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING; // 浮空输入   
    GPIO_Init(GPIOA, &GPIO_InitStructure);


    //3. 配置USART1
    USART_InitTypeDef USART_InitStructure;
    USART_InitStructure.USART_BaudRate = 9600; // 波特率9600
    USART_InitStructure.USART_WordLength = USART_WordLength_8b; // 8数据位
    USART_InitStructure.USART_StopBits = USART_StopBits_1; // 1停止位
    USART_InitStructure.USART_Parity = USART_Parity_No; // 无奇偶校验
    USART_InitStructure.USART_Mode = USART_Mode_Tx | USART_Mode_Rx; // 发送和接收模式
    USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None; // 无硬件流控制
    USART_Init(USART1, &USART_InitStructure);

    //4. 开启USART1中断
    USART_ITConfig(USART1, USART_IT_RXNE, ENABLE); // 使能接收中断

    //5. 配置NVIC中断(如果需要使用中断接收数据的话)
    NVIC_InitTypeDef NVIC_InitStructure;
    NVIC_InitStructure.NVIC_IRQChannel = USART1_IRQn; // USART1中断
    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0; // 抢占优先级0
    NVIC_InitStructure.NVIC_IRQChannelSubPriority = 0; // 子优先级0
    NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE; // 使能中断
    NVIC_Init(&NVIC_InitStructure);

    //6. 使能USART1
    USART_Cmd(USART1, ENABLE);

}  
```

```c
uint8_t Serial_GetRxFlag(void)
{
    if(Serial_RxFlag)
    {
        Serial_RxFlag = 0; // 清除标志
        return 1;
    }
    return 0;
}

uint8_t Serial_GetRxData(void)
{
    return Serial_RxData;
}


void USART1_IRQHandler(void)
{
    if (USART_GetITStatus(USART1, USART_IT_RXNE) != RESET)
    {
        //读取接收到的数据
        Serial_RxData = (uint8_t)USART_ReceiveData(USART1);
        Serial_RxFlag = 1; // 设置接收标志

        // 清除中断标志
        USART_ClearITPendingBit(USART1, USART_IT_RXNE);
    }
}
```

3. 收发数据包

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766040758142-c6533521-36ca-4373-8070-802b0c60341e.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766040780345-180839c1-9bc3-424a-80ea-eb692d4bae1f.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766041092733-aeecad67-1c2f-4c14-912d-2bd4fa5ce883.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766041102218-96ad7c8b-f6ba-4f72-920f-f2de78fa521e.png)

```c
void Serial_SendHexPacket(void)
{
    Serial_SendByte(0xFF); // 发送包头
    Serial_SendByte(Serial_TxPacket[0]);
    Serial_SendByte(Serial_TxPacket[1]);
    Serial_SendByte(Serial_TxPacket[2]);
    Serial_SendByte(Serial_TxPacket[3]);
    Serial_SendByte(0xFE); // 发送包尾
}

void USART1_IRQHandler(void)
{
    static uint8_t RxState = 0;
    static uint8_t RxIndex = 0;
    if (USART_GetITStatus(USART1, USART_IT_RXNE) != RESET)
    {
        if(RxState == 0)
        {
            uint8_t RxData = USART_ReceiveData(USART1);
            if (RxData == 0xFF) // 包头
            {
                RxState = 1; // 进入接收数据状态
                RxIndex = 0;
            }
        }
        else if(RxState == 1)
        {
            Serial_RxPacket[RxIndex++] = USART_ReceiveData(USART1);
            if (RxIndex >= 4)
            {
                RxState = 2; // 进入等待包尾状态
            }
        }
        else if(RxState == 2)
        {
            uint8_t RxData = USART_ReceiveData(USART1);
            if (RxData == 0xFE) // 包尾
            {
                Serial_RxFlag = 0; // 设置接收完成标志
                Serial_RxFlag = 1; //成功接收一个完整数据包
            }
        }
        // 清除中断标志
        USART_ClearITPendingBit(USART1, USART_IT_RXNE);
    }
}

```

```c
void USART1_IRQHandler(void)
{
    static uint8_t RxState = 0;
    static uint8_t RxIndex = 0;
    if (USART_GetITStatus(USART1, USART_IT_RXNE) != RESET)
    {
        if(RxState == 0)
        {
            uint8_t RxData = USART_ReceiveData(USART1);
            if (RxData == '@') // 包头
            {
                RxState = 1; // 进入接收数据状态
                RxIndex = 0;
                Serial_RxPacket[RxIndex] = '\0'; // 初始化字符串结束符
            }
        }
        else if(RxState == 1)
        {
            uint8_t RxData = USART_ReceiveData(USART1);
            if(RxData == '\r') // 数据部分结束符
            {
                RxState = 2; // 进入等待包尾状态
            }
            else
            {
                Serial_RxPacket[RxIndex++] = RxData; // 存储接收到的数据
            }
        }
        else if(RxState == 2)
        {
            uint8_t RxData = USART_ReceiveData(USART1);
            if (RxData == '\n') // 包尾
            {
                Serial_RxFlag = 1; // 设置接收完成标志
                RxState = 0; // 重置状态机
                Serial_RxPacket[RxIndex] = '\0'; // 添加字符串结束符
            }
        }
        // 清除中断标志
        USART_ClearITPendingBit(USART1, USART_IT_RXNE);
    }
}
```

### FlyMcu-串口下载程序
1. 让工程生成hex文件
    1. 勾选Create Hex File<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766045825368-82c5d6d0-2423-4d2d-a55c-709968b82bcc.png)
    2. 编译后就可以在工程目录的Objects目录下找到Hex文件了<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766045932693-9a53e25e-9d7d-4137-8b7c-fd8626655bf6.png)
2. 使用FlyMcu下载程序
    1. 搜索串口<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766046021561-39027afd-28e8-4fc9-a3b5-739d6d65567a.png)
    2. 打开对应的hex文件<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766046106213-3ac682dc-767f-4695-a82f-1d3f924b659b.png)
    3. 切换boot引脚，使其为boot1
    4. 点击开始编程，就可成功下载<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766046952084-9ae83404-932f-4e31-855b-c7d6c848e8b1.png)
3. 运行程序
    1. 切换为boot0
    2. 按一下Reset按键

### I2C通信
#### 概念
+ I2C（Inter IC Bus）是由Philips公司开发的一种通用数据总线
+ 两根通信线：SCL（Serial Clock）、SDA（Serial Data）
+ 同步，半双工
+ 带数据应答
+ 支持总线挂载多设备（一主多从、多主多从）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766112278853-91de4c37-8b8e-4e4e-aea0-0f6e16a64c53.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766112506994-03a4c93c-ec40-43ec-a6bb-9df74de5e4ee.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766112687047-290ebdfb-7231-443d-be5f-3b30a0fbd8dd.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766112864806-9de47b90-020b-414b-be89-10dc4169acc4.png)

SCL高电平时，读SDA数据。SCL低电平时，SDA准备数据。

<font style="color:#DF2A3F;">I2C是高位先行，而串口是低位先行</font>

#### 时序逻辑
1. 指定地址写

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766113322280-04f8676e-c719-4415-97dc-b6a6e694c29e.png)

开始后第一个字节是发送：从机设备地址（7位）+读/写位（1位）

之后一位是应答位Ack

再紧接着进入下一个字节的时序逻辑

一般第二个字节就是这个从机设备的寄存器地址

第三个字节就是要写入该寄存器的值了

2. 当前地址读（因为无法指定读的地址，用得不是很多）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766113823018-c1a400e1-313d-4685-b960-c2c4fc1262e5.png)

开始后第一个字节是发送：从机设备地址（7位）+读/写位（1位）

之后一位是应答位Ack

第二个字节开始由从机发送数据了（当前指针指示的寄存器）

3. 指定地址读

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766114014794-3469970a-c231-42ac-8fef-86205ef417a2.png)

开始后第一个字节是发送：从机设备地址（7位）+读/写位（1位）（这里为写）

之后一位是应答位Ack

第二个字节指定要写的寄存器地址

之后重新来一个起始标志位，再发一个字节变为对从机进行读

之后一个字节就是由从机发送指定地址的数据了

> 主机不想继续读，就需要接收后发一个非应答1，使从机交出SDA控制权，以避免无法生成停止标志位
>

#### MPU6050简介
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766114997943-9edb4043-e0d6-4e0f-83e9-d383c4f339db.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766115015026-e0d481d8-3c3a-483a-befa-849d99c7cc80.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766115793107-cc9c0f41-0667-4a09-9ef5-20b4ddb0e78f.png)

#### I2C硬件外设
+ STM32内部集成了硬件I2C收发电路，可以由硬件自动执行时钟生成、起始终止条件生成、应答位收发、数据收发等功能，减轻CPU的负担
+ 支持多主机模型
+ 支持7位/10位地址模式
+ 支持不同的通讯速度，标准速度(高达100 kHz)，快速(高达400 kHz)
+ 支持DMA
+ 兼容SMBus协议S
+ TM32F103C8T6 硬件I2C资源：I2C1、I2C2

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766127885575-2d19a2bc-8111-4609-9e49-90379ac28a0c.png)

当要发送数据时，把数据写入DR，DR中的值会转到移位寄存器中进行发送

接收数据时，输入的数据一位一位的进入移位寄存器，当1个字节数据收齐后，数据从移位寄存器转到数据寄存器，同时置标志位RXNE，表示接收寄存器非空，这时就可以把读数据了

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766128593698-18fc7ff5-ce38-42cf-866e-8f8d9d10bba2.png)

左移，所以是高位先移出去

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766129048300-dac40734-5a35-4c2b-b0f1-86e9876dd95e.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766130369493-e7c54c45-a52a-4e13-bba3-84b6ff1dcc12.png)

#### 代码
1. 软件I2C

```c
void myI2C_Init(void){  //软件I2C初始化，即用GPIO模拟I2C
    //1. 使能GPIOB时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);

    //2. 配置PB10和PB11为开漏输出
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10 | GPIO_Pin_11; //SCL和SDA
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_OD; //开漏输出
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; //速度50MHz
    GPIO_Init(GPIOB, &GPIO_InitStructure);

    //3. 初始化时，拉高SCL和SDA
    GPIO_SetBits(GPIOB, GPIO_Pin_10 | GPIO_Pin_11);
}
```

```c
void MyI2C_W_SCL(uint8_t BitValue)
{
    GPIO_WriteBit(GPIOB, GPIO_Pin_10, (BitAction)BitValue);
    Delay_us(10);
}

void MyI2C_W_SDA(uint8_t BitValue)
{
    GPIO_WriteBit(GPIOB, GPIO_Pin_11, (BitAction)BitValue);
    Delay_us(10);
}

uint8_t MyI2C_R_SDA(void)
{
    uint8_t BitValue;
    BitValue = GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_11);
    Delay_us(10);
    return BitValue;
}
```

```c
void MyI2C_Start(void){
    //1. 拉高SCL和SDA
    MyI2C_W_SDA(1);
    MyI2C_W_SCL(1);

    //2. 拉低SDA，此时SCL保持高电平，表示I2C开始信号
    MyI2C_W_SDA(0);

    //3. 拉低SCL,准备发送数据
    MyI2C_W_SCL(0);
}
```

```c
void MyI2C_Stop(void){
    //1. 拉低SDA和SCL
    MyI2C_W_SDA(0);
    MyI2C_W_SCL(0);

    //2. 拉高SCL
    MyI2C_W_SCL(1);

    //3. 拉高SDA，此时SCL保持高电平，表示I2C停止信号
    MyI2C_W_SDA(1);
}
```

```c
void MyI2C_SendByte(uint8_t data){
    for(int i=0; i<8; i++){
        //1. 发送数据的最高位
        MyI2C_W_SDA((data & 0x80) >> 7); //取最高位

        //2. 拉高SCL，表示数据有效
        MyI2C_W_SCL(1);

        //3. 拉低SCL，准备发送下一位
        MyI2C_W_SCL(0);

        //4. 数据左移一位，准备发送下一位
        data <<= 1;
    }
}
```

```c
uint8_t MyI2C_RecvByte(void){
    uint8_t data = 0;
    MyI2C_W_SDA(1); //释放SDA，准备接收数据
    for(int i=0; i<8; i++){
        //1. 拉高SCL，准备接收数据
        MyI2C_W_SCL(1);

        //2. 读取SDA上的数据
        data <<= 1; //数据左移一位
        data |= MyI2C_R_SDA(); //读取当前位并存入data的最低位

        //3. 拉低SCL，准备接收下一位
        MyI2C_W_SCL(0);
    }

    return data;
}
```

```c
void MyI2C_SendAck(uint8_t ack){
    //1. 拉低SDA，表示ACK
    MyI2C_W_SDA(ack);

    //2. 拉高SCL，表示ACK有效
    MyI2C_W_SCL(1);

    //3. 拉低SCL，准备接收下一位
    MyI2C_W_SCL(0);
}
```

```c
uint8_t MyI2C_ReceiveAck(void){
    uint8_t ack;

    //1. 拉高SDA，释放总线，准备接收ACK
    MyI2C_W_SDA(1);

    //2. 拉高SCL，准备接收ACK
    MyI2C_W_SCL(1);

    //3. 读取SDA上的ACK值
    ack = MyI2C_R_SDA();

    //4. 拉低SCL，完成ACK接收
    MyI2C_W_SCL(0);

    return ack;
}
```

2. 硬件I2C

```c
void HardI2C_Init(void)
{
    //1. 使能I2C2
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_I2C2, ENABLE);
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);

    //2. 配置I2C2的SCL和SDA引脚
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10 | GPIO_Pin_11; // PB10->SCL, PB11->SDA
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_OD; // 开漏输出
    GPIO_Init(GPIOB, &GPIO_InitStructure);

    //3. 配置I2C2
    I2C_InitTypeDef I2C_InitStructure;
    I2C_InitStructure.I2C_Mode = I2C_Mode_I2C;
    I2C_InitStructure.I2C_ClockSpeed = 50000; // 50kHz
    I2C_InitStructure.I2C_DutyCycle = I2C_DutyCycle_2;
    I2C_InitStructure.I2C_Ack = I2C_Ack_Enable;
    I2C_InitStructure.I2C_AcknowledgedAddress = I2C_AcknowledgedAddress_7bit;
    I2C_InitStructure.I2C_OwnAddress1 = 0x00; // 主机不需要设置地址
    I2C_Init(I2C2, &I2C_InitStructure);

    //4. 使能I2C2
    I2C_Cmd(I2C2, ENABLE);
}
```

```c
void MPU6050_WriteReg_Byte(uint8_t reg, uint8_t data)
{
    //软件I2C写一个字节到指定寄存器
    // MyI2C_Start();
    // MyI2C_SendByte(MPU6050_ADDR_W); // 设备地址+写位
    // MyI2C_ReceiveAck();
    // MyI2C_SendByte(reg); // 寄存器地址
    // MyI2C_ReceiveAck();
    // MyI2C_SendByte(data); // 数据
    // MyI2C_ReceiveAck();
    // MyI2C_Stop();

    // 硬件I2C写一个字节到指定寄存器
    I2C_GenerateSTART(I2C2, ENABLE); // 产生起始信号
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_MODE_SELECT); // 等待起始信号产生

    I2C_Send7bitAddress(I2C2, MPU6050_ADDR, I2C_Direction_Transmitter); // 发送设备地址+写位
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_TRANSMITTER_MODE_SELECTED); // 等待地址发送完成

    I2C_SendData(I2C2, reg); // 发送寄存器地址
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTING); // 等待数据发送完成

    I2C_SendData(I2C2, data); // 发送数据
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTED); // 等待数据发送完成

    I2C_GenerateSTOP(I2C2, ENABLE); // 产生停止信号
}
```

```c
void MPU6050_WriteReg_Byte(uint8_t reg, uint8_t data)
{
    //软件I2C写一个字节到指定寄存器
    // MyI2C_Start();
    // MyI2C_SendByte(MPU6050_ADDR_W); // 设备地址+写位
    // MyI2C_ReceiveAck();
    // MyI2C_SendByte(reg); // 寄存器地址
    // MyI2C_ReceiveAck();
    // MyI2C_SendByte(data); // 数据
    // MyI2C_ReceiveAck();
    // MyI2C_Stop();

    // 硬件I2C写一个字节到指定寄存器
    I2C_GenerateSTART(I2C2, ENABLE); // 产生起始信号
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_MODE_SELECT); // 等待起始信号产生

    I2C_Send7bitAddress(I2C2, MPU6050_ADDR, I2C_Direction_Transmitter); // 发送设备地址+写位
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_TRANSMITTER_MODE_SELECTED); // 等待地址发送完成

    I2C_SendData(I2C2, reg); // 发送寄存器地址
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTING); // 等待数据发送完成

    I2C_SendData(I2C2, data); // 发送数据
    MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTED); // 等待数据发送完成

    I2C_GenerateSTOP(I2C2, ENABLE); // 产生停止信号
}
```

### SPI通信
#### 概念
+ SPI（Serial Peripheral Interface）是由Motorola公司开发的一种通用数据总线
+ 四根通信线：
    - SCK（Serial Clock）:时钟线
    - MOSI（Master Output Slave Input）：主机输出、从机输入，是主机发送信号的线
    - MISO（Master Input Slave Output）：从机输出、主机输入，是主机接收信号的线
    - SS（Slave Select）：给每个从机都开辟一条SS，给低电平表示要与你通信
+ 同步，全双工
+ 支持总线挂载多设备（一主多从）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766371388540-b51947f2-fa73-4f32-8f6a-f73723451e8b.png)

推挽输出，所以最大速率更大

原理实现：基于移位寄存器：

1. 原始状态

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766371859289-72d10ddd-1fe9-4c14-a376-82c051149d2b.png)

2. 时钟上升沿来了，进行移位，移出去的位放在通信线上

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766371946151-0dcfd460-850d-4ef8-ac7e-174008805040.png)

3. 下降沿到了，两边对通信线进行采样，输入到各自的最低位

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372012585-5c97057c-e5fc-4ec1-9736-fec8b3a8f8e8.png)

#### 时序逻辑
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372158967-9f324ef6-20b4-49c6-bf37-560696a7e9ed.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372326046-0082f4e0-1ccf-4479-a375-011bb760c32e.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372573806-c6ee5ccc-2997-469d-a7ee-3432d97fd592.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372582705-7dfa69a8-cf87-4c28-bcf7-437b6e144e3a.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372592456-2e84479c-ee37-4a39-864d-c722a9b76844.png)

在外设从机通常有定义一个指令集，主机发送指令码来对从机进行操作：

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766372708799-2a86f85f-da52-469c-888f-1d4e8602389a.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766373083531-16e437f2-33fe-41d3-98d7-c62d4d8b3728.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766373088053-e749543f-d4a0-485f-9b55-ae4fd29d922f.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766373119849-69eda772-7947-4f23-8952-789baebeed91.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766373127487-f1abe79e-7657-40fb-8cdc-fea4aa5c2771.png)

#### W25Q64简介
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766374063285-40646777-46fc-4ed2-a351-716d45662c82.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766374072645-49a28749-0a35-4769-8caa-4b9ba2d9ba9b.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766374606320-130bf267-18ed-445d-b264-39e26ef9df84.png)块-扇区-页

先把写入的数据放在页缓冲区（RAM），再有RAM慢慢写到Flash里面

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766374773899-0b34d09a-ad52-4b6a-b68a-70ceba079a15.png)

#### SPI硬件外设
+ STM32内部集成了硬件SPI收发电路，可以由硬件自动执行时钟生成、数据收发等功能，减轻CPU的负担
+ 可配置8位/16位数据帧、高位先行/低位先行
+ 时钟频率： fPCLK / (2, 4, 8, 16, 32, 64, 128, 256)
+ 支持多主机模型、主或从操作
+ 可精简为半双工/单工通信
+ 支持DMA
+ 兼容I2S协议
+ STM32F103C8T6 硬件SPI资源：SPI1、SPI2

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766386004757-55d27956-c9c9-4755-903a-a5e6818e554c.png)

LSBFIRST：控制高位先行还是地位先行

RDR：存接收到的值

TDR：存要发送的值

TXE：标志位，表示TDR为空，一般就是TDR的值已经放入移位寄存器了

RXNE：标志位，表示RDR非空，一般就是表示把移位寄存器接收到的值已经放入RDR了，这时应该尽快读走RDR

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766386850810-51ae2936-0af5-42d8-8c19-88649b51b758.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766387023525-dd9feac9-a52f-42c6-af5c-eb38d55cf2c6.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766387499922-dd4fe758-70ab-44ed-97cc-eff8228a0432.png)

分四步：

1. 等待TXE为1
2. 写入发送的数据至TDR
3. 等待RXNE为1（即等待发送和接收完成）
4. 读取RDR接收的数据

#### 代码
1. 软件SPI

```c
void SPI_Software_Init(void) //软件SPI初始化
{
    //1. GPIOA时钟使能
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE); 

    //2. GPIOA配置  PA4-SS  PA5-SCK PA6-MISO  PA7-MOSI
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_4 | GPIO_Pin_5 | GPIO_Pin_7; //PA4,PA5,PA7
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;  //推挽输出
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; //速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure);
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6; //PA6
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;  //上拉输入
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    //3. 初始化引脚状态
    Software_SPI_W_SS(1);   //SS拉高
    Software_SPI_W_SCK(0);  //SCK拉低
}
```

```c
void Software_SPI_W_SS(uint8_t BitValue)  //对SS引脚进行电平控制
{
    GPIO_WriteBit(GPIOA, GPIO_Pin_4, (BitAction)BitValue); //PA4-SS
}

void Software_SPI_W_SCK(uint8_t BitValue) //对SCK引脚进行电平控制
{
    GPIO_WriteBit(GPIOA, GPIO_Pin_5, (BitAction)BitValue); //PA5-SCK
}

void Software_SPI_W_MOSI(uint8_t BitValue) //对MOSI引脚进行电平控制
{
    GPIO_WriteBit(GPIOA, GPIO_Pin_7, (BitAction)BitValue); //PA7-MOSI
}

uint8_t Software_SPI_R_MISO(void) //读取MISO引脚电平状态
{
    return GPIO_ReadInputDataBit(GPIOA, GPIO_Pin_6); //PA6-MISO
}
```

```c
void Software_SPI_Start(void) //启动SPI传输
{
    Software_SPI_W_SS(0); //拉低SS，启动SPI传输
}

void Software_SPI_Stop(void) //停止SPI传输
{
    Software_SPI_W_SS(1); //拉高SS，停止SPI传输
}

//使用模式0，CPOL=0，CPHA=0
uint8_t Software_SPI_SwapByte(uint8_t ByteSend)  //软件SPI发送并接收一个字节数据，ByteSend：表示移位寄存器的值
{
    uint8_t i;
    for(i = 0;i<8;i++)
    {
        Software_SPI_W_MOSI(ByteSend & 0x80); //发送数据，高位先行
        ByteSend <<= 1; //数据左移一位，准备发送下一位
        Software_SPI_W_SCK(1); //拉高时钟,产生上升沿
        if(Software_SPI_R_MISO()) //读取MISO引脚状态
        {
            ByteSend |= 0x01; //接收数据，最低位置1
        }
        Software_SPI_W_SCK(0); //拉低时钟，准备下一位
    }
    return ByteSend; //返回接收到的数据
}
```

```c
 //初始化W25Q64芯片
void Software_W25Q64_Init(void)
{
    //初始化软件SPI
    SPI_Software_Init();
}

//读取W25Q64芯片ID，MID：制造商ID指针，DID：设备ID指针
void Software_W25Q64_ReadID(uint8_t *MID, uint16_t *DID) 
{
    Software_SPI_Start();               //启动SPI传输
    Software_SPI_SwapByte(W25Q64_JEDEC_ID);       //发送读取ID命令
    *MID = Software_SPI_SwapByte(W25Q64_DUMMY_BYTE);  //读取制造商ID
    *DID = Software_SPI_SwapByte(W25Q64_DUMMY_BYTE)<<8; //读取设备ID高8位
    *DID |= Software_SPI_SwapByte(W25Q64_DUMMY_BYTE);  //读取设备ID低8位
    Software_SPI_Stop();                //停止SPI传输
}

//写使能
void Software_W25Q64_WriteEnable(void) /
{
    Software_SPI_Start();               //启动SPI传输
    Software_SPI_SwapByte(W25Q64_WRITE_ENABLE); //发送写使能命令
    Software_SPI_Stop();                //停止SPI传输
}

//等待W25Q64芯片忙标志位清除
void Software_W25Q64_WaitBusy(void)
{
    uint32_t Timeout = 100000;
    uint8_t Status = 0;
    Software_SPI_Start();               //启动SPI传输
    Software_SPI_SwapByte(W25Q64_READ_STATUS_REGISTER_1); //发送读取状态寄存器1命令
    do
    {
        Status = Software_SPI_SwapByte(W25Q64_DUMMY_BYTE); //读取状态寄存器1的值
        Timeout--;
        if(Timeout == 0) break; //超时退出
    }while(Status & 0x01); //等待忙标志位清除
    Software_SPI_Stop();                //停止SPI传输
}

//页编程，Address：目标地址，DataArray：数据数组指针，Length：数据长度，最大256字节
void Software_W25Q64_PageProgram(uint32_t Address, uint8_t *DataArray, uint16_t Length)
{
    Software_W25Q64_WriteEnable(); //写使能

    Software_SPI_Start();               //启动SPI传输
    Software_SPI_SwapByte(W25Q64_PAGE_PROGRAM); //发送页编程命令
    Software_SPI_SwapByte((Address >> 16) & 0xFF); //发送地址高8位
    Software_SPI_SwapByte((Address >> 8) & 0xFF);  //发送地址中8位
    Software_SPI_SwapByte(Address & 0xFF);         //发送地址低8位
    for(uint16_t i=0; i<Length; i++)
    {
        Software_SPI_SwapByte(DataArray[i]); //发送数据
    }
    Software_SPI_Stop();                //停止SPI传输

    Software_W25Q64_WaitBusy();        //事后等待写入完成
}

//扇区擦除，Address：目标地址
void Software_W25Q64_SectorErase(uint32_t Address)
{
    Software_W25Q64_WriteEnable(); //写使能

    Software_SPI_Start();               //启动SPI传输
    Software_SPI_SwapByte(W25Q64_SECTOR_ERASE_4KB); //发送扇区擦除命令
    Software_SPI_SwapByte((Address >> 16) & 0xFF); //发送地址高8位
    Software_SPI_SwapByte((Address >> 8) & 0xFF);  //发送地址中8位
    Software_SPI_SwapByte(Address & 0xFF);         //发送地址低8位
    Software_SPI_Stop();                //停止SPI传输

    Software_W25Q64_WaitBusy();        //事后等待擦除完成
}


//读取数据，Address：目标地址，DataArray：数据数组指针，Length：数据长度
void Software_W25Q64_ReadData(uint32_t Address, uint8_t *DataArray, uint32_t Length)
{
    Software_SPI_Start();               //启动SPI传输
    Software_SPI_SwapByte(W25Q64_READ_DATA); //发送读取数据命令
    Software_SPI_SwapByte((Address >> 16) & 0xFF); //发送地址高8位
    Software_SPI_SwapByte((Address >> 8) & 0xFF);  //发送地址中8位
    Software_SPI_SwapByte(Address & 0xFF);         //发送地址低8位
    for(uint32_t i=0; i<Length; i++)
    {
        DataArray[i] = Software_SPI_SwapByte(W25Q64_DUMMY_BYTE); //读取数据
    }
    Software_SPI_Stop();                //停止SPI传输
}
```

2. 硬件SPI

```c
void Hardware_SPI_Init(void) //硬件SPI初始化
{
    //1. SPI1和GPIOA时钟使能
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_SPI1 | RCC_APB2Periph_GPIOA, ENABLE);

    //2. GPIOA配置  PA4-SS  PA5-SPI1_SCK PA6-SPI1_MISO  PA7-SPI1_MOSI
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_4;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;  //推挽输出
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; //速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_5 | GPIO_Pin_7; //PA5,PA7
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;  //复用推挽输出
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; //速度50MHz
    GPIO_Init(GPIOA, &GPIO_InitStructure);

    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6; //PA6
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;  //上拉输入
    GPIO_Init(GPIOA, &GPIO_InitStructure);


    //3. SPI1配置
    SPI_InitTypeDef SPI_InitStructure;
    SPI_InitStructure.SPI_Mode = SPI_Mode_Master; //主模式
    SPI_InitStructure.SPI_Direction = SPI_Direction_2Lines_FullDuplex; //双线全双工
    SPI_InitStructure.SPI_DataSize = SPI_DataSize_8b; //8位数据帧格式
    SPI_InitStructure.SPI_FirstBit = SPI_FirstBit_MSB; //高位先行
    SPI_InitStructure.SPI_BaudRatePrescaler = SPI_BaudRatePrescaler_128; //波特率预分频128
    //SPI模式
    SPI_InitStructure.SPI_CPOL = SPI_CPOL_Low; //时钟悬空低
    SPI_InitStructure.SPI_CPHA = SPI_CPHA_1Edge; //第1个时钟沿捕获数据

    SPI_InitStructure.SPI_NSS = SPI_NSS_Soft; //NSS软件管理
    SPI_InitStructure.SPI_CRCPolynomial = 7; //CRC值7
    SPI_Init(SPI1, &SPI_InitStructure);

    //4. 使能SPI1
    SPI_Cmd(SPI1, ENABLE);

    //5. 初始化引脚状态
    Hardware_SPI_W_SS(1);   //SS拉高
}
```

```c
void Hardware_SPI_W_SS(uint8_t BitValue)  //对SS引脚进行电平控制
{
    GPIO_WriteBit(GPIOA, GPIO_Pin_4, (BitAction)BitValue); //PA4-SS
}
```

```c
void Hardware_SPI_Start(void) //启动SPI传输
{
    Hardware_SPI_W_SS(0); //拉低SS，启动SPI传输
}

void Hardware_SPI_Stop(void) //停止SPI传输
{
    Hardware_SPI_W_SS(1); //拉高SS，停止SPI传输
}

//使用模式0，CPOL=0，CPHA=0
uint8_t Hardware_SPI_SwapByte(uint8_t ByteSend)  //硬件SPI发送并接收一个字节数据，ByteSend：表示移位寄存器的值
{
    //1.等待发送缓冲区空，即TXE变1
    while(SPI_I2S_GetFlagStatus(SPI1, SPI_I2S_FLAG_TXE) == RESET); 

    //2.发送数据,将数据写入发送缓冲区TDR
    SPI_I2S_SendData(SPI1, ByteSend); //发送数据

    //3.等待接收缓冲区非空，即RXNE变1
    while(SPI_I2S_GetFlagStatus(SPI1, SPI_I2S_FLAG_RXNE) == RESET); 

    //4.读取接收到的数据
    return SPI_I2S_ReceiveData(SPI1); //返回接收到的数据
}
```

```c
  //初始化W25Q64芯片
void Hardware_W25Q64_Init(void)
{
    //初始化硬件SPI
    Hardware_SPI_Init();
}

//读取W25Q64芯片ID，MID：制造商ID指针，DID：设备ID指针
void Hardware_W25Q64_ReadID(uint8_t *MID, uint16_t *DID) 
{
    Hardware_SPI_Start();               //启动SPI传输
    Hardware_SPI_SwapByte(W25Q64_JEDEC_ID);       //发送读取ID命令
    *MID = Hardware_SPI_SwapByte(W25Q64_DUMMY_BYTE);  //读取制造商ID
    *DID = Hardware_SPI_SwapByte(W25Q64_DUMMY_BYTE)<<8; //读取设备ID高8位
    *DID |= Hardware_SPI_SwapByte(W25Q64_DUMMY_BYTE);  //读取设备ID低8位
    Hardware_SPI_Stop();                //停止SPI传输
}

//写使能
void Hardware_W25Q64_WriteEnable(void) 
{
    Hardware_SPI_Start();               //启动SPI传输
    Hardware_SPI_SwapByte(W25Q64_WRITE_ENABLE); //发送写使能命令
    Hardware_SPI_Stop();                //停止SPI传输
}

//等待W25Q64芯片忙标志位清除
void Hardware_W25Q64_WaitBusy(void)
{
    uint32_t Timeout = 100000;
    uint8_t Status = 0;
    Hardware_SPI_Start();               //启动SPI传输
    Hardware_SPI_SwapByte(W25Q64_READ_STATUS_REGISTER_1); //发送读取状态寄存器1命令
    do
    {
        Status = Hardware_SPI_SwapByte(W25Q64_DUMMY_BYTE); //读取状态寄存器1的值
        Timeout--;
        if(Timeout == 0) break; //超时退出
    }while(Status & 0x01); //等待忙标志位清除
    Hardware_SPI_Stop();                //停止SPI传输
}

//页编程，Address：目标地址，DataArray：数据数组指针，Length：数据长度，最大256字节
void Hardware_W25Q64_PageProgram(uint32_t Address, uint8_t *DataArray, uint16_t Length)
{
    Hardware_W25Q64_WriteEnable(); //写使能

    Hardware_SPI_Start();               //启动SPI传输
    Hardware_SPI_SwapByte(W25Q64_PAGE_PROGRAM); //发送页编程命令
    Hardware_SPI_SwapByte((Address >> 16) & 0xFF); //发送地址高8位
    Hardware_SPI_SwapByte((Address >> 8) & 0xFF);  //发送地址中8位
    Hardware_SPI_SwapByte(Address & 0xFF);         //发送地址低8位
    for(uint16_t i=0; i<Length; i++)
    {
        Hardware_SPI_SwapByte(DataArray[i]); //发送数据
    }
    Hardware_SPI_Stop();                //停止SPI传输

    Hardware_W25Q64_WaitBusy();        //事后等待写入完成
}

//扇区擦除，Address：目标地址
void Hardware_W25Q64_SectorErase(uint32_t Address)
{
    Hardware_W25Q64_WriteEnable(); //写使能

    Hardware_SPI_Start();               //启动SPI传输
    Hardware_SPI_SwapByte(W25Q64_SECTOR_ERASE_4KB); //发送扇区擦除命令
    Hardware_SPI_SwapByte((Address >> 16) & 0xFF); //发送地址高8位
    Hardware_SPI_SwapByte((Address >> 8) & 0xFF);  //发送地址中8位
    Hardware_SPI_SwapByte(Address & 0xFF);         //发送地址低8位
    Hardware_SPI_Stop();                //停止SPI传输
    Hardware_W25Q64_WaitBusy();        //事后等待擦除完成
}


//读取数据，Address：目标地址，DataArray：数据数组指针，Length：数据长度
void Hardware_W25Q64_ReadData(uint32_t Address, uint8_t *DataArray, uint32_t Length)
{
    Hardware_SPI_Start();               //启动SPI传输
    Hardware_SPI_SwapByte(W25Q64_READ_DATA); //发送读取数据命令
    Hardware_SPI_SwapByte((Address >> 16) & 0xFF); //发送地址高8位
    Hardware_SPI_SwapByte((Address >> 8) & 0xFF);  //发送地址中8位
    Hardware_SPI_SwapByte(Address & 0xFF);         //发送地址低8位
    for(uint32_t i=0; i<Length; i++)
    {
        DataArray[i] = Hardware_SPI_SwapByte(W25Q64_DUMMY_BYTE); //读取数据
    }
    Hardware_SPI_Stop();                //停止SPI传输
}
```

### RTC实时时钟&BKP备份寄存器
#### Unix时间戳
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766457187446-3c52448c-85a1-448f-b74d-daa75980b66e.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766457500187-fbfe69ca-c1b7-4afd-9d5b-6e60f21ecbcd.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766457716729-ec447adc-136f-42a4-aaf5-4605ceb3efb3.png)

#### BKP
+ BKP（Backup Registers）备份寄存器
+ BKP可用于存储用户应用程序数据。当VDD（2.0~3.6V）电源被切断，他们仍然由VBAT（1.8~3.6V）维持供电。当系统在待机模式下被唤醒，或系统复位或电源复位时，他们也不会被复位
+ TAMPER引脚产生的侵入事件将所有备份寄存器内容清除
+ RTC引脚输出RTC校准时钟、RTC闹钟脉冲或者秒脉冲
+ 存储RTC时钟校准寄存器
+ 用户数据存储容量：	20字节（中容量和小容量）/ 84字节（大容量和互联型）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766459148211-66a59353-a522-49b7-ae68-1ac9330125f1.png)

#### RTC
+ RTC（Real Time Clock）实时时钟
+ RTC是一个独立的定时器，可为系统提供时钟和日历的功能
+ RTC和时钟配置系统处于后备区域，系统复位时数据不清零，VDD（2.0~3.6V）断电后可借助VBAT（1.8~3.6V）供电继续走时
+ 32位的可编程计数器，可对应Unix时间戳的秒计数器
+ 20位的可编程预分频器，可适配不同频率的输入时钟
+ 可选择三种RTC时钟源：
    - HSE时钟除以128（通常为8MHz/128）
    - LSE振荡器时钟（通常为32.768KHz）
    - LSI振荡器时钟（40KHz）

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766459650489-1c1ba676-1f17-41b0-80be-af1efefe4387.png)

> 整个芯片可以有四种时钟源：
>
> 1. HSE：高速外部时钟
> 2. HSI：高速内部时钟
> 3. LSI：低速内部时钟
> 4. LSE：低速外部时钟
>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766459669508-77a8391b-6672-42c1-82a7-74be73c130f2.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766460251611-bb24cdde-cbf1-457e-92a3-db14f5fe030c.png)

#### 代码
1. BKP

```c
void BKP_Init(void)
{
    //1. 使能BKP和PWR外设时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_BKP | RCC_APB1Periph_PWR, ENABLE);
    //2. 使能对BKP和RTC寄存器的访问
    PWR_BackupAccessCmd(ENABLE); // Enable access to backup domain
}


void BKP_WriteData(uint16_t Address, uint16_t Data)
{
    BKP_WriteBackupRegister(Address, Data);
}

uint16_t BKP_ReadData(uint16_t Address)
{
    return BKP_ReadBackupRegister(Address);
}


```

2. RTC

```c
void RTC_Init(void)
{
    //1. 开启PWR和BKP外设时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR | RCC_APB1Periph_BKP, ENABLE);    

    //2. 允许访问后备寄存器
    PWR_BackupAccessCmd(ENABLE);

    //因为RTC 使用后备电源 VBAT 供电；当主电源存在时由主电源供电，主电源断电时自动切换到 VBAT。
    if(BKP_ReadBackupRegister(BKP_DR1) != 0xA5A5) //检查备份寄存器的标志位，判断是否第一次初始化RTC
    {   
        //3. 开启外部低速晶振LSE
        RCC_LSEConfig(RCC_LSE_ON);  //开启外部低速晶振
        while(RCC_GetFlagStatus(RCC_FLAG_LSERDY) == RESET); //等待LSE就绪

        //4. 选择RTC时钟源为LSE
        RCC_RTCCLKConfig(RCC_RTCCLKSource_LSE);

        //5. 使能RTC时钟
        RCC_RTCCLKCmd(ENABLE);

        //6. 等待RTC寄存器同步,因为RTC的时钟是独立的，所以需要等待同步，即检查RTC_CRL寄存器的RSF位被硬件设置为1
        RTC_WaitForSynchro();
        RTC_WaitForLastTask(); //等待上一次对RTC的写操作完成

        //7. 设置RTC预分频值,使RTC计数1秒钟
        RTC_SetPrescaler(32768-1); //RTC时钟频率为LSE频率，LSE频率为32.768KHz
        RTC_WaitForLastTask(); //等待上一次对RTC的写操作完成

        //8. 设置初始时间
        RTC_SetTime();
        
        //9. 在备份寄存器中写入标志，表示RTC已初始化
        BKP_WriteBackupRegister(BKP_DR1, 0xA5A5);
    }
    else
    {
        RTC_WaitForSynchro();
        RTC_WaitForLastTask(); //等待上一次对RTC的写操作完成
    }

}
```

```c
uint16_t myRTC_Time[6] = {2023, 1, 1, 23, 59, 55}; //年、月、日、时、分、秒

void RTC_SetTime(void)
{
    time_t time_cnt;
    struct tm time_date;
    time_date.tm_year = myRTC_Time[0]-1900; //年份从1900开始计算
    time_date.tm_mon  = myRTC_Time[1]-1;   //月份从0开始计算
    time_date.tm_mday = myRTC_Time[2];
    time_date.tm_hour = myRTC_Time[3];
    time_date.tm_min  = myRTC_Time[4];
    time_date.tm_sec  = myRTC_Time[5];

    time_cnt = mktime(&time_date)-8*3600; //转换为时间戳,并转换为UTC时间(北京时间-8小时)
    RTC_SetCounter(time_cnt); //设置RTC计数初值
    RTC_WaitForLastTask(); //等待上一次对RTC的写操作完成
}
```

```c
void RTC_ReadTime(void)
{
    time_t time_cnt;
    struct tm time_date;

    time_cnt = RTC_GetCounter()+8*3600; //获取RTC计数值.并转换为北京时间(UTC+8)
    time_date = *localtime(&time_cnt); //转换为时间结构体

    myRTC_Time[0] = time_date.tm_year + 1900; //年
    myRTC_Time[1] = time_date.tm_mon + 1;     //月
    myRTC_Time[2] = time_date.tm_mday;        //日
    myRTC_Time[3] = time_date.tm_hour;        //时
    myRTC_Time[4] = time_date.tm_min;         //分
    myRTC_Time[5] = time_date.tm_sec;         //秒
}

```

```c
void RTC_Test(void)
{
	OLED_Init();
    RTC_Init();
	OLED_ShowString(1,1,"Date:xxxx-xx-xx");
	OLED_ShowString(2,1,"Time:xx:xx:xx");
	OLED_ShowString(3,1,"CNT:");
	OLED_ShowString(4,1,"DIV:");
    while(1)
    {
        RTC_ReadTime();
		OLED_ShowNum(1,6,myRTC_Time[0],4); //年
		OLED_ShowNum(1,11,myRTC_Time[1],2); //月
		OLED_ShowNum(1,14,myRTC_Time[2],2); //日
		OLED_ShowNum(2,6,myRTC_Time[3],2); //时
		OLED_ShowNum(2,9,myRTC_Time[4],2); //分
		OLED_ShowNum(2,12,myRTC_Time[5],2); //秒
		OLED_ShowNum(3,6,RTC_GetCounter(),8); //计数值
		OLED_ShowNum(4,6,(32767-RTC_GetDivider())/32767.0*999,8); //可对DIV进行线性变换，得到0~999ms的值
		Delay_ms(500);
    }
}
```

### PWR电源管理
#### 简介
PWR（Power Control）电源控制

PWR负责管理STM32内部的电源供电部分，可以实现可编程电压监测器和低功耗模式的功能

可编程电压监测器（PVD）可以监控VDD电源电压，当VDD下降到PVD阀值以下或上升到PVD阀值之上时，PVD会触发中断，用于执行紧急关闭任务

低功耗模式包括睡眠模式（Sleep）、停机模式（Stop）和待机模式（Standby），可在系统空闲时，降低STM32的功耗，延长设备使用时间

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766471743934-b8da2d75-d409-4fc9-9c32-501faf562746.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766472131740-d93b5fbf-d3e7-44e0-907d-ddcc07a2aeb9.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766472149112-cd48d3a5-01b2-4790-9160-fb63ccca8dbd.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766473507898-9868a165-681d-4c3a-843b-0dd352b36d55.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766472184626-979cbc0a-6795-4448-b4eb-f603dda894d5.png)

#### 低功耗模式
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766472212517-5aa993e6-29d6-4c42-832b-33a48e55af08.png)

从上到下越来越省电，也相应的越来越难唤醒

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766474418940-d21a5f37-e5c5-48b1-9842-7ded7ff76690.png)

所以应该在调用WFI或WFE之前，把这些寄存器位给配置好，这样STM32才知道进入哪种模式

1. 睡眠模式
    - 执行完WFI/WFE指令后，STM32进入睡眠模式，程序暂停运行，唤醒后程序从暂停的地方继续运行
    - SLEEPONEXIT位决定STM32执行完WFI或WFE后，是立刻进入睡眠，还是等STM32从最低优先级的中断处理程序中退出时进入睡眠
    - 在睡眠模式下，所有的I/O引脚都保持它们在运行模式时的状态
    - WFI指令进入睡眠模式，可被任意一个NVIC响应的中断唤醒
    - WFE指令进入睡眠模式，可被唤醒事件唤醒
2. 停机模式
    - 执行完WFI/WFE指令后，STM32进入停止模式，程序暂停运行，唤醒后程序从暂停的地方继续运行
    - 1.8V供电区域的所有时钟都被停止，PLL、HSI和HSE被禁止，SRAM和寄存器内容被保留下来
    - 在停止模式下，所有的I/O引脚都保持它们在运行模式时的状态
    - 当一个中断或唤醒事件导致退出停止模式时，<font style="color:#DF2A3F;">HSI</font>被选为系统时钟当电压调节器处于低功耗模式下，系统从停止模式退出时，会有一段额外的启动延时

> 程序刚开始是使用HSE经PLL倍频的**72MHz**作为时钟，而唤醒后默认用HSI就变为**8MHz，**因此用该模式唤醒后应**第一时间重新启动HSE（重新调用SystemInit函数）**，配置主频为72MHz
>

    - WFI指令进入停止模式，可被任意一个EXTI中断唤醒
    - WFE指令进入停止模式，可被任意一个EXTI事件唤醒
3. 待机模式
    - 执行完WFI/WFE指令后，STM32进入待机模式，唤醒后程序<font style="color:#DF2A3F;">从头开始运行</font>
    - 整个1.8V供电区域被断电，PLL、HSI和HSE也被断电，SRAM和寄存器内容丢失，只有备份的寄存器和待机电路维持供电
    - 在待机模式下，所有的I/O引脚变为高阻态（浮空输入）
    - WKUP引脚的上升沿、RTC闹钟事件的上升沿、NRST引脚上外部复位、IWDG复位退出待机模式

#### 代码
##### 修改主频
在system_stm32f10x.c中提供了两个函数和一个变量：

    1. SystemInit()：配置时钟树，复位后main函数执行前在启动文件中自动调用
    2. SystemCoreClock变量：主频频率的值
    3. SystemCoreClockUpdate（）：如改变了主频的值，需调用该函数手动更新SystemCoreClock变量的值

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766476783261-fbbea5ce-e9b4-4b58-88a4-5bb7679729ac.png)

解除相应的注释来选择主频（需解除在属性里解除文件只读）实现修改主频

```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
int main(void)
{
	OLED_Init();
	OLED_ShowString(1,1,"SYSCLK:");
    OLED_ShowNum(1,8,SystemCoreClock,8);
    while (1)
    {
        OLED_ShowString(2,1,"RUNNING");
        Delay_ms(500);
        OLED_ShowString(2,1,"        ");
        Delay_ms(500);
    }
}

```

##### 睡眠模式
因为串口收发的代码使用中断来接收数据，所以可以使用睡眠模式来降低功耗

```c
#include "OLED.h"
#include "Serial.h"
#include <stdio.h>

int main(void)
{
	OLED_Init();
    Serial_Init();
    OLED_ShowString(1,1,"RxData:");
    while (1)
    {
	   if(Serial_GetRxFlag())
       {
           uint8_t data = Serial_GetRxData();
           OLED_ShowChar(1,9,(char)data);
		}
        OLED_ShowString(3,1,"Runnin");
        Delay_ms(500);
        OLED_ShowString(3,1,"       ");
        Delay_ms(500);
        __WFI();
	}
}
```

##### 停机模式
因为对射红外计数使用的是EXTI中断，所以可以使用停机模式

```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "CountSensor.h"
int main(void)
{
	OLED_Init();
	OLED_ShowString(1,1,"Count:");
    CountSensor_Init();                                                  
    

    //1. 停机模式需要PWR干活，需开启PWR时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE);


    while (1)
    {   
        OLED_ShowNum(1,7,GetCountSensor_Value(),5);
        OLED_ShowString(2,1,"Running");
		Delay_ms(100); 
        OLED_ShowString(2,1,"        ");

        //2. 进入停机模式: 开启低功耗模式，以WFI方式等待中断唤醒
        PWR_EnterSTOPMode(PWR_Regulator_ON, PWR_STOPEntry_WFI);
		//3. 退出停机模式后，需重新配置系统时钟
        SystemInit();
    }
    
}
```



##### 待机模式
待机模式可以由RTC闹钟事件唤醒和WakeUp引脚跳变唤醒，依据此来写测试代码

```c
void Standby_Test(void)
{
	OLED_Init();
	RTC_Init();
	OLED_ShowString(1,1,"CNT:");
	OLED_ShowString(2,1,"ALR:");
	OLED_ShowString(3,1,"ALRF:");
	//也可以使用WakeUp引脚来唤醒
	PWR_WakeUpPinCmd(ENABLE);
	
	//1. 开启PWR时钟
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE);

	//2. 设置闹钟时间为当前时间+10秒 并显示
	uint32_t alarm_time = RTC_GetCounter()+10;
	OLED_ShowNum(2,6,alarm_time,8); //闹钟时间
	RTC_SetAlarm(alarm_time);

	while(1)
	{
		OLED_ShowNum(1,6,RTC_GetCounter(),8); //计数值
		OLED_ShowNum(3,6,RTC_GetFlagStatus(RTC_FLAG_ALR),1); //闹钟标志位
		OLED_ShowString(4,1,"Running");
		Delay_ms(100);
		OLED_ShowString(4,1,"         ");
		Delay_ms(100);
		OLED_ShowString(4,9,"STANDBY");
		Delay_ms(300);
		OLED_Clear();
		//3. 进入待机模式
		PWR_EnterSTANDBYMode();
	}

}
```

### WDG看门狗
#### 简介
+ WDG（Watchdog）看门狗
+ 看门狗可以监控程序的运行状态，当程序因为设计漏洞、硬件故障、电磁干扰等原因，出现卡死或跑飞现象时，看门狗能及时复位程序，避免程序陷入长时间的罢工状态，保证系统的可靠性和安全性
+ 看门狗本质上是一个定时器，当指定时间范围内，程序没有执行喂狗（重置计数器）操作时，看门狗硬件电路就自动产生复位信号
+ STM32内置两个看门狗	
    - 独立看门狗（IWDG）：独立工作，对时间精度要求较低	
    - 窗口看门狗（WWDG）：要求看门狗在精确计时窗口起作用

#### 独立看门狗IWDG
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766543728393-edbcf2e6-ef81-462b-aedc-f8e01043f21e.png)

使用的是LSI作为时钟，喂狗就是重装计数器

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766543870900-772ac8e5-ec0b-4e60-9d38-fe46bc551a7a.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766544047766-83ae5f7c-ed32-4afe-8785-257f0f86d677.png)

#### 窗口看门狗WWDG
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766544805190-10831de5-6ec4-44b6-8c93-4bf0a14db44b.png)

下面的部分逻辑跟独立看门狗差不多

上面的电路逻辑为当进行喂狗时，就会比较当前的值和一个最早界限的值，如何当前计数值大，则表示提前喂狗，那么也会触发复位

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766546071697-624aaf04-75bb-4c36-85ca-dfe6b9f3464b.png)

即T6为标志位，T6从1变0，则表示超时

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766546269182-7c3d6c74-b161-4be8-b451-21549a11402d.png)

#### IWDG和WWDG对比
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766546376516-fca65ebe-308c-4bb2-af2e-4e837ce80696.png)

#### 代码
##### 独立看门狗IWDG
```c
void IWDG_Init(void)
{
    //1. 开启IWDG的时钟（LSI），无需手动开启，硬件自动开启
    //2. 解除对IWDG寄存器的写保护
    IWDG_WriteAccessCmd(IWDG_WriteAccess_Enable); // 解除写保护

    //3. 设置预分频器和重装载值
    IWDG_SetPrescaler(IWDG_Prescaler_16);        // 16分频
    IWDG_SetReload(2500-1);                        // 1000ms超时

    //4. 装载重装载寄存器的值(先喂一次狗)
    IWDG_ReloadCounter();                        // Reload the counter

    //5. 启动IWDG
    IWDG_Enable();                               // Start the watchdog
}
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766549536706-4ab1ac3a-c116-4e2f-9c94-fd077503647c.png)

```c
void Check_Which_Reset(void)
{
    if (RCC_GetFlagStatus(RCC_FLAG_IWDGRST) != RESET) // Check if the IWDG reset flag is set
    {
        // Handle IWDG reset event here (e.g., log the event, notify user, etc.)
        OLED_ShowString(2,1,"IWDG Reset");
        Delay_ms(1000);
        OLED_ShowString(2,1,"            ");
        Delay_ms(100);
        RCC_ClearFlag(); // Clear all reset flags
    }
    else{
        OLED_ShowString(3,1,"Power On Reset");
        Delay_ms(1000);
        OLED_ShowString(3,1,"                ");
        Delay_ms(100);
    }
}
```

##### 窗口看门狗WWDG
```c
void WWDG_Init(void)  //超时时间50ms, 窗口时间30ms
{
    //1. 开启WWDG的时钟（PCLK1），需开启APB1时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_WWDG, ENABLE); // Enable WWDG clock
    //2. 设置预分频器和窗口值
    WWDG_SetPrescaler(WWDG_Prescaler_8);      // 8分频
    WWDG_SetWindowValue(21 | 0x40);                 

    //3. 设置计数器的初始值并启动WWDG
    WWDG_Enable(54 | 0x40);                         // 启动看门狗
}
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766549523570-14a6974a-9382-41c0-ae04-e25ad226091e.png)

```c
void WWDG_Check_Which_Reset(void)
{
    if (RCC_GetFlagStatus(RCC_FLAG_WWDGRST) != RESET) // Check if the WWDG reset flag is set
    {
        // Handle WWDG reset event here (e.g., log the event, notify user, etc.)
        OLED_ShowString(2,1,"WWDG Reset");
        Delay_ms(1000);
        OLED_ShowString(2,1,"            ");
        Delay_ms(100);
        RCC_ClearFlag(); // Clear all reset flags
    }
    else{
        OLED_ShowString(3,1,"Power On Reset");
        Delay_ms(1000);
        OLED_ShowString(3,1,"                ");
        Delay_ms(100);
    }
}
```

```c
void WWDG_ReloadCounter(void)
{
    WWDG_SetCounter(54 | 0x40); // Reload the counter
}
```

### Flash闪存
具体内容见《STM32F10xxx闪存编程参考手册》

#### 概念
+ STM32F1系列的FLASH包含程序存储器、系统存储器和选项字节三个部分，通过闪存存储器接口（外设）可以对程序存储器和选项字节进行擦除和编程
+ 读写FLASH的用途：	
    - 利用程序存储器的剩余空间来保存掉电不丢失的用户数据	
    - 通过在程序中编程（IAP），实现程序的自我更新
+ 在线编程（In-Circuit Programming – ICP）用于更新程序存储器的全部内容，它通过JTAG、SWD协议或系统加载程序（Bootloader）下载程序
+ 在程序中编程（In-Application Programming – IAP）可以使用微控制器支持的任一种通信接口下载程序

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766554734039-4032b6cc-feb7-4b27-8248-9e755eaf6598.png)

#### 基本结构
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555022757-08478d48-6aa9-4fd8-a5b8-8ddc90d954a5.png)

通过读写闪存存储器接口寄存器来对闪存进行擦除和编程

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555189700-ed540c62-0ae9-4a34-9bee-97c72e227f46.png)

系统存储器写死了，不能擦除和编程

#### Flash读和解锁写
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555382802-814fe07d-5ddd-4970-9e18-74a34ecb4d22.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555521736-3cfd625f-49c3-4909-8372-b145f6b38fb1.png)

volatile：防止编译器优化，这里表示该变量易变，应该每次从内存中读，不要优化成可以从缓存里面读

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555658022-97cc0860-cd6f-42cc-abdf-3d621ff5655c.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555674049-418f6c34-b883-41f6-a3c5-a61a048768f9.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555681314-fdd2bc7a-ae34-446a-ac41-8a7889f64bf1.png)

#### 选项字节
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766555874987-892fa055-15bd-47f3-b578-95f405d3bc51.png)

nXXX表示写入XXX时，要在nXXX同时写入XXX的反码，这样写入才有效

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766556025357-b207ccfc-4853-47a1-adf0-ef3a57f13a66.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766556086026-1c595185-2361-4b7f-87c1-9724346cbda5.png)

#### 电子签名
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766556139321-e83ce13e-268c-4178-8711-a268f618c42b.png)

#### 代码
```c
//按字读取Flash存储器中的数据
uint32_t MyFlash_ReadWord(uint32_t address) {
    return *(__IO uint32_t*)address;
}

//按半字读取Flash存储器中的数据
uint16_t MyFlash_ReadHalfWord(uint32_t address) {
    return *(__IO uint16_t*)address;
}

//按字节读取Flash存储器中的数据
uint8_t MyFlash_ReadByte(uint32_t address) {
    return *(__IO uint8_t*)address;
}

//全部擦除Flash存储器
void MyFlash_EraseAllPages(void){
    //1. 解锁Flash
    FLASH_Unlock();
    
    //2. 擦除所有页:函数内部已经包含了等待操作完成的代码
    FLASH_EraseAllPages();

    //3. 锁定Flash
    FLASH_Lock();
}

//擦除指定页Flash存储器
void MyFlash_ErasePage(uint32_t pageAddress){
    //1. 解锁Flash
    FLASH_Unlock();
    
    //2. 擦除指定页:函数内部已经包含了等待操作完成的代码
    FLASH_ErasePage(pageAddress);

    //3. 锁定Flash
    FLASH_Lock();
}

//向Flash指定地址按字写入数据
void MyFlash_ProgramWord(uint32_t address, uint32_t data){
    //1. 解锁Flash
    FLASH_Unlock();
    
    //2. 写入数据:函数内部已经包含了等待操作完成的代码
    FLASH_ProgramWord(address, data);

    //3. 锁定Flash
    FLASH_Lock();
}

//向Flash指定地址按半字写入数据
void MyFlash_ProgramHalfWord(uint32_t address, uint16_t data){
    //1. 解锁Flash
    FLASH_Unlock();
    
    //2. 写入数据:函数内部已经包含了等待操作完成的代码
    FLASH_ProgramHalfWord(address, data);

    //3. 锁定Flash
    FLASH_Lock();
}
```

```c
#include "stm32f10x.h"                  // Device header
#include "MyFlash.h"

#define STORE_START_ADDRESS 0x0800FC00
#define STORE_COUNT 512
uint16_t Store_Data[STORE_COUNT];


void Store_Init(void)
{
    if(MyFlash_ReadHalfWord(STORE_START_ADDRESS) != 0xA5A5)
    {
        MyFlash_ErasePage(STORE_START_ADDRESS);
        MyFlash_ProgramHalfWord(STORE_START_ADDRESS, 0xA5A5);
        for(uint16_t i=1; i<STORE_COUNT; i++)
        {
            MyFlash_ProgramHalfWord(STORE_START_ADDRESS + i*2, 0x0000);
        }
    }
    for(uint16_t i=0; i<STORE_COUNT; i++)
    {
        Store_Data[i] = MyFlash_ReadHalfWord(STORE_START_ADDRESS + 2 + i*2);
    }
}

void Store_Save(void)
{
    MyFlash_ErasePage(STORE_START_ADDRESS);
    MyFlash_ProgramHalfWord(STORE_START_ADDRESS, 0xA5A5);
    for(uint16_t i=1; i<STORE_COUNT; i++)
    {
        MyFlash_ProgramHalfWord(STORE_START_ADDRESS + i*2, Store_Data[i]);
    }
}

void Store_Clear(void)
{
    for(uint16_t i=1; i<STORE_COUNT; i++)
    {
        Store_Data[i] = 0x0000;
    }
    Store_Save();
}
```

