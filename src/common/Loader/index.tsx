import { useAppContext } from '../../contexts';
const Loader = () => {
  const {loading} = useAppContext()
  return (
    <>
      {loading
        ?(<div className="flex h-screen items-center justify-center bg-white z-99999">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"/>
          </div>
        )
        :false}
    </>
  );
};

export default Loader;
