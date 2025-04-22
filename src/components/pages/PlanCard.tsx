import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const PlanCard = ({ plan, navigate }: { plan: any; navigate: any }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="relative">
    <Card className={`h-full ${plan.borderClass} rounded-xl overflow-hidden`}>
      <CardHeader className={`${plan.headerClass}`}>
        <CardTitle className={`text-2xl ${plan.titleClass} flex items-center justify-between`}>
          {plan.title}
          {plan.badge && (
            <Badge variant={plan.badge.variant as any} className={plan.badge.className}>
              {plan.badge.text}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3 text-gray-700">
          {plan.features.map((feature: any, i: number) => (
            <p key={i} className="flex items-center gap-2">
              <span className={feature.included ? "text-green-500" : "text-gray-400"}>
                {feature.included ? "✓" : "✗"}
              </span>
              {feature.text}
            </p>
          ))}
        </div>
        {plan.button && (
          <Button 
            className={`w-full mt-6 ${plan.button.className}`} 
            onClick={() => plan.button.onClick(navigate)}
          >
            {plan.button.text}
          </Button>
        )}
      </CardContent>
    </Card>
  </motion.div>
);