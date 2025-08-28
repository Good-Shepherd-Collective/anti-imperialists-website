export const sanityConfig = {
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',
    apiVersion: '2021-06-07',
    useCdn: true
};

export const sanityApiUrl = `https://${sanityConfig.projectId}.api.sanity.io/v2021-06-07/data/query/${sanityConfig.dataset}`; 