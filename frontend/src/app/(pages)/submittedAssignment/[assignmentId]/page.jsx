"use client"
// Components
import Sidebar from "@/app/components/Sidebar";
import { ArrowLeft, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { FileViewer } from "@/components/file-viewer";

// React
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Redux
import { useGetSubmittedAssignmentDetailsQuery } from "@/app/features/assignments/assignmentApi";
import Link from "next/link";



const getAssignmentDetails = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    className: "Advanced Mathematics 101",
    assignmentName: "Calculus Integration Methods",
    score: 85,
    maxScore: 100,
    submittedAt: "2023-11-15T14:30:00Z",
    status: "graded",
    aiFeedback: {
      strengths: [
        "Excellent understanding of integration by parts",
        "Clear step-by-step solutions",
        "Good application of theorems in practical problems",
      ],
      improvements: [
        "Review substitution methods for more complex integrals",
        "Work on time management - some problems were incomplete",
        "Add more explanations for your solution approach",
      ],
      overallFeedback:
        "Your work demonstrates a solid grasp of basic integration techniques. Focus on completing all problems and explaining your reasoning more thoroughly for higher scores.",
    },
    submittedFile: {
      name: "calculus_homework.pdf",
      type: "application/pdf",
      url: "/sample.pdf",
    },
  };
};

export default function SubmittedAssignmentsPage() {
  // Old Assignment Page ---------------------------
  const { assignmentId } = useParams()

  const { data: assignmentDetails, isLoading, isSuccess, error
  } = useGetSubmittedAssignmentDetailsQuery(assignmentId, {
    skip: !assignmentId
  })

  // const downloadFile = (url) => {
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = url.substring(url.lastIndexOf("/") + 1);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  // Old Assignment Page ---------------------------

  const params = useParams();
  const id = params.id;
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(assignmentDetails)
  }, [assignmentDetails])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssignmentDetails(id);
        setAssignment(data);
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!assignmentDetails && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Assignment not found</h1>
        <p className="text-muted-foreground mb-6">
          The assignment you're looking for doesn't exist or you don't have access to it.
        </p>
        <Button asChild className="hover:text-black hover:underline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assignments
          </Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#eef5ff]">

      <Sidebar />
      {/* Page Content */}
      {assignmentDetails && (
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="container max-w-5xl py-8 px-4 md:px-6">
            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-4 p-0 hover:underline">
                <Link href="/dashboard" className="flex items-center text-muted-foreground ">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Assignments
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">{assignmentDetails.assignmentName}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline" className="text-sm text-black !important font-medium">
                  {assignmentDetails.className}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-white ${assignmentDetails.accepted ? "bg-green-500" : "bg-yellow-500"}`}
                >
                  {assignmentDetails.accepted ? "Accepted" : "Pending"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Submitted Work</CardTitle>
                    <CardDescription>Your submitted file for this assignment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <FileViewer file={assignmentDetails.assignment.publicUrl} className="w-full border rounded-md overflow-hidden" /> */}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <a href={assignmentDetails.assignment.publicUrl} target="_blank" className="text-white" download={'assignment'}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Feedback</CardTitle>
                    <CardDescription>Automated feedback on your submission</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-green-600 mb-2">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Strengths
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {assignmentDetails.feedBackResponse.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="flex items-center text-sm font-medium text-amber-600 mb-2">
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Areas for Improvement
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {assignmentDetails.feedBackResponse.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm">
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Overall Feedback</h3>
                      <p className="text-sm">{assignmentDetails.feedBackResponse.overallFeedback}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Score</CardTitle>
                    <CardDescription>Your performance on this assignment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-gray-200"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                          ></circle>
                          <circle
                            className={`stroke-current`}
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - assignmentDetails.score / 10)}`}
                            transform="rotate(-90 50 50)"
                          ></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{assignmentDetails.score}</span>
                          <span className="text-xs text-muted-foreground">out of 10</span>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          {assignmentDetails.score >= 9
                            ? "Excellent work!"
                            : assignmentDetails.score >= 8
                              ? "Great job!"
                              : assignmentDetails.score >= 7
                                ? "Good effort!"
                                : assignmentDetails.score >= 6
                                  ? "Satisfactory"
                                  : "Needs improvement"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Grade</span>
                        <span className="font-medium">
                          {assignmentDetails.score >= 9
                            ? "A"
                            : assignmentDetails.score >= 8
                              ? "B"
                              : assignmentDetails.score >= 7
                                ? "C"
                                : assignmentDetails.score >= 6
                                  ? "D"
                                  : "F"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Percentage</span>
                        <span className="font-medium">{(assignmentDetails.score/10) * 100}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Plagiarism</span>
                        <span className="font-medium">{assignmentDetails.plagiarismPercentage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Points</span>
                        <span className="font-medium">
                          {assignmentDetails.score}/10
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
