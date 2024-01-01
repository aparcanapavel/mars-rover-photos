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
import { stageDetailsType } from '../../utils/types';

function SubmitButton({ stageIsLoading }: { stageIsLoading: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      aria-disabled={stageIsLoading || pending}
      className='bg-accent hover:bg-accent-300 transition-all duration-300 text-gray-100 px-3 py-1 tooltip-btn'
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
  stageDetails: stageDetailsType
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
  stageDetails
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
        className="sol-number-selector w-[100px] ml-2 max-[375px]:w-[75px] py-[2.5px]"
        name='sol'
        min={'0'}
        max={solTotal.toString()}
        defaultValue={initialSol.toString()}
        aria-disabled={stageDetails.isLoading}
        disabled={stageDetails.isLoading}
      />
      <p className='mx-2'>of {solTotal}</p>
      <SubmitButton 
        stageIsLoading={stageDetails.isLoading}
      />
    </form>
  );
};

export default SolSelector;