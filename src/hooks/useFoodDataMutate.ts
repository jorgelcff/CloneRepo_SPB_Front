import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";

const API_URL = '{API_URL}';

const postData = async (data : FoodData): AxiosPromise<any> => {
    const response = await axios.post(API_URL + '/food', data);
    return response;
}


export function useFoodDataMutate(){
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] });
        }
    })

    return mutate;
}
