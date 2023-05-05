export const convertImageToBinary = (file: File) => {
  return new Promise<string>((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        const bits = e.target.result as string;
        resolve(bits);
      }
    };

    reader.readAsBinaryString(file);
  });
};
