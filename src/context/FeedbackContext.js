import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

// provider, in app wrap inside provider to get access
// 1. create provider, and we import later in app,
// 2. the provider will render a context we just created
// 3. export the context, so it could be consumed in other comp.
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "this item is from context id1",
      rating: 10,
    },
    {
      id: 2,
      text: "this item is from context id2",
      rating: 1,
    },
    {
      id: 3,
      text: "this item is from context id3",
      rating: 5,
    },
  ]);

  const [feedbackEditEntry, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

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
