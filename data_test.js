const quizzes = {
    1: {
        title: "Delissea sinuata Hillebr.",
        description: "Nesomimus trifasciatus",
        public: "t",
        owner_id: "user1",
        
    },
    2: {
        title: "Begonia convolvulacea A. DC.",
        description: "Plegadis ridgwayi",
        public: "t",
        owner_id: "user2",
    }
  };
  
  const users = { 
    1: {
      id: 1, 
      username: "aenderwick0",
      email: "cmacgiffin0@squarespace.com ", 
      password: "1M2P2r5ncR5Ffgm7xqQvfnqdV6uYPT5rXL"
    },
   2: {
      id: 2,
      username: "gtinn1",
      email: "scornils1@sbwire.com", 
      password: "1PrD6ZkPxHPa2QgvPFtGwpSBkbgPXhEQDB"
    }
  }
  
  const previous_attempets = { 
    1: {
      quiz_id: 1, 
      user_id: 80,
      score: 10
    },
   2: {
    quiz_id: 2, 
    user_id: 63,
    score: 23
    }
  }

  const questions = { 
    1: {
      quiz_id: 1, 
      question: "Friends star Lisa Kudrow was originally cast in the sitcom Frasier"
    },
   2: {
    quiz_id: 1, 
    question: "If you are born between May 1st and 20th, then you are a Gemini"
    },
    5: {
        quiz_id: 2, 
        question: "Fruit flies were the first living creatures sent into space"
        }
  }

  const answers = { 
    1: {
      question_id: 1, 
      answer: "t",
      is_correct: "f"
    },
   2: {
    question_id: 2, 
    answer: "f",
    is_correct: "f"
    }
  }
