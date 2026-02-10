import { ToastProvider } from './components/ui/Toast';
import { Layout } from './components/layout/Layout';
import { SwapCard } from './components/swap/SwapCard';

function App() {
  return (
    <ToastProvider>
      <Layout>
        <div className="w-full flex flex-col items-center justify-center py-8 lg:py-16">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-3">Swap Tokens</h1>
            <p className="text-text-secondary text-lg">Trade tokens in an instant</p>
          </div>
          <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <SwapCard />
          </div>
        </div>
      </Layout>
    </ToastProvider>
  )
}

export default App
