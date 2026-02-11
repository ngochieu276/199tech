import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { Resource, CreateResourceDTO } from '../../services/api';
import { resourceService } from '../../services/api';
import { Plus, Search, Edit2, Trash2} from 'lucide-react';
import { Modal, Form, Select, Input as AntInput, message, Popconfirm, Tag, Pagination } from 'antd';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export const ResourceList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ['resources', { search, statusFilter, page, pageSize }],
    queryFn: async () => {
      const result = await resourceService.getAll({ name: search, status: statusFilter, page, limit: pageSize });
      setResources(result.data);
      setTotal(result.meta.total);
      return result;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, page, pageSize, queryClient]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const handleCreate = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setEditingId(resource.id);
    form.setFieldsValue(resource);
    setIsModalOpen(true);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => resourceService.delete(id),
    onSuccess: () => {
      message.success('Resource deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
    onError: () => {
      message.error('Failed to delete resource');
    },
  });

  const handleSubmit = async (values: CreateResourceDTO) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await resourceService.update(editingId, values);
        message.success('Resource updated successfully');
      } else {
        await resourceService.create(values);
        message.success('Resource created successfully');
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    } catch (error) {
      message.error('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-10">Resources</h1>
          <p className="text-text-secondary">Manage your system resources efficiently.</p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-background-secondary p-4 rounded-2xl border border-gray-800 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            placeholder="Filter by Status"
            allowClear
            className="w-full h-10"
            onChange={setStatusFilter}
            dropdownStyle={{ backgroundColor: '#2B3139', borderColor: '#374151' }}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>
      </div>

      {/* Grid View */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-background-secondary animate-pulse rounded-2xl border border-gray-800" />
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-20 bg-background-secondary rounded-2xl border border-gray-800 border-dashed">
          <div className="w-16 h-16 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-text-secondary" size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">No Resources Found</h3>
          <p className="text-text-secondary max-w-sm mx-auto">
            Try adjusting your search or filters, or create a new resource.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div 
              key={resource.id} 
              className="group bg-background-secondary rounded-2xl border border-gray-800 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden"
              onClick={() => navigate(`/resources/${resource.id}`)}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 bg-background-tertiary/50 hover:bg-primary hover:text-background"
                  onClick={() => handleEdit(resource)}
                >
                  <Edit2 size={14} />
                </Button>
                <Popconfirm
                  title="Delete resource"
                  description="Are you sure you want to delete this resource?"
                  onConfirm={() => deleteMutation.mutate(resource.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: 'bg-status-danger' }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 bg-background-tertiary/50 hover:bg-status-danger hover:text-white"
                  >
                    <Trash2 size={14} />
                  </Button>
                </Popconfirm>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-background-tertiary rounded-xl">
                  <span className="text-2xl font-bold text-primary">
                    {resource.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <Tag 
                  color={resource.status === 'active' ? '#0ECB81' : '#F6465D'}
                  className="mr-0 border-none px-3 py-1 rounded-full bg-opacity-20 font-medium"
                  style={{ 
                    backgroundColor: resource.status === 'active' ? 'rgba(14, 203, 129, 0.1)' : 'rgba(246, 70, 93, 0.1)',
                    color: resource.status === 'active' ? '#0ECB81' : '#F6465D'
                  }}
                >
                  {resource.status.toUpperCase()}
                </Tag>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-2 truncate" title={resource.name}>
                {resource.name}
              </h3>
              
              <p className="text-text-secondary text-sm mb-6 line-clamp-2 h-10">
                {resource.description || 'No description provided.'}
              </p>

              <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-text-tertiary">
                <span>ID: #{resource.id}</span>
                <span>{new Date(resource.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        title={editingId ? "Edit Resource" : "Create Resource"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Resource Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <AntInput className="h-10 rounded-lg" placeholder="e.g. Server Alpha" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <AntInput.TextArea rows={4} className="rounded-lg" placeholder="Optional description..." />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select className="h-10 rounded-lg">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <div className="flex gap-3 justify-end mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              {editingId ? 'Update Resource' : 'Create Resource'}
            </Button>
          </div>
        </Form>
      </Modal>
      <div className="mt-8 flex justify-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          onChange={(p, ps) => {
            setPage(p);
            setPageSize(ps);
          }}
        />
      </div>
    </Layout>
  );
};
