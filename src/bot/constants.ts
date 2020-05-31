export const validApproveUrlRegex = new RegExp(`^https:\/\/bitbucket.org\/${process.env.BITBUCKET_WORKSPACE}\/(?<repository>[a-z\-]{1,50}-ops)\/pull-requests\/(?<id>[0-9]{1,5})`);
export const validRegisterRegex = new RegExp('^\/register (?<userId>[0-9]{1,11}) (?<chatId>[0-9]{1,11})$');
export const defaultMessageRegx = new RegExp('.+');
