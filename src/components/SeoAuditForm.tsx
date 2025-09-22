import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Globe, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface FormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  companyWebsite: string;
  email: string;
}

export default function SeoAuditForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    companyWebsite: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://n8n-1prompt.99players.com/webhook/27ea5610-f693-4370-a0c9-8ceb5253a49d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Success! 🎉",
          description: "Your SEO audit request has been submitted. We'll contact you within 24 hours.",
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="bg-gradient-secondary border border-primary/20 shadow-glow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-4">
                  Your SEO audit request has been received. Our team will analyze your website and contact you within 24 hours with detailed insights.
                </p>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      companyName: '',
                      phoneNumber: '',
                      companyWebsite: '',
                      email: ''
                    });
                  }}
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="bg-gradient-hero border-b border-primary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                1Prompt License
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get Your Free Professional SEO Audit
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Comprehensive website analysis • Actionable insights • Expert recommendations
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Benefits */}
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                What You'll Receive
              </h2>
              
              <div className="space-y-4">
                {[
                  "Complete technical SEO analysis",
                  "On-page optimization recommendations", 
                  "Keyword research and strategy",
                  "Competitor analysis insights",
                  "Performance metrics report",
                  "Actionable improvement roadmap"
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 rounded-lg bg-gradient-secondary border border-primary/10"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Why Choose 1Prompt License?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our team of SEO experts has helped over 500+ businesses improve their search rankings and online visibility. 
                  Get professional insights that drive real results.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="animate-scale-in">
              <Card className="bg-gradient-secondary border border-primary/20 shadow-elegant">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground">Start Your Free Audit</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Fill out the form below to get started. No commitment required.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          required
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="mt-1 bg-background/50 border-primary/20 focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyName" className="text-sm font-medium text-foreground">
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          type="text"
                          required
                          placeholder="Enter your company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="mt-1 bg-background/50 border-primary/20 focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-1 bg-background/50 border-primary/20 focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
                          Phone Number *
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          required
                          placeholder="Enter your phone number"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="mt-1 bg-background/50 border-primary/20 focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyWebsite" className="text-sm font-medium text-foreground">
                          Company Website *
                        </Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          required
                          placeholder="https://www.yourwebsite.com"
                          value={formData.companyWebsite}
                          onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                          className="mt-1 bg-background/50 border-primary/20 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium py-3 animate-glow-pulse"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Get My Free SEO Audit
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to receive communication from 1Prompt License 
                      regarding your SEO audit and related services.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}