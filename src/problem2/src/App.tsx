import { ToastProvider } from './components/ui/Toast';
import { Layout } from './components/layout/Layout';
import { SwapCard } from './components/swap/SwapCard';
import { ConfigProvider, theme } from 'antd';

function App() {
  return (
    <ToastProvider>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#FCD535',
            colorBgContainer: '#2B3139',
            colorBgElevated: '#2B3139',
            colorText: '#EAECEF',
            colorBorder: '#474D57',
            fontFamily: 'Inter, sans-serif',
            borderRadius: 10,
          },
          components: {
            Modal: {
              contentBg: '#2B3139',
              headerBg: '#2B3139',
            },
            Input: {
              colorBgContainer: '#1E2329',
            }
          }
        }}
      >
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
      </ConfigProvider>
    </ToastProvider>
  )
}

export default App
