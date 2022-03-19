/**
 *
 * @param {string} name page name
 * @returns page template
 */
export const pageTemplate = (name) => `import React from "react";

export const ${name}: React.FC = () => {
  return <h1>Hello ${name}</h1>;
};
`;
