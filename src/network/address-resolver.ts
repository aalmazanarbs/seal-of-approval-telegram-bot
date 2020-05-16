import * as os from 'os';

const getInternalIpv4 = (): os.NetworkInterfaceInfo => {
    const networkInterfaces = os.networkInterfaces();
    return Object.keys(networkInterfaces)
                 .map((name: string) => networkInterfaces[name])
                 .flat()
                 .find((networkInterface: os.NetworkInterfaceInfoIPv4) => networkInterface.family === 'IPv4' && !networkInterface.internal);
};

export const resolveAddress = (isProduction: boolean): string => {
    if (!isProduction) {
        return '0.0.0.0';
    }

    return getInternalIpv4().address;
};
