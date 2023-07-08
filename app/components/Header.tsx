import LogoutButton from './LogoutButton';

export default function () {
  return (
    <header className='bg-gray-50 px-10 py-6 flex flex-row border-b-2 justify-between items-center'>
      <h1 className='text-2xl font-bold text-gray-800'>Files Space</h1>
      <LogoutButton />
    </header>
  );
}
