import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Globe, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface FormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  countryCode: string;
  companyWebsite: string;
  email: string;
}

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+20", country: "EG", flag: "🇪🇬" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+30", country: "GR", flag: "🇬🇷" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+36", country: "HU", flag: "🇭🇺" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+40", country: "RO", flag: "🇷🇴" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+53", country: "CU", flag: "🇨🇺" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+58", country: "VE", flag: "🇻🇪" },
  { code: "+60", country: "MY", flag: "🇲🇾" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+62", country: "ID", flag: "🇮🇩" },
  { code: "+63", country: "PH", flag: "🇵🇭" },
  { code: "+64", country: "NZ", flag: "🇳🇿" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+66", country: "TH", flag: "🇹🇭" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+84", country: "VN", flag: "🇻🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+92", country: "PK", flag: "🇵🇰" },
  { code: "+93", country: "AF", flag: "🇦🇫" },
  { code: "+94", country: "LK", flag: "🇱🇰" },
  { code: "+95", country: "MM", flag: "🇲🇲" },
  { code: "+98", country: "IR", flag: "🇮🇷" },
  { code: "+211", country: "SS", flag: "🇸🇸" },
  { code: "+212", country: "MA", flag: "🇲🇦" },
  { code: "+213", country: "DZ", flag: "🇩🇿" },
  { code: "+216", country: "TN", flag: "🇹🇳" },
  { code: "+218", country: "LY", flag: "🇱🇾" },
  { code: "+220", country: "GM", flag: "🇬🇲" },
  { code: "+221", country: "SN", flag: "🇸🇳" },
  { code: "+223", country: "ML", flag: "🇲🇱" },
  { code: "+224", country: "GN", flag: "🇬🇳" },
  { code: "+225", country: "CI", flag: "🇨🇮" },
  { code: "+226", country: "BF", flag: "🇧🇫" },
  { code: "+227", country: "NE", flag: "🇳🇪" },
  { code: "+228", country: "TG", flag: "🇹🇬" },
  { code: "+229", country: "BJ", flag: "🇧🇯" },
  { code: "+230", country: "MU", flag: "🇲🇺" },
  { code: "+231", country: "LR", flag: "🇱🇷" },
  { code: "+232", country: "SL", flag: "🇸🇱" },
  { code: "+233", country: "GH", flag: "🇬🇭" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+235", country: "TD", flag: "🇹🇩" },
  { code: "+236", country: "CF", flag: "🇨🇫" },
  { code: "+237", country: "CM", flag: "🇨🇲" },
  { code: "+238", country: "CV", flag: "🇨🇻" },
  { code: "+239", country: "ST", flag: "🇸🇹" },
  { code: "+240", country: "GQ", flag: "🇬🇶" },
  { code: "+241", country: "GA", flag: "🇬🇦" },
  { code: "+242", country: "CG", flag: "🇨🇬" },
  { code: "+243", country: "CD", flag: "🇨🇩" },
  { code: "+244", country: "AO", flag: "🇦🇴" },
  { code: "+245", country: "GW", flag: "🇬🇼" },
  { code: "+246", country: "IO", flag: "🇮🇴" },
  { code: "+248", country: "SC", flag: "🇸🇨" },
  { code: "+249", country: "SD", flag: "🇸🇩" },
  { code: "+250", country: "RW", flag: "🇷🇼" },
  { code: "+251", country: "ET", flag: "🇪🇹" },
  { code: "+252", country: "SO", flag: "🇸🇴" },
  { code: "+253", country: "DJ", flag: "🇩🇯" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
  { code: "+255", country: "TZ", flag: "🇹🇿" },
  { code: "+256", country: "UG", flag: "🇺🇬" },
  { code: "+257", country: "BI", flag: "🇧🇮" },
  { code: "+258", country: "MZ", flag: "🇲🇿" },
  { code: "+260", country: "ZM", flag: "🇿🇲" },
  { code: "+261", country: "MG", flag: "🇲🇬" },
  { code: "+262", country: "RE", flag: "🇷🇪" },
  { code: "+263", country: "ZW", flag: "🇿🇼" },
  { code: "+264", country: "NA", flag: "🇳🇦" },
  { code: "+265", country: "MW", flag: "🇲🇼" },
  { code: "+266", country: "LS", flag: "🇱🇸" },
  { code: "+267", country: "BW", flag: "🇧🇼" },
  { code: "+268", country: "SZ", flag: "🇸🇿" },
  { code: "+269", country: "KM", flag: "🇰🇲" },
  { code: "+290", country: "SH", flag: "🇸🇭" },
  { code: "+291", country: "ER", flag: "🇪🇷" },
  { code: "+297", country: "AW", flag: "🇦🇼" },
  { code: "+298", country: "FO", flag: "🇫🇴" },
  { code: "+299", country: "GL", flag: "🇬🇱" },
  { code: "+350", country: "GI", flag: "🇬🇮" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+352", country: "LU", flag: "🇱🇺" },
  { code: "+353", country: "IE", flag: "🇮🇪" },
  { code: "+354", country: "IS", flag: "🇮🇸" },
  { code: "+355", country: "AL", flag: "🇦🇱" },
  { code: "+356", country: "MT", flag: "🇲🇹" },
  { code: "+357", country: "CY", flag: "🇨🇾" },
  { code: "+358", country: "FI", flag: "🇫🇮" },
  { code: "+359", country: "BG", flag: "🇧🇬" },
  { code: "+370", country: "LT", flag: "🇱🇹" },
  { code: "+371", country: "LV", flag: "🇱🇻" },
  { code: "+372", country: "EE", flag: "🇪🇪" },
  { code: "+373", country: "MD", flag: "🇲🇩" },
  { code: "+374", country: "AM", flag: "🇦🇲" },
  { code: "+375", country: "BY", flag: "🇧🇾" },
  { code: "+376", country: "AD", flag: "🇦🇩" },
  { code: "+377", country: "MC", flag: "🇲🇨" },
  { code: "+378", country: "SM", flag: "🇸🇲" },
  { code: "+380", country: "UA", flag: "🇺🇦" },
  { code: "+381", country: "RS", flag: "🇷🇸" },
  { code: "+382", country: "ME", flag: "🇲🇪" },
  { code: "+383", country: "XK", flag: "🇽🇰" },
  { code: "+385", country: "HR", flag: "🇭🇷" },
  { code: "+386", country: "SI", flag: "🇸🇮" },
  { code: "+387", country: "BA", flag: "🇧🇦" },
  { code: "+389", country: "MK", flag: "🇲🇰" },
  { code: "+420", country: "CZ", flag: "🇨🇿" },
  { code: "+421", country: "SK", flag: "🇸🇰" },
  { code: "+423", country: "LI", flag: "🇱🇮" },
  { code: "+500", country: "FK", flag: "🇫🇰" },
  { code: "+501", country: "BZ", flag: "🇧🇿" },
  { code: "+502", country: "GT", flag: "🇬🇹" },
  { code: "+503", country: "SV", flag: "🇸🇻" },
  { code: "+504", country: "HN", flag: "🇭🇳" },
  { code: "+505", country: "NI", flag: "🇳🇮" },
  { code: "+506", country: "CR", flag: "🇨🇷" },
  { code: "+507", country: "PA", flag: "🇵🇦" },
  { code: "+509", country: "HT", flag: "🇭🇹" },
  { code: "+590", country: "GP", flag: "🇬🇵" },
  { code: "+591", country: "BO", flag: "🇧🇴" },
  { code: "+592", country: "GY", flag: "🇬🇾" },
  { code: "+593", country: "EC", flag: "🇪🇨" },
  { code: "+594", country: "GF", flag: "🇬🇫" },
  { code: "+595", country: "PY", flag: "🇵🇾" },
  { code: "+596", country: "MQ", flag: "🇲🇶" },
  { code: "+597", country: "SR", flag: "🇸🇷" },
  { code: "+598", country: "UY", flag: "🇺🇾" },
  { code: "+670", country: "TL", flag: "🇹🇱" },
  { code: "+672", country: "NF", flag: "🇳🇫" },
  { code: "+673", country: "BN", flag: "🇧🇳" },
  { code: "+674", country: "NR", flag: "🇳🇷" },
  { code: "+675", country: "PG", flag: "🇵🇬" },
  { code: "+676", country: "TO", flag: "🇹🇴" },
  { code: "+677", country: "SB", flag: "🇸🇧" },
  { code: "+678", country: "VU", flag: "🇻🇺" },
  { code: "+679", country: "FJ", flag: "🇫🇯" },
  { code: "+680", country: "PW", flag: "🇵🇼" },
  { code: "+685", country: "WS", flag: "🇼🇸" },
  { code: "+686", country: "KI", flag: "🇰🇮" },
  { code: "+687", country: "NC", flag: "🇳🇨" },
  { code: "+688", country: "TV", flag: "🇹🇻" },
  { code: "+689", country: "PF", flag: "🇵🇫" },
  { code: "+690", country: "TK", flag: "🇹🇰" },
  { code: "+691", country: "FM", flag: "🇫🇲" },
  { code: "+692", country: "MH", flag: "🇲🇭" },
  { code: "+850", country: "KP", flag: "🇰🇵" },
  { code: "+852", country: "HK", flag: "🇭🇰" },
  { code: "+853", country: "MO", flag: "🇲🇴" },
  { code: "+855", country: "KH", flag: "🇰🇭" },
  { code: "+856", country: "LA", flag: "🇱🇦" },
  { code: "+880", country: "BD", flag: "🇧🇩" },
  { code: "+886", country: "TW", flag: "🇹🇼" },
  { code: "+960", country: "MV", flag: "🇲🇻" },
  { code: "+961", country: "LB", flag: "🇱🇧" },
  { code: "+962", country: "JO", flag: "🇯🇴" },
  { code: "+963", country: "SY", flag: "🇸🇾" },
  { code: "+964", country: "IQ", flag: "🇮🇶" },
  { code: "+965", country: "KW", flag: "🇰🇼" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
  { code: "+967", country: "YE", flag: "🇾🇪" },
  { code: "+968", country: "OM", flag: "🇴🇲" },
  { code: "+970", country: "PS", flag: "🇵🇸" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+972", country: "IL", flag: "🇮🇱" },
  { code: "+973", country: "BH", flag: "🇧🇭" },
  { code: "+974", country: "QA", flag: "🇶🇦" },
  { code: "+975", country: "BT", flag: "🇧🇹" },
  { code: "+976", country: "MN", flag: "🇲🇳" },
  { code: "+977", country: "NP", flag: "🇳🇵" },
  { code: "+992", country: "TJ", flag: "🇹🇯" },
  { code: "+993", country: "TM", flag: "🇹🇲" },
  { code: "+994", country: "AZ", flag: "🇦🇿" },
  { code: "+995", country: "GE", flag: "🇬🇪" },
  { code: "+996", country: "KG", flag: "🇰🇬" },
  { code: "+998", country: "UZ", flag: "🇺🇿" },
];

export default function SeoAuditForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    countryCode: '+1-US',
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
      const dialCode = formData.countryCode.split('-')[0];
      const payload = {
        ...formData,
        phoneNumber: `${dialCode}${formData.phoneNumber}`
      };

      const webhookUrl = 'https://n8n.soryle.space/webhook/27ea5610-f693-4370-a0c9-8ceb5253a49d';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
                        countryCode: '+1-US',
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
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#111116'}}>
      {/* Background Effects - z-20 so they render above header too, pointer-events-none so they don't block clicks */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-25 pointer-events-none" style={{zIndex: 20}} />
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none" style={{zIndex: 20}} />

      {/* Header Section */}
      <header className="relative z-10 border-b border-white/10" style={{backgroundColor: '#111116'}}>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <h1 className="text-5xl tracking-tight flex items-baseline justify-center font-sans">
                <span className="text-[#C4EF17] italic font-semibold">Autoflow</span>
                <span className="font-extrabold ml-1" style={{color: '#ffffff'}}>Solutions</span>
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
                            <SelectContent className="bg-background/95 backdrop-blur-xl border border-white/20 rounded-xl z-50 max-h-60">
                              {countryCodes.map((country) => (
                                <SelectItem
                                  key={`${country.code}-${country.country}`}
                                  value={`${country.code}-${country.country}`}
                                  className="focus:bg-primary/10 focus:text-foreground cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.code}</span>
                                    <span className="text-foreground/50 text-xs">{country.country}</span>
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