import Link from "next/link";

export function ProjectDemo({ demo }) {
  if (!demo) return null;

  switch (demo.type) {
    case "interactive-api":
      return <InteractiveAPIDemo demo={demo} />;
    case "image-gallery":
      return <ImageGalleryDemo demo={demo} />;
    case "data-chart":
      return <DataChartDemo demo={demo} />;
    case "video":
      return <VideoDemo demo={demo} />;
    default:
      return null;
  }
}

function InteractiveAPIDemo({ demo }) {
  const { title, description, content } = demo;
  const { endpoint, method, exampleParams, exampleResponse } = content;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>
      <div className="space-y-4 rounded-[8px] bg-[var(--wash)] p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">请求</p>
          <div className="mt-2 space-y-2 font-mono text-sm">
            <p className="text-[var(--accent-dark)]">{method}</p>
            <p className="break-all text-[var(--muted)]">{endpoint}</p>
            <pre className="overflow-auto rounded bg-white p-3 text-xs leading-relaxed">
              {JSON.stringify(exampleParams, null, 2)}
            </pre>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">响应示例</p>
          <pre className="mt-2 overflow-auto rounded bg-white p-3 font-mono text-xs leading-relaxed">
            {JSON.stringify(exampleResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function ImageGalleryDemo({ demo }) {
  const { title, description, content } = demo;
  const { images } = content;

  if (!images || images.length === 0) {
    return (
      <div className="rounded-[8px] border border-black/8 bg-[var(--wash)] p-5">
        <p className="text-center text-sm text-[var(--muted)]">暂无截图</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>
      <div className="grid gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="rounded-[8px] border border-black/8 bg-white p-4">
            {img.url ? (
              <img src={img.url} alt={img.title} className="h-60 w-full rounded object-cover" />
            ) : (
              <div className="flex h-60 items-center justify-center rounded bg-[var(--wash)]">
                <p className="text-sm text-[var(--muted)]">图片待上传</p>
              </div>
            )}
            <p className="mt-3 font-medium">{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataChartDemo({ demo }) {
  const { title, description, content } = demo;
  const { charts } = content;

  if (!charts || charts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {charts.map((chart, idx) => (
          <div key={idx} className="rounded-[8px] border border-black/8 bg-white p-5">
            <p className="font-semibold">{chart.title}</p>
            <div className="mt-4 space-y-3">
              {chart.data.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted)]">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[var(--wash)]">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: `${(item.value / 100) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoDemo({ demo }) {
  const { title, description, content } = demo;
  const { url } = content;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>
      {url ? (
        <video controls className="w-full rounded-[8px] border border-black/8">
          <source src={url} type="video/mp4" />
          您的浏览器不支持视频播放
        </video>
      ) : (
        <div className="flex h-80 items-center justify-center rounded-[8px] border border-black/8 bg-[var(--wash)]">
          <p className="text-sm text-[var(--muted)]">视频待上传</p>
        </div>
      )}
    </div>
  );
}
