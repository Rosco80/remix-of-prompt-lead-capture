import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Globe, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface FormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  countryCode: string;
  companyWebsite: string;
  email: string;
}

const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
];

export default function SeoAuditForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    countryCode: '+1',
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
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-gradient-mesh opacity-40" />
        <div className="fixed inset-0 bg-gradient-hero" />

        <div className="relative z-10 w-full max-w-lg animate-scale-in">
          <Card className="bg-gradient-glass backdrop-blur-xl border border-white/20 shadow-glass overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
            <CardContent className="relative pt-12 pb-8 px-8">
              <div className="text-center space-y-6">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-75 animate-pulse" />
                  <div className="relative bg-gradient-primary rounded-full flex items-center justify-center w-full h-full">
                    <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
                  <p className="text-foreground/70 text-lg leading-relaxed">
                    Your SEO audit request has been received. You'll receive a detailed PDF report via email within the next 30 minutes at the email address you provided.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        phoneNumber: '',
                        countryCode: '+1',
                        companyWebsite: '',
                        email: ''
                      });
                    }}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20 hover:scale-105 transition-all duration-300 h-12 px-8 rounded-xl"
                  >
                    Submit Another Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-40" />
      <div className="fixed inset-0 bg-gradient-hero" />

      {/* Header Section */}
      <header className="relative z-10 backdrop-blur-xl bg-gradient-glass border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-6 p-4 rounded-2xl bg-gradient-glass backdrop-blur-md border border-white/10 shadow-glass">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-md opacity-75" />
                <div className="relative p-3 bg-gradient-primary rounded-xl">
                  <Search className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter flex items-center font-sans">
                <span className="text-[#C4EF17] italic">Autoflow</span>
                <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ml-0.5">Solutions</span>
              </h1>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl font-semibold text-foreground/90">
                Get Your Free Professional SEO Audit
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Comprehensive website analysis • Actionable insights • Expert recommendations
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Side - Benefits */}
            <div className="animate-fade-in space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center lg:justify-start gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-sm opacity-75" />
                    <div className="relative p-2 bg-gradient-primary rounded-lg">
                      <Sparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  What You'll Receive
                </h2>
              </div>

              <div className="grid gap-4">
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
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-glass backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative mt-1">
                      <div className="absolute inset-0 bg-gradient-primary rounded-full blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                      <CheckCircle2 className="relative h-6 w-6 text-primary flex-shrink-0" />
                    </div>
                    <span className="text-foreground/80 font-medium leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gradient-glass backdrop-blur-md border border-white/10 rounded-2xl shadow-glass hover:shadow-glow transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-primary rounded-full blur-sm opacity-75" />
                    <div className="relative p-3 bg-gradient-primary rounded-full">
                      <Globe className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Why Choose Autoflow Solutions?</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Our team of SEO experts has helped over 500+ businesses improve their search rankings and online visibility.
                  Get professional insights that drive real results.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="animate-scale-in">
              <Card className="bg-gradient-glass backdrop-blur-xl border border-white/20 shadow-glass overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
                <CardHeader className="relative text-center space-y-4 pb-8">
                  <CardTitle className="text-3xl font-bold text-foreground">Start Your Free Audit</CardTitle>
                  <CardDescription className="text-foreground/60 text-lg leading-relaxed">
                    Fill out the form below to get started. No commitment required.
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="fullName" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          required
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="h-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary/60 focus:bg-white/15 transition-all duration-300 rounded-xl text-foreground placeholder:text-foreground/50"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="companyName" className="text-sm font-semibold text-foreground/90">
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          type="text"
                          required
                          placeholder="Enter your company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="h-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary/60 focus:bg-white/15 transition-all duration-300 rounded-xl text-foreground placeholder:text-foreground/50"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary/60 focus:bg-white/15 transition-all duration-300 rounded-xl text-foreground placeholder:text-foreground/50"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="phoneNumber" className="text-sm font-semibold text-foreground/90">
                          Phone Number *
                        </Label>
                        <div className="flex gap-3">
                          <Select
                            value={formData.countryCode}
                            onValueChange={(value) => handleInputChange('countryCode', value)}
                          >
                            <SelectTrigger className="w-32 h-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary/60 focus:bg-white/15 transition-all duration-300 rounded-xl text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 backdrop-blur-xl border border-white/20 rounded-xl z-50">
                              {countryCodes.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.code}
                                  className="focus:bg-primary/10 focus:text-foreground cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.code}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            required
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className="flex-1 h-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary/60 focus:bg-white/15 transition-all duration-300 rounded-xl text-foreground placeholder:text-foreground/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="companyWebsite" className="text-sm font-semibold text-foreground/90">
                          Company Website *
                        </Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          required
                          placeholder="https://www.yourwebsite.com"
                          value={formData.companyWebsite}
                          onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                          className="h-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary/60 focus:bg-white/15 transition-all duration-300 rounded-xl text-foreground placeholder:text-foreground/50"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-primary hover:scale-[1.02] hover:shadow-glow text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              Get My Free SEO Audit
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </Button>

                      <p className="text-xs text-foreground/60 text-center mt-6 leading-relaxed">
                        By submitting this form, you agree to receive communication from Autoflow Solutions
                        regarding your SEO audit and related services.
                      </p>
                    </div>
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