export type InterviewQuestionPayload = {
  name: string;
  company: string;
  role: string;
  major: string;
  certifications?: string;
};

type InterviewQuestionResponse = {
  questions?: string[];
  error?: string;
};

const ENDPOINT = "https://nalleum-backend.onrender.com/api/interview-questions";

export async function fetchInterviewQuestions(payload: InterviewQuestionPayload): Promise<string[]> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = (await response.json().catch(() => ({}))) as InterviewQuestionResponse;

  if (!response.ok) {
    throw new Error(json.error || "질문 API 호출 실패");
  }

  if (!Array.isArray(json.questions)) {
    throw new Error("질문 응답 형식이 올바르지 않습니다.");
  }

  return json.questions;
}
