const validApproveUrl = `https:\/\/bitbucket.org\/${process.env.BITBUCKET_WORKSPACE}\/(?<repository>[a-z\-]{1,50}-ops)\/pull-requests\/(?<id>[0-9]{1,5})`;
const validRegister = '\/register (?<userId>[0-9]{1,11}) (?<chatId>[0-9]{1,11})';
export const validApproveUrlRegex = new RegExp(`^${validApproveUrl}`);
export const validRegisterRegex = new RegExp(`^${validRegister}$`);
// Negate other messages regex to send default messages
export const defaultMessageRegx = new RegExp(`^(?!${validApproveUrl})(?!${validRegister}).+`);
