import Header from '../components/Header';
type Props = {
  children: React.ReactNode;
};
export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
