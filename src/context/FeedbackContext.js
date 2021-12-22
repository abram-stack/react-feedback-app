import { createContext, useState, useEffect } from "react";

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
    const resp = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await resp.json();

    setFeedback(data);
    setIsLoading(false)
  }


  const addFeedback = async (newFeedback) => {
    const resp = await fetch(`/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });
    const data = await resp.json();

    setFeedback([data, ...feedback]);
  };

  const deleteFeedback = async(id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE'
      })
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updatedItem) => {
    const resp = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(updatedItem)
    });
    const data = await resp.json();

    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
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
