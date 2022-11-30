import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import DataService from '../../services/service';

export const firebaseApiMain = createApi({
    reducerPath: 'firebaseApiMain',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getClietns: builder.query({
            async queryFn(cm) {
                try {
                    const response = await DataService.getClients({ cm });
                    return {
                        data: response,
                    }

                } catch (error) {
                    console.log(error)
                    return { data: error }
                }

            }
        }),
    }),
})

export const { useGetClietnsQuery } = firebaseApiMain;