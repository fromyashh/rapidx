import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Zap } from "lucide-react";

import { useSubmitLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GROWTH_BOTTLENECKS = ["Creatives", "Traffic", "Operations", "Analytics", "All of the above"] as const;

const formSchema = z.object({
  brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  annualRevenue: z.string().min(1, { message: "Please select an annual revenue bracket." }),
  growthBottleneck: z.enum(GROWTH_BOTTLENECKS),
  contactEmail: z.string().email({ message: "Please enter a valid email address." }),
  contactName: z.string().optional(),
  message: z.string().optional(),
});

const AUDIT_STEPS = [
  { step: "01", title: "Submit Intel", desc: "Share your brand's vitals through the form." },
  { step: "02", title: "Deep Recon",   desc: "We analyze listings, creative gaps, and competitor velocity." },
  { step: "03", title: "Execution Plan", desc: "A precise, no-fluff roadmap to category leadership." },
];

export default function Contact() {
  const { toast } = useToast();
  const submitLead = useSubmitLead();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "", category: "", annualRevenue: "",
      growthBottleneck: "Creatives" as const,
      contactEmail: "", contactName: "", message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitLead.mutate({ data: values }, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error submitting your audit request. Please try again.",
        });
      },
    });
  }

  if (submitLead.isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-card border border-primary/30 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 rounded-t-2xl" />
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter mb-3">
            Audit Request Received
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Our elite team will analyze your category positioning and contact you within 24 hours with a clear path forward.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="font-bold uppercase tracking-wider rounded-md"
            data-testid="button-return-home"
          >
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <div className="mb-10 md:mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Free Category Audit</div>
          <h1 className="font-display font-black uppercase tracking-tighter mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            Let's Audit Your<br />
            <span className="text-gradient">Category Position</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Stop guessing. We'll benchmark you against category leaders and map the exact path to dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">

          {/* Left: how it works */}
          <div className="lg:col-span-2">
            <div className="space-y-4 mb-8">
              {AUDIT_STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-4 p-4 md:p-5 bg-card border border-border rounded-xl"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display font-black text-sm shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-0.5">{s.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-5 bg-primary/8 border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Sports Specialists</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We currently manage 10+ elite sports & fitness brands nationally and internationally — with the same immersion methodology available for ambitious brands in any category.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 rounded-t-2xl" />

            <h3 className="font-display font-bold text-lg uppercase tracking-tight mb-6 md:mb-8 border-b border-border pb-4">
              Brand Intelligence Form
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField control={form.control} name="brandName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Apex Athletics" className="h-11 bg-background border-border rounded-lg focus-visible:ring-primary" {...field} data-testid="input-brandname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Primary Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 bg-background border-border rounded-lg" data-testid="select-category">
                            <SelectValue placeholder="Select Sector" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-lg">
                          <SelectItem value="Sports & Fitness">Sports & Fitness</SelectItem>
                          <SelectItem value="Fashion & Apparel">Fashion & Apparel</SelectItem>
                          <SelectItem value="FMCG & Nutrition">FMCG & Nutrition</SelectItem>
                          <SelectItem value="Beauty & Wellness">Beauty & Wellness</SelectItem>
                          <SelectItem value="Home & Lifestyle">Home & Lifestyle</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="annualRevenue" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Annual Revenue</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 bg-background border-border rounded-lg" data-testid="select-revenue">
                            <SelectValue placeholder="Select Volume" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-lg">
                          <SelectItem value="Under $500K">Under $500K</SelectItem>
                          <SelectItem value="$500K – $2M">$500K – $2M</SelectItem>
                          <SelectItem value="$2M – $10M">$2M – $10M</SelectItem>
                          <SelectItem value="$10M+">$10M+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="growthBottleneck" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Main Growth Bottleneck</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-background border-border rounded-lg" data-testid="select-bottleneck">
                          <SelectValue placeholder="Where are you stuck?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border rounded-lg">
                        <SelectItem value="Creatives">Creatives & Visuals</SelectItem>
                        <SelectItem value="Traffic">Traffic & Marketing</SelectItem>
                        <SelectItem value="Operations">Marketplace Operations</SelectItem>
                        <SelectItem value="Analytics">Data & Analytics</SelectItem>
                        <SelectItem value="All of the above">All of the above</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="contactName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-11 bg-background border-border rounded-lg focus-visible:ring-primary" {...field} value={field.value || ''} data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="contactEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@brand.com" className="h-11 bg-background border-border rounded-lg focus-visible:ring-primary" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Additional Context (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Current challenges, specific goals, platforms you're selling on..."
                        className="min-h-[90px] bg-background border-border rounded-lg focus-visible:ring-primary resize-y"
                        {...field}
                        value={field.value || ''}
                        data-testid="textarea-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button
                  type="submit"
                  className="w-full h-12 font-display font-black uppercase tracking-widest text-base rounded-md mt-2 transition-all hover:opacity-90 hover:scale-[1.01] shadow-[0_0_24px_hsl(24_100%_52%/0.3)]"
                  disabled={submitLead.isPending}
                  data-testid="button-submit"
                >
                  {submitLead.isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Audit Request"
                  )}
                </Button>

              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
