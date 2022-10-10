# fresh project

deno + fresh 文件上传中文名乱码 

https://deno.js.cn/t/topic/1129

## 解决方案

使用 iconv-lite 库进行转码。

```ts
const name = iconv.decode(originalName, 'utf-8');
```
