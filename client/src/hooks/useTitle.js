import { useEffect } from "react";

export const useTitle = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
