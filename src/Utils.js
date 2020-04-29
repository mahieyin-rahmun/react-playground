export const generateID = (length) => {
  let possible = "0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    id += possible.charAt(0 + Math.random() * possible.length);
  }

  return id;
}

export const maxIdLength = 4;