'use client';
import getSolImages from '@/app/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
 
  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className='bg-accent hover:bg-accent-300 transition-all duration-300 text-gray-100 px-3 py-1 rounded-lg'
    >
      View
    </button>
  );
};

const setParam = (
  name: string, 
  value: string, 
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
}

const addSearchParams = (
  formData: FormData,
  formAction: (formData: FormData) => void,
  router: AppRouterInstance,
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const sol = formData?.get('sol');
  router.push(pathname + '?' + setParam('sol', sol as string, searchParams));

  return formAction(formData);
}

type NumberSelectorProps = { 
  solTotal: number;
  roverName: string;
  initialSol: number;
  page: number;
}


type initialStateType = { 
  errors: { 
    sol?: string[] | undefined; 
  }; 
  message?: undefined; 
}

const initialState: initialStateType = {
  message: undefined,
  errors: {
    sol: undefined
  }
}

const NumberSelector = ({ 
  solTotal,
  roverName,
  initialSol,
  page
}: NumberSelectorProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const richGetSolImages = getSolImages.bind(null, { roverName, page})

  const [_, formAction] = useFormState(richGetSolImages, initialState);
  
  return (
    <form 
      className="w-82 flex flex-row items-center mt-4 cardItem"
      action={(formData: FormData) => 
        addSearchParams(formData, formAction, router, pathname, searchParams)
      }
    >
      <label htmlFor="sol-number-selector">
        Sol:
      </label>
      <input
        id='sol-number-selector'
        type="number"
        className="sol-number-selector w-[100px] ml-2"
        name='sol'
        min={'1'}
        max={solTotal.toString()}
        defaultValue={initialSol.toString()}
      />
      <p className='mx-2'>of {solTotal}</p>
      <SubmitButton />
    </form>
  );
};

export default NumberSelector;