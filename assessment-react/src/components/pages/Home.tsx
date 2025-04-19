import AssessmentPage from "./AssessmentPage";


const topics = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
];

export default function HomePage() {
  return <AssessmentPage topics={topics} />;
}