import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

// provider, in app wrap inside provider to get access
// 1. create provider, and we import later in app,
// 2. the provider will render a context we just created
// 3. export the context, so it could be consumed in other comp.
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEditEntry, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, [])
  
  // fetch feedback
  const fetchFeedback = async() => {
    const resp = await fetch(`http://localhost:5000/feedback`);
    const data = await resp.json();

    setFeedback(data);
    setIsLoading(false)
  }


  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = (id, updatedItem) => {
    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updatedItem } : item))
    setFeedbackEdit({
        item: {},
        edit: false
    })
    
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEditEntry,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        setFeedbackEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
