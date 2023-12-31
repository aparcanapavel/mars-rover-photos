import getSolImages from '@/app/actions/getSolImages';
import { RoverManifestDataType } from '@/app/rover/[rover-name]/page';
import { addSearchParams } from '@/utils/misc';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { 
  ReadonlyURLSearchParams, 
  usePathname, 
  useSearchParams, 
  useRouter 
} from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { stageDetailsType } from './RoverStage';

function SubmitButton() {
  const { pending } = useFormStatus();
  // console.log('button pending', pending)
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

const addParamsAndSubmit = async (
  formData: FormData,
  formAction: (formData: FormData) => void,
  router: AppRouterInstance,
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const newSol = formData?.get('sol');

  addSearchParams(newSol as string, '1', router, pathname, searchParams);
  
  return await formAction(formData);
}

type SolSelectorProps = {
  roverManifestData: RoverManifestDataType;
  roverName: string;
  initialSol: number;
  initialPage: number;
  setStageDetails: (newDetails: stageDetailsType) => void;
}

const initialState = {
  errors: {},
}

const SolSelector = ({ 
  roverManifestData,
  roverName,
  initialSol,
  initialPage,
  setStageDetails,
}: SolSelectorProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const solTotal = roverManifestData.max_sol;

  const richGetSolImages = getSolImages.bind(null, {roverName, page: initialPage})

  const [_, formAction] = useFormState(richGetSolImages, initialState);
  
  return (
    <form 
      className="w-82 flex flex-row items-center"
      action={async (formData: FormData) => {
        setStageDetails({ isLoading: true });
        await addParamsAndSubmit(formData, formAction, router, pathname, searchParams);
      }}
    >
      <label htmlFor="sol-number-selector">
        Sol:
      </label>
      <input
        id='sol-number-selector'
        type="number"
        className="sol-number-selector w-[100px] ml-2 max-[375px]:w-[75px]"
        name='sol'
        min={'0'}
        max={solTotal.toString()}
        defaultValue={initialSol.toString()}
      />
      <p className='mx-2'>of {solTotal}</p>
      <SubmitButton />
    </form>
  );
};

export default SolSelector;