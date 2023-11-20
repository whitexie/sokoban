import antfu from "@antfu/eslint-config";
import antfuConfig from "eslint-plugin-antfu";

export default await antfu({ vue: true, typescript: true }, antfuConfig);
