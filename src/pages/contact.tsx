import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Zap } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const GROWTH_BOTTLENECKS = ["Creatives", "Traffic", "Operations", "Analytics", "All of the above"] as const;

const formSchema = z.object({
  brandName: z.string().min(2, { message: "Brand name must be at
