export const readFileAsBinary: (
  file: File
) => Promise<{ body: string; title: string }> = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        body: reader.result as string,
        title: file.name.replace(/\.[^/.]+$/, ""),
      });
    };

    reader.onerror = (e) => reject(e);

    reader.readAsDataURL(file);
  });
};
