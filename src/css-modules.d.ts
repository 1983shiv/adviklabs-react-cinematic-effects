declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Allow process.env.NODE_ENV without @types/node
declare const process: {
  env: {
    NODE_ENV?: string;
  };
};
