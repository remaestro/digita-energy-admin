import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTemplates } from '../hooks/queries/useTemplates';
import { useCreateProject } from '../hooks/queries/useProjects';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Check } from 'lucide-react';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  templateId: z.string().min(1, 'Please select a template'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: templates } = useTemplates();
  const createProject = useCreateProject();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      templateId: searchParams.get('template') || '',
    },
  });

  const selectedTemplateId = watch('templateId');
  const selectedTemplate = templates?.find((t) => t.id === selectedTemplateId);

  useEffect(() => {
    if (searchParams.get('template')) {
      setStep(2);
    }
  }, [searchParams]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const project = await createProject.mutateAsync(data);
      navigate(`/projects/${project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-8 max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Project</h1>
          <p className="text-muted-foreground">
            Choose a template and configure your project
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {step > 1 ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <span className="text-sm font-medium">Select Template</span>
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium">Project Details</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Select Template */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Select a Template</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {templates?.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplateId === template.id
                        ? 'ring-2 ring-primary'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => {
                      setValue('templateId', template.id);
                      setStep(2);
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{template.icon || '📦'}</span>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {template.type}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="space-y-6">
              {selectedTemplate && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedTemplate.icon}</span>
                      <div>
                        <p className="font-semibold">{selectedTemplate.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate.description}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="ml-auto"
                      >
                        Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Give your project a name and description
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Project Name *
                    </label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="My Awesome Project"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-2"
                    >
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      placeholder="A brief description of your project..."
                    />
                  </div>

                  <input type="hidden" {...register('templateId')} />
                  {errors.templateId && (
                    <p className="text-sm text-destructive">
                      {errors.templateId.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={createProject.isPending}
                  className="flex-1"
                >
                  {createProject.isPending ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}
