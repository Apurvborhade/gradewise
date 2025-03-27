"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetSubmittedAssignmentDetailsQuery } from "@/app/features/assignments/assignmentApi";

export default function SubmittedAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();
  const { assignmentId } = useParams()

  const { data: assignmentDetails, isLoading, isSuccess, error
  } = useGetSubmittedAssignmentDetailsQuery(assignmentId, {
    skip: !assignmentId
  })
  useEffect(() => {
    // Fetch submitted assignments from API
    fetch("/api/student/assignments")
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  }, []);
  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Submitted Assignments</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-black border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Assignment Name</th>
              <th className="p-3 border">Score</th>
              <th className="p-3 border">AI Feedback</th>
              <th className="p-3 border">Submitted PDF</th>
            </tr>
          </thead>
          <tbody>
            {assignmentDetails ? (

              <tr key={assignmentDetails.id} className="border-t text-white">
                <td className="p-3 border">{assignmentDetails.className}</td>
                <td className="p-3 border">{assignmentDetails.assignmentName}</td>
                <td className="p-3 border">{assignmentDetails.score}</td>
                <td className="p-3 border">{assignmentDetails.feedback}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => downloadFile(assignmentDetails.assignment.publicUrl)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>

            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center border">No assignments submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
