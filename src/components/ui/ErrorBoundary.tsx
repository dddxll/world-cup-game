import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-pitch flex items-center justify-center p-6">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-gold text-2xl font-bold mb-4">出错了</h1>
            <p className="text-red-400 text-sm mb-2 font-mono break-all">{this.state.error?.message}</p>
            {this.state.error?.stack && (
              <details className="text-white/40 text-xs mb-4 text-left">
                <summary className="cursor-pointer hover:text-white/60">📋 错误堆栈</summary>
                <pre className="mt-2 bg-black/30 p-2 rounded overflow-auto max-h-40 text-[10px] leading-relaxed whitespace-pre-wrap">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/' }}
              className="px-4 py-2 bg-gold text-pitch rounded-lg font-bold"
            >
              返回首页
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
