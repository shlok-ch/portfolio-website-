const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Check backend health status
 */
export const checkHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`Health check returned status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('Backend API is currently unreachable:', error.message);
    return { status: 'offline', error: error.message };
  }
};

/**
 * Submit contact form to Express backend
 */
export const submitContact = async (formData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || `Server responded with status ${res.status}`;
      const err = new Error(errorMsg);
      err.errors = data.errors;
      err.status = res.status;
      throw err;
    }

    return data;
  } catch (error) {
    // Check if network failed completely
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      const netError = new Error(
        'Unable to connect to the backend server. Please verify the Express server is running on port 5000.'
      );
      netError.isNetworkError = true;
      throw netError;
    }
    throw error;
  }
};

/**
 * Get Resume Download URLs (via backend API routes)
 */
export const getResumeDownloadUrl = (format = 'pdf') => {
  return `${API_BASE_URL}/api/resume/${format}`;
};

/**
 * Direct file download trigger helper
 */
export const triggerResumeDownload = async (format = 'pdf') => {
  const url = getResumeDownloadUrl(format);
  try {
    // Attempt download through backend API route
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Server returned ${res.status} when fetching ${format.toUpperCase()}`);
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `Shlok_Chaturvedi_Resume.${format === 'docx' ? 'docx' : 'pdf'}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
    return { success: true, source: 'backend' };
  } catch (backendError) {
    console.warn('Backend download failed, falling back to static copy:', backendError.message);
    // Fallback to client static copy if backend is offline
    const fallbackUrl = `/resume/Shlok_Chaturvedi_Resume.${format === 'docx' ? 'docx' : 'pdf'}`;
    const a = document.createElement('a');
    a.href = fallbackUrl;
    a.download = `Shlok_Chaturvedi_Resume.${format === 'docx' ? 'docx' : 'pdf'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return { success: true, source: 'client-static-fallback', warning: backendError.message };
  }
};
