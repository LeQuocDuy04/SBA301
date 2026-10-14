export function getApiErrorMessage(error, fallback = "Request failed.") {
  if (!error?.response) {
    if (error?.code === "ECONNABORTED") {
      return "The request timed out. Please try again.";
    }
    return "Cannot connect to the backend. Check that Spring Boot is running on port 8080 and that CORS is configured.";
  }

  const { status, data } = error.response;
  const serverMessage =
    typeof data === "string" ? data :
    data?.message || data?.error || data?.detail;

  if (status === 400) return serverMessage || "Invalid data. Please check the form.";
  if (status === 404) return serverMessage || "The category was not found. It may have been deleted.";
  if (status === 409) return serverMessage || "This action conflicts with existing data.";
  if (status >= 500) return serverMessage || "The server encountered an error. Check the backend logs.";
  return serverMessage || fallback;
}
