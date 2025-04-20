import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from "framer-motion";

const nodeStyle = {
  fontSize: 16,
  fontWeight: 600,
  color: '#1e293b',
  background: '#ffffff',
  border: '2px solid #2563eb',
  borderRadius: 8,
  padding: '12px 24px',
  minWidth: 320,
  textAlign: 'center' as const,
  boxShadow: '0 2px 12px 0 rgba(37,99,235,0.1)',
};

const examinerNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 0, y: 100 },
    data: { label: 'Recruiter initiates subscription request with custom topics' },
    style: nodeStyle,
  },
  {
    id: '2',
    position: { x: 400, y: 100 },
    data: { label: 'Exam slot assigned and confirmed for the candidate' },
    style: nodeStyle,
  },
  {
    id: '3',
    position: { x: 800, y: 50 },
    data: { label: 'Candidate joins the exam via screen sharing or in-person visit' },
    style: nodeStyle,
  },
  {
    id: '4',
    type: 'output',
    position: { x: 1200, y: 100 },
    data: { label: 'Real-time feedback & results delivered to recruiter' },
    style: nodeStyle,
  },
];

const examinerEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Step 1' },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Step 2' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Step 3' },
];

export function LiveExaminerFlowSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-white border-t border-blue-100"
    >
      <h2 className="text-4xl font-semibold text-center text-blue-900 mb-6">
        <span className="text-blue-700">Live Examiner Monitoring</span> for Efficient Recruitment
      </h2>
      <p className="text-center text-lg max-w-2xl mx-auto mb-10 text-gray-600">
        Enhance your recruitment process with real-time monitoring and instant feedback. Our platform enables recruiters to assess candidates more effectively, saving time and ensuring that only the most qualified candidates progress.
      </p>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-7xl h-80 bg-white rounded-lg shadow-lg border">
          <ReactFlow
            nodes={examinerNodes}
            edges={examinerEdges}
            fitView
            panOnScroll
            zoomOnScroll
            attributionPosition="bottom-right"
          >
            <Background color="#e2e8f0" />
            <Controls showZoom={true} showFitView={true} />
          </ReactFlow>
        </div>
        <div className="mt-10 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-block bg-blue-50 border border-blue-200 px-6 py-4 rounded-lg shadow-xl"
          >
            <span className="font-semibold text-blue-700 text-xl">
              <span className="text-green-700">Maximize recruiter efficiency</span> with streamlined candidate assessments. Our system saves recruiters hours per week while ensuring <span className="text-blue-600">quality-driven outcomes</span>.
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
