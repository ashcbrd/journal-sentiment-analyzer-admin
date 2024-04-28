export const checkAuth = () => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem('userId');
      return userId !== null;
    }
    return false;
  }