import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { 
    languageOptions: { 
      globals: globals.node 
    },
    env: {
      jest: true,
    } 
  },
  pluginJs.configs.recommended,
];