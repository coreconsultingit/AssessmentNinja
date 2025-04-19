import AssessmentPage from "./AssessmentPage";

const topics = [
    { label: "Science (Year 9)", value: "Science Year-9" },
    { label: "Math (Year 9)", value: "Math Year-9" },
  ];
  
  export default function StudentsPage() {
    return <AssessmentPage topics={topics} />;
  }