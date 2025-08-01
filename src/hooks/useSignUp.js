import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/api';

const useSignUp = () => {
     const queryClient = useQueryClient();
    
        const {
            mutate,
            isPending,
            error,
        } = useMutation({
            mutationFn: signUp,
            onSuccess: () =>
                queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        });
  return { isPending, error, signUpMutation: mutate };
}

export default useSignUp