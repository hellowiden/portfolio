import { FaPaperPlane } from 'react-icons/fa';
import { useFormStatus } from 'react-dom';

export default function SubmitBtn() {
  const formStatus = useFormStatus?.();
  const pending = formStatus?.pending || false;

  return (
    <button
      type="submit"
      className={`flex items-center justify-center gap-2 rounded-md border 
        border-light dark:border-dark bg-white dark:bg-black 
        px-6 py-3 text-black dark:text-white hover:bg-opacity-80 
        dark:hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-light 
        dark:focus:ring-dark disabled:opacity-50 disabled:cursor-not-allowed 
        transition-all`}
      disabled={pending}
      aria-busy={pending}
      title={pending ? 'Submitting...' : 'Click to submit'}
    >
      {pending ? (
        <div
          className="h-5 w-5 animate-spin rounded-full border-b-2 border-light dark:border-dark"
          aria-hidden="true"
        />
      ) : (
        <>
          <span>Submit</span>
          <FaPaperPlane className="text-light dark:text-dark" />
        </>
      )}
    </button>
  );
}
