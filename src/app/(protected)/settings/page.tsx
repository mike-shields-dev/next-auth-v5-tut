import {
  auth,
  signOut,
} from '@/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
  const session = await auth();
  
  return (
    <>
      <h1>Settings Page</h1>
      <p>Session: {JSON.stringify(session)}</p>
      <form action={async () => {
        "use server";
        await signOut();
      }}>


        <Button type="submit">Logout</Button>
      </form>
    </>
  );
}
