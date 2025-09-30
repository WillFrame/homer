export default {
    webpack: (
        config,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack},
    ) => {
        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack'],
                    },
                ],
            },
        };
    },
};
