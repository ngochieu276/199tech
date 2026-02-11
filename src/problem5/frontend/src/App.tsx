import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResourceList } from './pages/resources/ResourceList';
import { ResourceDetail } from './pages/resources/ResourceDetail';
import { ConfigProvider, theme } from 'antd';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FCD535',
          colorBgContainer: '#2B3139',
          colorBgElevated: '#2B3139',
          colorText: '#EAECEF',
          colorBorder: '#474D57',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Modal: {
            contentBg: '#2B3139',
            headerBg: '#2B3139',
          },
          Select: {
            selectorBg: '#1E2329',
            optionSelectedBg: '#474D57',
          },
          Input: {
            colorBgContainer: '#1E2329',
          }
        }
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/resources" replace />} />
          <Route path="/resources" element={<ResourceList />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="*" element={<Navigate to="/resources" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
