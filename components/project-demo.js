"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

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

  if (content.steps && content.steps.length > 0) {
    return <MsgCenterInteractiveDemo demo={demo} />;
  }

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

function MsgCenterInteractiveDemo({ demo }) {
  const { title, description, content } = demo;
  const { baseUrl, steps, note } = content;

  const [serverUrl, setServerUrl] = useState(baseUrl);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [previousResults, setPreviousResults] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentStepData = steps[currentStep];

  const initializeFormData = useCallback((stepIndex, prevResults = {}) => {
    const step = steps[stepIndex];
    const initial = {};
    step.fields.forEach(field => {
      if (field.fromPrevious && prevResults[steps[stepIndex - 1]?.responseField]) {
        initial[field.name] = prevResults[steps[stepIndex - 1].responseField];
      } else if (field.default !== undefined) {
        initial[field.name] = field.default;
      }
    });
    return initial;
  }, [steps]);

  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      setFormData(initializeFormData(currentStep));
    }
  }, [currentStep, formData, initializeFormData]);

  const handleInputChange = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const handleServerUrlChange = useCallback((e) => {
    setServerUrl(e.target.value);
  }, []);

  const buildRequestBody = () => {
    const body = {};
    currentStepData.fields.forEach(field => {
      if (formData[field.name] !== undefined && formData[field.name] !== '') {
        let value = formData[field.name];
        if (field.type === 'json') {
          try {
            value = JSON.parse(value);
          } catch {
            value = {};
          }
        } else if (field.type === 'select') {
          value = parseInt(value, 10);
        }
        body[field.name] = value;
      }
    });
    return body;
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    currentStepData.fields.forEach(field => {
      if (formData[field.name] !== undefined && formData[field.name] !== '') {
        params.append(field.name, formData[field.name]);
      }
    });
    return params.toString();
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const step = steps[currentStep];
      let url = `${serverUrl}${step.path}`;
      const options = {
        method: step.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (step.method === 'POST') {
        options.body = JSON.stringify(buildRequestBody());
      } else if (step.method === 'GET') {
        const params = buildQueryParams();
        if (params) {
          url += `?${params}`;
        }
      }

      const res = await fetch(url, options);
      const data = await res.json();

      if (data.code === 200 && step.responseField) {
        setPreviousResults(prev => ({
          ...prev,
          [step.responseField]: data.data
        }));
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [serverUrl, currentStep, steps, formData]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = steps[currentStep + 1];
      const newResults = { ...previousResults };
      const currentStepData_local = steps[currentStep];
      if (response?.data?.code === 200 && currentStepData_local?.responseField) {
        newResults[currentStepData_local.responseField] = response.data.data;
      }

      const newFormData = initializeFormData(currentStep + 1, newResults);

      setPreviousResults(newResults);
      setFormData(newFormData);
      setCurrentStep(prev => prev + 1);
      setResponse(null);
      setError(null);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setFormData(initializeFormData(currentStep - 1, previousResults));
      setResponse(null);
      setError(null);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData(initializeFormData(0));
    setPreviousResults({});
    setResponse(null);
    setError(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>

      <div className="rounded-[8px] bg-[var(--wash)] p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[var(--muted)]">后端服务地址</span>
          <input
            type="text"
            value={serverUrl}
            onChange={handleServerUrlChange}
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-[var(--accent)]"
            placeholder="输入后端服务地址"
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            {steps.map((stepItem, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  idx === currentStep
                    ? 'bg-[var(--accent)] text-white'
                    : idx < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${idx < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-[var(--accent-dark)] hover:underline"
          >
            重置流程
          </button>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              currentStepData.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            }`}>
              {currentStepData.method}
            </span>
            <code className="text-sm text-[var(--accent-dark)]">{currentStepData.path}</code>
            <span className="text-xs text-[var(--muted)]">- {currentStepData.description}</span>
          </div>

          <div className="space-y-4">
            {currentStepData.fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                  {field.fromPrevious && <span className="text-xs text-[var(--accent)] ml-2">（从上一步获取）</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name] ?? field.default ?? ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="">请选择</option>
                    {field.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] ?? field.default ?? ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[var(--accent)] min-h-[80px] font-mono"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.name] ?? field.default ?? ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[var(--accent)]"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded hover:bg-[var(--accent-dark)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  发送中...
                </>
              ) : (
                '发送请求'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">请求失败：{error}</p>
            <p className="text-xs text-red-500 mt-1">请检查后端服务是否启动，地址是否正确</p>
          </div>
        )}

        {response && (
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">响应结果</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                response.status >= 200 && response.status < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {response.status} {response.statusText}
              </span>
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap break-all bg-gray-50 p-3 rounded max-h-[300px] overflow-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
            {response.data.code === 200 && currentStepData.responseField && response.data.data && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                <span className="font-semibold text-yellow-700">返回的 {currentStepData.responseField}：</span>
                <code className="ml-2 text-[var(--accent-dark)]">{response.data.data}</code>
              </div>
            )}
            {currentStep < steps.length - 1 && response.data.code === 200 && (
              <button
                onClick={handleNextStep}
                className="mt-4 w-full py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
              >
                下一步：{steps[currentStep + 1].title}
              </button>
            )}
          </div>
        )}

        {note && (
          <div className="text-xs text-[var(--muted)] bg-yellow-50 border border-yellow-200 rounded p-3">
            <span className="font-semibold text-yellow-700">提示：</span>{note}
          </div>
        )}
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