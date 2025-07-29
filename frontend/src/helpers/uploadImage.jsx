const uploadImage = async (image) => {
  // Configuration - Use your actual credentials
  const CLOUD_NAME = 'dsjpqvxvl'; // Your cloud name
  const UPLOAD_PRESET = 'mern_product'; // Must match Cloudinary exactly
  const API_KEY = '277188612199285'; // Get from Cloudinary dashboard

  // Validate inputs
  if (!image) throw new Error("No image file provided");
  if (!CLOUD_NAME || !UPLOAD_PRESET || !API_KEY) {
    throw new Error("Missing Cloudinary configuration");
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', Math.floor(Date.now() / 1000));

  try {
    // Make the request
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dsjpqvxvl/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    // Handle response
    if (!response.ok || !data.secure_url) {
      console.error('Cloudinary Error Details:', {
        status: response.status,
        error: data.error || 'No secure_url returned'
      });
      throw new Error(data.error?.message || 'Image upload failed');
    }

    return data;
  } catch (error) {
    console.error('Upload Process Error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export default uploadImage;