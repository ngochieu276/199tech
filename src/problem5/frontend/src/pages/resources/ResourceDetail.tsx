import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { resourceService } from '../../services/api'
import { Layout } from '../../components/layout/Layout'
import { Button } from '../../components/ui/Button'
import { Tag } from 'antd'

export const ResourceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      const resource = await resourceService.getById(Number(id))
      return resource
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto bg-background-secondary border border-gray-800 rounded-2xl p-8">
          <div className="h-8 w-1/3 bg-background-tertiary animate-pulse rounded mb-6" />
          <div className="h-4 w-2/3 bg-background-tertiary animate-pulse rounded mb-3" />
          <div className="h-4 w-1/2 bg-background-tertiary animate-pulse rounded" />
        </div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto bg-background-secondary border border-gray-800 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Resource Not Found</h1>
            <Button onClick={() => navigate('/resources')}>Back</Button>
          </div>
          <p className="text-text-secondary">The requested resource does not exist.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-background-secondary border border-gray-800 rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <Button onClick={() => navigate('/resources')}>Back</Button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Tag
            color={data.status === 'active' ? '#0ECB81' : '#F6465D'}
            className="border-none px-3 py-1 rounded-full bg-opacity-20 font-medium"
            style={{
              backgroundColor: data.status === 'active' ? 'rgba(14, 203, 129, 0.1)' : 'rgba(246, 70, 93, 0.1)',
              color: data.status === 'active' ? '#0ECB81' : '#F6465D'
            }}
          >
            {data.status.toUpperCase()}
          </Tag>
          <span className="text-xs text-text-tertiary">ID: #{data.id}</span>
        </div>
        <p className="text-text-secondary mb-6">{data.description || 'No description provided.'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text-tertiary">
          <div className="bg-background rounded-xl p-4 border border-gray-800">
            <div className="font-bold text-text-primary mb-1">Created At</div>
            <div>{new Date(data.createdAt).toLocaleString()}</div>
          </div>
          <div className="bg-background rounded-xl p-4 border border-gray-800">
            <div className="font-bold text-text-primary mb-1">Updated At</div>
            <div>{new Date(data.updatedAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
