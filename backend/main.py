from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from models import Question
from routes.quiz import router as quiz_router


app = FastAPI(
    title="Quiz Master API",
    description="Backend API for Quiz Master",
    version="1.0.0"
)


# Create database tables
Base.metadata.create_all(bind=engine)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Add sample questions only if database is empty
def create_sample_questions():

    db = SessionLocal()

    try:
        count = db.query(Question).count()

        if count == 0:

            questions = [

                Question(
                    question="What is Python?",
                    option_a="Programming Language",
                    option_b="Database",
                    option_c="Operating System",
                    option_d="Web Browser",
                    correct_answer="Programming Language"
                ),

                Question(
                    question="Which library is commonly used for data analysis in Python?",
                    option_a="React",
                    option_b="Pandas",
                    option_c="FastAPI",
                    option_d="Express",
                    correct_answer="Pandas"
                ),

                Question(
                    question="What does API stand for?",
                    option_a="Application Programming Interface",
                    option_b="Advanced Python Integration",
                    option_c="Application Process Internet",
                    option_d="Automated Programming Instruction",
                    correct_answer="Application Programming Interface"
                ),

                Question(
                    question="Which keyword is used to define a function in Python?",
                    option_a="function",
                    option_b="define",
                    option_c="def",
                    option_d="func",
                    correct_answer="def"
                ),

                Question(
                    question="Which technology are we using for the backend?",
                    option_a="Node.js",
                    option_b="Django",
                    option_c="FastAPI",
                    option_d="Spring Boot",
                    correct_answer="FastAPI"
                ),
                Question(
                    question="Which library is mainly used for numerical computing in Python?",
                    option_a="NumPy",
                    option_b="React",
                    option_c="FastAPI",
                    option_d="Django",
                    correct_answer="NumPy"
                ),
                
                Question(
                    question="What is the full form of ML?",
                    option_a="Machine Learning",
                    option_b="Manual Language",
                    option_c="Machine Language",
                    option_d="Model Logic",
                    correct_answer="Machine Learning"
                ),
                
                Question(
                    question="Which algorithm is commonly used for classification?",
                    option_a="Linear Regression",
                    option_b="Logistic Regression",
                    option_c="K-Means",
                    option_d="PCA",
                    correct_answer="Logistic Regression"
                ),
                
                Question(
                    question="Which Python library is commonly used for data visualization?",
                    option_a="Matplotlib",
                    option_b="FastAPI",
                    option_c="Flask",
                    option_d="Requests",
                    correct_answer="Matplotlib"
                ),

                Question(
                    question="What does SQL stand for?",
                    option_a="Structured Query Language",
                    option_b="Simple Question Language",
                    option_c="System Query Logic",
                    option_d="Structured Question List",
                    correct_answer="Structured Query Language"
                       )


            ]

            db.add_all(questions)
            db.commit()

    finally:
        db.close()


create_sample_questions()


@app.get("/")
def home():
    return {
        "message": "Quiz API is running!"
    }


app.include_router(quiz_router)