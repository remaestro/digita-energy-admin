import { Link } from 'react-router-dom';
import { useTemplates } from '../hooks/queries/useTemplates';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Rocket } from 'lucide-react';

export default function TemplatesPage() {
  const { data: templates, isLoading, error } = useTemplates();

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-2">
            Choose a template to start your project
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading templates...</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
            <p className="text-destructive">Failed to load templates</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates?.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{template.icon || '📦'}</span>
                  <div className="flex-1">
                    <CardTitle>{template.name}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{template.type}</Badge>
                      {template.category && (
                        <Badge variant="secondary">{template.category}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold mb-2 text-muted-foreground">
                    FEATURES
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {template.metadata?.features?.map((feature: string) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-xs font-semibold mb-2 text-muted-foreground">
                    DEPENDENCIES
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {template.metadata?.dependencies?.slice(0, 4).map((dep: string) => (
                      <code key={dep} className="text-xs bg-muted px-2 py-1 rounded">
                        {dep}
                      </code>
                    ))}
                  </div>
                </div>

                <Link to={`/projects/new?template=${template.id}`}>
                  <Button className="w-full">
                    <Rocket className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
