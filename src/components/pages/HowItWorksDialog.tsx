import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const HowItWorksDialog = ({ open, onOpenChange }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void 
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">How Assessment Ninja Works</DialogTitle>
        <DialogDescription>
          Get the most out of our platform with these simple steps
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-4">
        {[
          {
            step: "1",
            title: "Select Your Technology",
            description: "Choose from our wide range of supported technologies and frameworks",
            icon: "💻"
          },
          {
            step: "2",
            title: "Set Difficulty Level",
            description: "Pick between Easy, Medium, or Hard based on your skill level",
            icon: "📊"
          },
          {
            step: "3",
            title: "Answer Questions",
            description: "Respond to AI-generated questions in your own words",
            icon: "✍️"
          },
          {
            step: "4",
            title: "Get Instant Feedback",
            description: "Receive detailed evaluation with scores and correct answers",
            icon: "🚀"
          }
        ].map((item) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                {item.step}
              </div>
              {item.step !== "4" && (
                <div className="w-0.5 h-full bg-blue-100 my-1"></div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);