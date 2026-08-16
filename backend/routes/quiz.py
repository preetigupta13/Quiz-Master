from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Question
from schemas import AnswerSubmission, QuizResult

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"]
)


@router.get("/questions")
def get_questions(db: Session = Depends(get_db)):
    questions = db.query(Question).all()

    result = []

    for q in questions:
        result.append({
            "id": q.id,
            "question": q.question,
            "options": [
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d
            ]
        })

    return result


@router.post("/submit", response_model=QuizResult)
def submit_quiz(
    answers: list[AnswerSubmission],
    db: Session = Depends(get_db)
):
    score = 0

    for answer in answers:

        question = db.query(Question).filter(
            Question.id == answer.question_id
        ).first()

        if not question:
            raise HTTPException(
                status_code=404,
                detail=f"Question {answer.question_id} not found"
            )

        if answer.answer == question.correct_answer:
            score += 1

    return {
        "score": score,
        "total": len(answers)
    }