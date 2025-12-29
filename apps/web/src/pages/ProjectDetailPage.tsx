import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject, useGenerateProject, useDeleteProject } from '../hooks/queries/useProjects';
import { useDeployments, useCreateDeployment } from '../hooks/queries/useDeployments';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Rocket, Trash2, ExternalLink, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'deployments'>('overview');
  
  const { data: project, isLoading } = useProject(id!);
  const { data: deployments } = useDeployments(id!);
  const generateProject = useGenerateProject(id!);
  const deleteProject = useDeleteProject();
  const createDeployment = useCreateDeployment(id!);

  const handleGenerate = async () => {
    try {
      await generateProject.mutateAsync();
    } catch (error) {
      console.error('Failed to generate project:', error);
    }
  };

  const handleDeploy = async (environment: 'development' | 'staging' | 'production') => {
    try {
      await createDeployment.mutateAsync(environment);
    } catch (error) {
      console.error('Failed to deploy project:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${project?.name}"?`)) {
      try {
        await deleteProject.mutateAsync(id!);
        navigate('/projects');
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
      case 'building':
      case 'deploying':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ready':
      case 'success':
        return 'success';
      case 'generating':
      case 'pending':
      case 'building':
      case 'deploying':
        return 'default';
      case 'error':
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading project...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto p-8">
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Project not found</h3>
              <Button onClick={() => navigate('/projects')}>Go to Projects</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/projects')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        {/* Project Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{project.template?.icon || '📦'}</span>
            <div>
              <h1 className="text-4xl font-bold">{project.name}</h1>
              <p className="text-muted-foreground mt-1">{project.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {project.template?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {project.status === 'created' && (
              <Button onClick={handleGenerate} disabled={generateProject.isPending}>
                <Rocket className="h-4 w-4 mr-2" />
                {generateProject.isPending ? 'Generating...' : 'Generate Files'}
              </Button>
            )}
            {project.status === 'ready' && (
              <Button onClick={() => handleDeploy('production')}>
                <Rocket className="h-4 w-4 mr-2" />
                Deploy
              </Button>
            )}
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-4">
            <button
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === 'deployments'
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('deployments')}
            >
              Deployments ({deployments?.length || 0})
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Project ID</p>
                  <code className="text-sm">{project.id}</code>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Slug</p>
                  <code className="text-sm">{project.slug}</code>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-sm">
                    {formatDistanceToNow(new Date(project.createdAt))} ago
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm">
                    {formatDistanceToNow(new Date(project.updatedAt))} ago
                  </p>
                </div>
              </CardContent>
            </Card>

            {project.repoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Repository</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {project.repoUrl}
                  </a>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{project.template?.name}</p>
                <Badge variant="outline">{project.template?.type}</Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === 'deployments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Deployment History</h2>
              {project.status === 'ready' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeploy('development')}
                  >
                    Deploy to Dev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeploy('staging')}
                  >
                    Deploy to Staging
                  </Button>
                  <Button size="sm" onClick={() => handleDeploy('production')}>
                    Deploy to Production
                  </Button>
                </div>
              )}
            </div>

            {deployments && deployments.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Rocket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No deployments yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Deploy your project to see deployment history here
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {deployments?.map((deployment) => (
                <Card key={deployment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(deployment.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{deployment.environment}</p>
                            <Badge variant={getStatusVariant(deployment.status)}>
                              {deployment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(deployment.createdAt))} ago
                          </p>
                        </div>
                      </div>
                      {deployment.deploymentUrl && (
                        <a
                          href={deployment.deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Live
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
