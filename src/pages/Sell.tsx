import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  DollarSign, 
  Tag,
  Eye,
  Save,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductForm {
  title: string;
  description: string;
  category: string;
  price: string;
  tags: string[];
  previewImage: File | null;
  productFile: File | null;
}

export default function Sell() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const [form, setForm] = useState<ProductForm>({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: [],
    previewImage: null,
    productFile: null
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Product details' },
    { number: 2, title: 'Media & Files', description: 'Upload content' },
    { number: 3, title: 'Pricing', description: 'Set your price' },
    { number: 4, title: 'Preview', description: 'Review & publish' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const progress = (currentStep / steps.length) * 100;

  const handleInputChange = (field: keyof ProductForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'previewImage' | 'productFile', file: File | null) => {
    setForm(prev => ({ ...prev, [field]: file }));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true
      });

    if (error) throw error;
    return data;
  };

  const getPublicUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      let previewImageUrl = '';
      let fileUrl = '';

      // Upload preview image
      if (form.previewImage) {
        const imagePath = `${user.id}/${Date.now()}-preview-${form.previewImage.name}`;
        await uploadFile(form.previewImage, 'product-images', imagePath);
        previewImageUrl = getPublicUrl('product-images', imagePath);
      }

      // Upload product file
      if (form.productFile) {
        const filePath = `${user.id}/${Date.now()}-${form.productFile.name}`;
        await uploadFile(form.productFile, 'product-files', filePath);
        fileUrl = filePath; // Store the path, not the full URL for private files
      }

      // Create product in database
      const { error } = await supabase
        .from('products')
        .insert({
          seller_id: user.id,
          title: form.title,
          description: form.description,
          category: form.category,
          price: parseFloat(form.price),
          preview_image_url: previewImageUrl,
          file_url: fileUrl,
          tags: form.tags
        });

      if (error) throw error;

      toast({
        title: "Product created!",
        description: "Your product has been successfully listed in the marketplace."
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return form.title && form.description && form.category;
      case 2:
        return form.previewImage && form.productFile;
      case 3:
        return form.price && parseFloat(form.price) > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'prompt':
        return 'AI Prompt';
      case 'agent':
        return 'n8n Agent';
      default:
        return 'Digital Good';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Sell Your Digital Product
            </h1>
            <p className="text-xl text-muted-foreground">
              Share your creativity with the world and earn from your digital goods
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step) => (
                <div 
                  key={step.number}
                  className={`flex items-center space-x-2 ${
                    currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.number 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-muted'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Steps */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Step {currentStep}: {steps[currentStep - 1].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter a catchy title for your product"
                      value={form.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what your product does and how it helps users..."
                      rows={5}
                      value={form.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={form.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prompt">AI Prompt</SelectItem>
                        <SelectItem value="agent">n8n Agent</SelectItem>
                        <SelectItem value="other">Digital Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Media & Files */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="preview-image">Preview Image *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {form.previewImage ? (
                        <div className="space-y-2">
                          <img 
                            src={URL.createObjectURL(form.previewImage)} 
                            alt="Preview" 
                            className="max-h-48 mx-auto rounded-lg"
                          />
                          <p className="text-sm text-muted-foreground">{form.previewImage.name}</p>
                          <Button 
                            variant="outline" 
                            onClick={() => handleFileChange('previewImage', null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                          <p className="text-muted-foreground">Upload a preview image</p>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('previewImage', e.target.files?.[0] || null)}
                            className="max-w-xs mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-file">Product File *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {form.productFile ? (
                        <div className="space-y-2">
                          <FileText className="h-12 w-12 text-primary mx-auto" />
                          <p className="font-medium">{form.productFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(form.productFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => handleFileChange('productFile', null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                          <p className="text-muted-foreground">Upload your digital product file</p>
                          <Input
                            type="file"
                            onChange={(e) => handleFileChange('productFile', e.target.files?.[0] || null)}
                            className="max-w-xs mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        value={form.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="pl-10 text-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set a competitive price for your digital product
                    </p>
                  </div>

                  <div className="bg-surface/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Earnings Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Product Price:</span>
                        <span>${form.price || '0.00'}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Platform Fee (5%):</span>
                        <span>-${form.price ? (parseFloat(form.price) * 0.05).toFixed(2) : '0.00'}</span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between font-semibold text-primary">
                        <span>Your Earnings:</span>
                        <span>${form.price ? (parseFloat(form.price) * 0.95).toFixed(2) : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Preview */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Product Preview</h3>
                    <p className="text-muted-foreground">
                      Review your product before publishing to the marketplace
                    </p>
                  </div>

                  <div className="bg-surface/50 rounded-lg p-6 space-y-6">
                    <div className="flex space-x-6">
                      {form.previewImage && (
                        <img 
                          src={URL.createObjectURL(form.previewImage)} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-semibold">{form.title}</h3>
                        <Badge className="text-xs">
                          {getCategoryLabel(form.category)}
                        </Badge>
                        <p className="text-muted-foreground">{form.description}</p>
                        <div className="text-2xl font-bold text-primary">
                          ${form.price}
                        </div>
                      </div>
                    </div>

                    {form.tags.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {form.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="font-medium">Files:</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Preview Image: {form.previewImage?.name}</p>
                        <p>Product File: {form.productFile?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={!canProceed(currentStep)}
                    className="btn-primary"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !canProceed(4)}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Publish Product
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}