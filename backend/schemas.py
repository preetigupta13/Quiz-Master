from pydantic import BaseModel


class QuestionResponse(BaseModel):
    id: int
    question: str
    options: list[str]

    class Config:
        from_attributes = True


class AnswerSubmission(BaseModel):
    question_id: int
    answer: str


class QuizResult(BaseModel):
    score: int
    total: int