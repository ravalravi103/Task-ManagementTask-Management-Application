import axios from "axios";
import { useEffect, useState } from "react";

interface Config {
    resouce_name: string;
}

interface UseGetDataHooksType {
    config: Config;
}

function useGetData<T>({ config }: UseGetDataHooksType) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { resouce_name } = config





    return {
        data,
        loading,
        error,
    };
}

export default useGetData;
