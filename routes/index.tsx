import type { Handlers, PageProps } from "$fresh/server.ts";
import iconv from "https://esm.sh/iconv-lite@0.6.3";

interface Data {
  name?: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    return ctx.render({ name: undefined });
  },

  async POST(req, ctx) {
    const formData = await req.formData();
    const file = formData.get("f") as File | null;
    const originalName = file?.name ?? "no file upload";

    // 转换编码为 utf-8
    const name = iconv.decode(originalName, 'utf-8');
    return ctx.render({ name});
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <form method="post" encType="multipart/form-data">
        <input type="file" name="f" />
        <button type="submit">上传</button>
      </form>
      <hr />
      <div>
        文件名: {data?.name}
      </div>
    </div>
  );
}
