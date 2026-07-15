## GPIO
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766718682886-206e0a73-6a7e-456d-8f82-962d785f82cd.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766718780360-4116b3d6-aae8-4984-a4c4-a770e4a856f0.png)

需把代码写在USER CODE BEGIN 和 USER CODE END之间

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766720358722-d5647d2c-a7e8-4125-8e5a-b1b8e914cf89.png)

## UART
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766720610551-1719d347-ba5e-4d72-88e0-9e1918274cd6.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766720645231-72bebdca-199a-4a72-8138-6c10d14a58e1.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766720831051-12faa993-7dd2-4c19-b180-ef8d099eccd9.png)

### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766721283621-c10e0914-037e-430a-8511-36dc07188a0d.png)

```c
  uint8_t byteNum = 0x5a;
  uint8_t byteArray[] = {1,2,3,4,5};
  char ch = 'a';
  char *str = "hello world";
  HAL_UART_Transmit(&huart1, &byteNum, 1, HAL_MAX_DELAY);
  HAL_UART_Transmit(&huart1, byteArray, sizeof(byteArray), HAL_MAX_DELAY);
  HAL_UART_Transmit(&huart1, (uint8_t *)&ch, 1, HAL_MAX_DELAY);
  HAL_UART_Transmit(&huart1, (uint8_t *)str, strlen(str), HAL_MAX_DELAY);
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766975627387-d6118ca8-eeff-4e4f-b517-6c522c706cdc.png)

```c
while (1)
  {
    uint8_t dataRecvd;
    HAL_UART_Receive(&huart1, &dataRecvd, 1, HAL_MAX_DELAY);
    if(dataRecvd == '1')
    {
      HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET);
    }
    else if(dataRecvd == '0')
    {
      HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);
    }
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */

  }
```

## I2C
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766976039707-ec52df02-93b4-4b08-8e38-82cb64a9ed3a.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766976576818-a76115b6-b48e-4bbb-b36f-46b464d01025.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766976633164-ffb6ce12-9e8f-48b0-a9d2-86a8a85fbe0d.png)

一般stm32都是做主机，所以只设置上面的主机参数即可

### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766978132862-34b86faf-7d23-450c-92bd-c7458361fe6f.png)

## 时钟系统
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766978928428-3cfb6bf6-7b5e-497c-85f5-5e8d4c4892e4.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766979311501-d5f2cfa1-432e-4446-9835-ff68801d2816.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766979561412-015577db-59c3-476c-b477-29f6ce5888f5.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766979977044-a031d1f5-97f8-41df-a8a0-c26721fc23e5.png)

打开HSE，然后在Clock Configuration里面配置时钟

## SPI
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766980483836-0447dc80-887f-4e16-add4-8fb2d60c5bb7.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766980508922-34b1de0d-748d-4ff1-906f-b9cf1c0acd0f.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766981813774-f161bedc-003e-44bd-9eea-d70cebe06e80.png)<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766981836668-026a4753-40fc-4c6a-84c3-24b057767998.png)

### 五个参数
1. 波特率

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982129648-a742cd2b-a2ed-4146-b867-1a1d8306543c.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982186190-6dff6c68-7152-4a71-91e2-5a21cef68a5e.png)

2. 比特位传输顺序

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982280217-74b22538-3102-4a7d-a1aa-e6eb67854b4b.png)

3. 数据位长度

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982356122-839c07d9-7a2e-4b70-b2f8-84a13d60d8b0.png)

4. 时钟极性

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982514561-8d952f44-ad21-4af7-80ee-f4083b9fa023.png)

5. 时钟相位  

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982603055-2d5a1bab-a265-4d43-909a-1c05175d056e.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982582426-00c0c63f-5601-403c-844b-f463c6a363b1.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766982677784-45029563-0f97-496f-b76d-ddc63133bc6f.png)

### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766988764331-8666879f-a87e-4368-8753-d01ce6ae1649.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766989683428-09bb51c8-2b68-428a-af8f-84a0419674c1.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766989704908-790127ff-42e4-41c6-b1e1-bf4d94082e75.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766989715021-53258a55-9a12-4388-b281-f5bc978baf52.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766989729978-d8762ee3-0d07-4920-8918-5eccb7443296.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766989746050-7ebaa7b5-32e9-44bc-a1cf-342a039dc179.png)

```c
static void SaveLEDState(uint8_t state)
{
  //1. ĺä˝żč?
  uint8_t writeEnableCmd[1] = {0x06};
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_SPI_Transmit(&hspi1, writeEnableCmd, 1, HAL_MAX_DELAY);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);
  //2. ćĺşćŚé¤
  uint8_t erase_cmd[4] = {0x20,0x00,0x00,0x00};
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_SPI_Transmit(&hspi1, erase_cmd, 4, HAL_MAX_DELAY);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);
  HAL_Delay(50);
  //3. ĺä˝żč?
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_SPI_Transmit(&hspi1, writeEnableCmd, 1, HAL_MAX_DELAY);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);
  //4. éĄľçźç¨?
  uint8_t pageProgCmd[5] = {0x02,0x00,0x00,0x00,state};
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_SPI_Transmit(&hspi1, pageProgCmd, 5, HAL_MAX_DELAY);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);
  HAL_Delay(50);
}

static uint8_t LoadLEDState(void)
{
  //0x03 čŻťć°ćŽĺ˝äť? 0x00 0x00 0x00 ĺ°ĺ
  uint8_t readCmd[4] = {0x03,0x00,0x00,0x00};
  uint8_t led_state = 0xFF;
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_SPI_Transmit(&hspi1, readCmd, 4, HAL_MAX_DELAY);
  HAL_SPI_Receive(&hspi1, &led_state, 1, HAL_MAX_DELAY);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);
  return led_state;
}
```



## 中断
### 优先级
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766994277539-e6df4595-f739-41d7-9631-579e41096bfc.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766994369314-55381c42-0ff3-43db-aef0-a7ac7c17e66f.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766994573528-ef1e4f9a-f1de-4566-b580-404c002bdece.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766994586670-f5677828-50c4-4965-b043-995854d80ef7.png)

### NVIC
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766994911454-0c27aed7-b26e-4ad7-8174-b0cf575bb5d0.png)

### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766996474243-c48960c7-9a01-488d-980c-27c9865eb5a3.png) <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1766996763156-883af8ef-a8cb-4994-83f0-29abe80c14fb.png)

 HAL 库对底层中断处理流程进行了完整封装，用户不再直接编写外设的中断服务函数，而是通过实现 HAL 提供的回调函数，参与中断处理流程中的“用户逻辑部分”。  

## 定时器
### 时基单元
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767061368992-3dcb85a2-1046-4f9b-a002-cbff2a1e5c74.png)

分频系数 = PSC+1

定时周期 = ARR+1

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767061890814-7da61868-e65f-45a6-8874-c8efb5337b94.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767062249546-89f97995-7319-4158-83b1-d9bd6f41d223.png)

#### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767063022903-e80bf3d1-b15c-4314-8ecd-1173531caa79.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767063443879-7b16f72b-d4dc-464c-a287-21ce1ed72088.png)

### 输出比较
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767064518636-7a891508-52ff-45be-97c7-7039cb62e50a.png)

占空比= CCR/(ARR+1)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767064534467-b536363b-b262-45f5-b43d-b9631e372207.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767064623916-f7ae2a26-c883-4ce6-8735-c53ddb3db8c7.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767064674699-59f78faf-8989-4760-9b22-f20ea8a5b3f4.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767065273924-6c0297d2-0b58-48ac-9ecf-b1039026af1e.png)

#### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767065459476-95801c5e-0f78-4203-8e48-036593ca58f5.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767065508839-3c54fd01-f9b8-44d0-a2af-0c9971091c4d.png)

### 输入捕获
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067590416-c880c62e-3b6f-4bbd-be05-2380aece9adb.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067612726-d2654eed-bd24-49cb-9efd-2b1ebd100ec2.png)

### 从机控制器
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067732217-8ef4c06a-a060-4113-aca7-31faf0bf14f4.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067779617-e6562274-82fb-47d1-9ab9-1e6f2bb52927.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067847333-136df665-4933-4f17-a1a6-66354e0ef9aa.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067892578-b13ce1d4-6174-41c6-9b98-783ec4ec3187.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067949484-e4bc0f3b-7dd3-4cd9-ace9-c51de3b9f348.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767067977229-7339007e-4e5a-485e-8532-ba2d15bf41be.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767068006041-36d2494d-860e-476e-aa74-67c5d87cd1d5.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767068068890-f09dd440-2bd8-4e8f-9917-7e3cdcb6cc0a.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767068096755-74b2e473-be3b-489f-a989-a1a110ae7e0d.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767073834669-a692dbfd-da6d-4201-a569-8cec358fe27b.png)

```c
 while (1)
  {
    //1. 清除CC1标志
    __HAL_TIM_CLEAR_FLAG(&htim1, TIM_FLAG_CC1);

    //2. 启动定时器
    HAL_TIM_IC_Start(&htim1, TIM_CHANNEL_1);
    HAL_TIM_IC_Start(&htim1, TIM_CHANNEL_2);

    //3. 等待捕获CNT被重置以完整开始
    while(!__HAL_TIM_GET_FLAG(&htim1, TIM_FLAG_CC1));
    __HAL_TIM_CLEAR_FLAG(&htim1, TIM_FLAG_CC1);

    //4. 再次等待捕获完成
    while(!__HAL_TIM_GET_FLAG(&htim1, TIM_FLAG_CC1));

    //5. 关闭定时器
    HAL_TIM_IC_Stop(&htim1, TIM_CHANNEL_1);
    HAL_TIM_IC_Stop(&htim1, TIM_CHANNEL_2);

    //5. 读取捕获值
    uint32_t CCR1 = HAL_TIM_ReadCapturedValue(&htim1, TIM_CHANNEL_1);
    uint32_t CCR2 = HAL_TIM_ReadCapturedValue(&htim1, TIM_CHANNEL_2);

    //6. 计算周期和占空比
    float period = CCR1*(1e-6);
    float pulseWidth = CCR2*(1e-6);
    float duty = pulseWidth / period;

    //7. 输出结果
    UART_Printf("脉宽=%.1fus, 周期=%.1fus, 占空比=%.1f%%\r\n", pulseWidth*1e6, period*1e6, duty*100);

    HAL_Delay(1000);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}
    HAL_Delay(1000); while (1)
  {
    //1. 清除CC1标志
    __HAL_TIM_CLEAR_FLAG(&htim1, TIM_FLAG_CC1);

    //2. 启动定时器
    HAL_TIM_IC_Start(&htim1, TIM_CHANNEL_1);
    HAL_TIM_IC_Start(&htim1, TIM_CHANNEL_2);

    //3. 等待捕获CNT被重置以完整开始
    while(!__HAL_TIM_GET_FLAG(&htim1, TIM_FLAG_CC1));
    __HAL_TIM_CLEAR_FLAG(&htim1, TIM_FLAG_CC1);

    //4. 再次等待捕获完成
    while(!__HAL_TIM_GET_FLAG(&htim1, TIM_FLAG_CC1));

    //5. 关闭定时器
    HAL_TIM_IC_Stop(&htim1, TIM_CHANNEL_1);
    HAL_TIM_IC_Stop(&htim1, TIM_CHANNEL_2);

    //5. 读取捕获值
    uint32_t CCR1 = HAL_TIM_ReadCapturedValue(&htim1, TIM_CHANNEL_1);
    uint32_t CCR2 = HAL_TIM_ReadCapturedValue(&htim1, TIM_CHANNEL_2);

    //6. 计算周期和占空比
    float period = CCR1*(1e-6);
    float pulseWidth = CCR2*(1e-6);
    float duty = pulseWidth / period;

    //7. 输出结果
    UART_Printf("脉宽=%.1fus, 周期=%.1fus, 占空比=%.1f%%\r\n", pulseWidth*1e6, period*1e6, duty*100);

    HAL_Delay(1000);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767075035937-93e4314f-8e59-45cf-b517-629c0f6e3255.png)

编码器模式1、2、3

A相在前表示正转CNT递增，B相在前表示反转CNT递减

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767075129273-34d27c00-0963-4f13-89b9-87cd6553c99d.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767075142765-ade13ac1-ed90-4e2b-a478-87a834693916.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767075515466-9339a6fc-88f7-443e-92c6-4f0d1521d306.png)



## ADC
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767147937848-0d8496ec-3ec4-4f79-935b-a234f793a1b0.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767148805812-97d0b17f-0e26-4055-b1fc-2cc1b8820754.png)

ADC挂载到APB2上，最终的时钟频率**不得超过14MHz**

转换时间

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767149192020-4f96a909-8a54-481f-8daa-f77b972d4218.png)

采样时间

最优采样时间，充电电容电压与模拟信号电压差值小于ADC最小精度

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767149568174-51e77294-5ab1-40c8-abb8-0ed6bb7eafd6.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767149795304-ffbf2fe3-87f5-4d37-8a2f-eb27ae9ed5f1.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767149951747-6d31c13d-0c43-4e04-8932-2f4c2eb3a56d.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767151330201-dece7a54-419b-4039-b309-8611076c0638.png)

### 相关函数
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/62618266/1767151636675-9c798bcb-cfa3-4230-bc22-b0443eafe630.png)

```c
while (1)
  {
    //1. 启动常规序列
    HAL_ADC_Start(&hadc1);

    //2. 等待转换完成
    HAL_ADC_PollForConversion(&hadc1, HAL_MAX_DELAY);

    //3. 获取转换结果
    uint32_t dr = HAL_ADC_GetValue(&hadc1);

    //4. 把结果转换成电压
    float voltage = dr*(3.3f - 0.0f) / 4095.0f;

    if(voltage > 1.5f)
    {
      HAL_GPIO_WritePin(GPIOA,GPIO_PIN_8,GPIO_PIN_RESET);
    }
    else
    {
      HAL_GPIO_WritePin(GPIOA,GPIO_PIN_8,GPIO_PIN_SET);
    }

    
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
```

