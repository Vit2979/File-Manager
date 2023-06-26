export const getHomedir = () => {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}
